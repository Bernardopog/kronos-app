"use client";

import { IUser, mockUserList } from "@/mock/mockUsers";
import { redirect, usePathname } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IError {
  error: boolean;
  field: string;
  message: string;
}

interface IAuthContext {
  user: IUser | null;
  userList: IUser[];
  errorStatus: IError;
  login: (email: string, password: string) => void;
  logout: () => void;
  signUp: (newUser: IUser, confirmPassword: string) => boolean;
  setError: (error: IError) => void;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userList, setUserList] = useState<IUser[]>(mockUserList);
  const [errorStatus, setErrorStatus] = useState<IError>({
    error: false,
    field: "",
    message: "",
  });

  const pathname = usePathname();
  useEffect(() => {
    setErrorStatus({
      error: false,
      field: "",
      message: "",
    });
  }, [pathname]);

  function checkFieldsSignIn(email: string, password: string): boolean {
    function fieldsEmpty(): boolean {
      if (email.length < 1 || password.length < 1) {
        setError({
          error: true,
          field: "all",
          message: "Preencha todos os campos",
        });
        return false;
      }

      return true;
    }

    if (!fieldsEmpty()) return false;

    function emailAndPasswordMatch(): boolean {
      const userFound = userList.find(
        (user) => user.email === email && user.password === password
      );
      if (!userFound) {
        setError({
          error: true,
          field: "all",
          message: "Email ou senha incorretos",
        });
        return false;
      }
      return true;
    }

    if (emailAndPasswordMatch()) {
      setError({ error: false, field: "", message: "" });
      return true;
    } else return false;
  }

  const login = (email: string, password: string) => {
    email.trim().toLowerCase();

    const res = checkFieldsSignIn(email, password);

    if (!res) return false;

    const userFound = userList.find(
      (user) => user.email === email && user.password === password
    );
    if (!userFound) return false;

    setUser(userFound);
    redirect("/");
  };

  const logout = () => {
    setUser(null);
    redirect("/signin");
  };

  function checkFieldsSignUp(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    function fieldsEmpty(): boolean {
      if (
        email.length < 1 ||
        password.length < 1 ||
        confirmPassword.length < 1 ||
        username.length < 1
      ) {
        setError({
          error: true,
          field: "all",
          message: "Preencha todos os campos",
        });
        return false;
      }

      return true;
    }

    if (!fieldsEmpty()) return false;

    function checkUserName(): boolean {
      const userNameRegex: RegExp = /^[a-z0-9_]+$/i;
      if (!userNameRegex.test(username)) {
        setError({
          error: true,
          field: "userName",
          message: "Nome de usuário inválido",
        });
        return false;
      }

      if (username.includes(" ")) {
        setError({
          error: true,
          field: "userName",
          message: "Nome de usuário inválido",
        });
        return false;
      }

      return true;
    }

    function checkEmail(): boolean {
      const emailRegex: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setError({
          error: true,
          field: "email",
          message: "Email inválido",
        });
        return false;
      }

      const emailAlreadyExists = userList.find((user) => user.email === email);

      if (emailAlreadyExists) {
        setError({
          error: true,
          field: "email",
          message: "Email já existente",
        });
        return false;
      }

      return true;
    }
    function checkPassword(): boolean {
      if (password !== confirmPassword) {
        setError({
          error: true,
          field: "password",
          message: "Senhas diferentes",
        });
        return false;
      }

      if (password.length < 8 || password.length > 48) {
        setError({
          error: true,
          field: "password",
          message: "Senha muito curta ou muito longa",
        });
        return false;
      }

      const PasswordRegex: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,48}$/;

      if (!PasswordRegex.test(password)) {
        setError({
          error: true,
          field: "password",
          message: "Senha inválida",
        });
        return false;
      }

      if (password.includes(" ")) {
        setError({
          error: true,
          field: "password",
          message: "Senha inválida",
        });
        return false;
      }
      return true;
    }

    if (checkUserName() && checkEmail() && checkPassword()) {
      setError({ error: false, field: "", message: "" });
      return true;
    } else return false;
  }

  const signUp = (newUser: IUser, confirmPassword: string) => {
    newUser.username.trim().toLowerCase();
    newUser.email.trim().toLowerCase();

    const res = checkFieldsSignUp(
      newUser.username,
      newUser.email,
      newUser.password,
      confirmPassword
    );

    if (!res) return false;

    setUserList([...userList, newUser]);
    return true;
  };

  const setError = (err: {
    error: boolean;
    field: string;
    message: string;
  }) => {
    setErrorStatus({
      error: err.error,
      field: err.field,
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
