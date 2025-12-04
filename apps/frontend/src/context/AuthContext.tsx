"use client";

import { Fetcher } from "@/classes/Fetcher";
import { IUser } from "@/mock/mockUsers";
import { checkFieldsSignIn } from "@/modules/checkFieldSignIn";
import checkFieldsSignUp from "@/modules/checkFieldSignUp";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

type FieldsType = "username" | "email" | "password" | "all";

export interface IFieldError {
  error: boolean;
  fields: FieldsType[];
  message: string;
}

interface IAuthContext {
  user: IUser | Partial<IUser> | null;
  errorStatus: IFieldError;
  login: (email: string, password: string) => Promise<false | undefined>;
  logout: () => void;
  signUp: (
    newUser: Partial<IUser>,
    confirmPassword: string
  ) => Promise<boolean>;
  updateUserDisplayName: (displayName: string) => void;
  setError: (error: IFieldError) => void;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | Partial<IUser> | null>(null);
  const [errorStatus, setErrorStatus] = useState<IFieldError>({
    error: false,
    fields: [],
    message: "",
  });

  const pathname = usePathname();
  const route = useRouter();

  const fetcher = new Fetcher("auth");
  const userFetcher = new Fetcher("user");

  useEffect(() => {
    setErrorStatus({
      error: false,
      fields: [],
      message: "",
    });
    const token = sessionStorage.getItem("accessToken");
    const noSessionTokenLogout = async () => {
      if (pathname === '/signout' || pathname === '/signin' || pathname === '/signup') return
      try {
        const res = await fetch('/api/auth/', {
          method: "GET"
        })
        const data = await res.json();
        route.push('/signin')
        if (data.error) {
          setErrorStatus(data);
          return false;
        }
      } catch (err) {
          if (err instanceof Error) {
            console.log("Error =>",err);
            setErrorStatus({
              error: true,
              fields: ["all"],
              message: err.message,
            });
            return false;
        }
      }
    }
    if (!token) noSessionTokenLogout()

    const getMe = async () => {
      const userData = (await new Fetcher("auth").get({ endpoint: "me" })) as {
        user: IUser;
      };
      setUser(userData.user);
    };
    const publicRoutes = ["/signin", "/signup", "/signout"];
    if (!user && !publicRoutes.some((route) => route === pathname)) getMe();
  }, [pathname, user, route.push]);


  const login = async (email: string, password: string) => {
    const result = checkFieldsSignIn(email, password);

    if (result.error) {
      setErrorStatus(result);
      return false;
    }

    try {
      const res = await fetch('/api/auth/', {
        method: "POST",
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      if (!data.accessToken) return;
      sessionStorage.setItem("accessToken", data.accessToken);
    } catch (err) {
        if (err instanceof Error) {
          console.log("Error =>",err);
          setErrorStatus({
            error: true,
            fields: ["all"],
            message: err.message,
          });
          return false;
      }
    }

    const userData = (await fetcher.get({ endpoint: "me" })) as { user: IUser };
    const user: Partial<IUser> = userData.user;

    const userInfo: Partial<IUser> = {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName ?? undefined,
    };
    setUser(userInfo);
    route.refresh();
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/', {
        method: "GET"
      })
      const data = await res.json();
      if (data.error) {
        setErrorStatus(data);
        return false;
      }
    } catch (err) {
        if (err instanceof Error) {
          console.log("Error =>",err);
          setErrorStatus({
            error: true,
            fields: ["all"],
            message: err.message,
          });
          return false;
      }
    }
    setUser(null);
  };

  const signUp = async (newUser: Partial<IUser>, confirmPassword: string) => {
    if (!newUser.username || !newUser.email || !newUser.password) return false;
    newUser.username.toLowerCase().trim();
    newUser.email.toLowerCase().trim();

    const result = checkFieldsSignUp(
      newUser.username,
      newUser.email,
      newUser.password,
      confirmPassword
    );

    if (result.error) {
      setErrorStatus(result);
      return false;
    }

    const res = await fetcher.post<Partial<IUser>, IFieldError>(newUser, {
      endpoint: "signup",
    });
    if (res?.error) {
      setErrorStatus(res);
      return false;
    }

    return true;
  };

  const updateUserDisplayName = async (displayName: string) => {
    const res = await userFetcher.patch({ displayName }, { id: user?.id });
    if (res) {
      const userInfo: Partial<IUser> = {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        displayName: displayName,
      };
      setUser((prev) => ({ ...prev, ...userInfo }));
    }
  };

  const setError = (err: {
    error: boolean;
    fields: FieldsType[];
    message: string;
  }) => {
    setErrorStatus({
      error: err.error,
      fields: err.fields,
      message: err.message,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errorStatus,
        login,
        logout,
        signUp,
        updateUserDisplayName,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
