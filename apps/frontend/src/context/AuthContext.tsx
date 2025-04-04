"use client";

import { IUser, mockUserList } from "@/mock/mockUsers";
import { checkFieldsSignIn } from "@/mod/checkFieldSignIn";
import checkFieldsSignUp from "@/mod/checkFieldSignUp";
import { loginFetch, logoutFetch, meFetch, signUpFetch } from "@/mod/fetch";
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
  userList: IUser[];
  errorStatus: IFieldError;
  login: (email: string, password: string) => Promise<false | undefined>;
  logout: () => void;
  signUp: (
    newUser: Partial<IUser>,
    confirmPassword: string
  ) => Promise<boolean>;
  setError: (error: IFieldError) => void;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | Partial<IUser> | null>(null);
  const [userList] = useState<IUser[]>(mockUserList);
  const [errorStatus, setErrorStatus] = useState<IFieldError>({
    error: false,
    fields: [],
    message: "",
  });

  const pathname = usePathname();
  const route = useRouter();

  useEffect(() => {
    setErrorStatus({
      error: false,
      fields: [],
      message: "",
    });
    const getMe = async () => {
      const userData = await meFetch();
      setUser(userData.user);
    };
    const publicRoutes = ["/signin", "/signup", "/signout"];
    if (!user && !publicRoutes.some((route) => route === pathname)) getMe();
  }, [pathname, user]);

  const login = async (email: string, password: string) => {
    const result = checkFieldsSignIn(email, password);

    if (result.error) {
      setErrorStatus(result);
      return false;
    }

    const res = await loginFetch(email, password);

    if (res.error) {
      setErrorStatus(res);
      return false;
    }

    const userData = await meFetch();
    const user: Partial<IUser> = await userData.user;

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
    await logoutFetch();
    setUser(null);
  };

  const signUp = async (newUser: Partial<IUser>, confirmPassword: string) => {
    newUser.username!.toLowerCase().trim();
    newUser.email!.toLowerCase().trim();

    const result = checkFieldsSignUp(
      newUser.username!,
      newUser.email!,
      newUser.password!,
      confirmPassword
    );

    if (result.error) {
      setErrorStatus(result);
      return false;
    }

    const res = await signUpFetch(newUser);
    if (res.error) {
      setErrorStatus(res);
      return false;
    }

    return true;
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
      value={{ user, userList, errorStatus, login, logout, signUp, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
