"use client";

import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import AuthInput from "@/components/Input/AuthInput";
import PasswordHint from "@/components/PasswordHint";
import { AuthContext } from "@/context/AuthContext";
import IdGenerator from "@/utils/IdGenerator";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const { signUp, errorStatus } = useContext(AuthContext);

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const id = new IdGenerator(16).id;

    const res: boolean = signUp(
      { id, email, password, username },
      confirmPassword
    );

    if (res) {
      setEmail("");
      setPassword("");
      setUsername("");
      redirect("/signin");
    }
  }

  const lowerChar: RegExp = /^(?=.*[a-z])/;
  const upperChar: RegExp = /^(?=.*[A-Z])/;
  const numberChar: RegExp = /^(?=.*[0-9])/;
  const specialChar: RegExp = /^(?=.*[!@#$%&*?])/;

  return (
    <main className="page flex items-center justify-center pt-0" id="main">
      <section
        className="flex flex-col items-center min-w-[300px] w-[90%] max-w-[568px] max-h-[calc(100%-120px)] px-4 pt-8 pb-4 border rounded-lg gap-y-4
        dark:border-woodsmoke-800 border-woodsmoke-300 overflow-y-auto"
      >
        <form
          onSubmit={(ev) => handleSubmit(ev)}
          className="flex flex-col gap-y-8 w-full"
        >
          <AuthInput
            icon={<AiOutlineUser />}
            value={username}
            setValue={setUsername}
            id="userName"
            inputType="text"
            placeholder="Digite seu Nome de usuário"
            label="Nome de Usuário"
            error={
              errorStatus.field === "userName" || errorStatus.field === "all"
            }
            errorMessage={
              errorStatus.field === "userName" ? errorStatus.message : ""
            }
          />
          <AuthInput
            icon={<AiOutlineMail />}
            value={email}
            setValue={setEmail}
            id="email"
            inputType="email"
            placeholder="Digite seu Email"
            label="Email"
            error={errorStatus.field === "email" || errorStatus.field === "all"}
            errorMessage={
              errorStatus.field === "email" ? errorStatus.message : ""
            }
          />
          <AuthInput
            icon={<AiOutlineLock />}
            value={password}
            setValue={setPassword}
            id="password"
            inputType="password"
            placeholder="Digite sua Senha"
            label="Senha"
            error={
              errorStatus.field === "password" || errorStatus.field === "all"
            }
            errorMessage={
              errorStatus.field === "password" ? errorStatus.message : ""
            }
          />
          <AuthInput
            icon={<AiOutlineLock />}
            value={confirmPassword}
            setValue={setConfirmPassword}
            id="confirmPassword"
            inputType="password"
            placeholder="Confirme sua Senha"
            label="Confirmar Senha"
            error={
              errorStatus.field === "password" || errorStatus.field === "all"
            }
            errorMessage={
              errorStatus.field === "password" ? errorStatus.message : ""
            }
          />
          <section className="p-2 border rounded-lg border-woodsmoke-400 text-woodsmoke-800 dark:border-woodsmoke-800 dark:text-woodsmoke-200">
            <p className="font-bold">Requisitos da senha:</p>
            <PasswordHint
              pass={!password.includes(" ")}
              text="Não deve conter espaços em branco"
            />
            <PasswordHint
              pass={password.length >= 8}
              text="Mínimo de 8 Caractéres"
            />
            <PasswordHint
              pass={password.length <= 48 && password.length >= 8}
              text="Máximo de 48 Caractéres"
            />
            <PasswordHint
              pass={lowerChar.test(password)}
              text="Letras Minúsculas - [a-z]"
            />
            <PasswordHint
              pass={upperChar.test(password)}
              text="Letras Maiúsculas - [A-Z]"
            />
            <PasswordHint
              pass={numberChar.test(password)}
              text="Números - [1-9]"
            />
            <PasswordHint
              pass={specialChar.test(password)}
              text="Caracteres Especiais - [! @ # $ % & * ?]"
            />
          </section>
          <div className="flex flex-col self-end">
            <Button
              type="submit"
              label="Criar Conta"
              extraStyles={{
                button: `px-2 self-end text-woodsmoke-950 border-woodsmoke-400
                dark:text-woodsmoke-100 dark:border-woodsmoke-800
                hover:text-woodsmoke-950 hover:border-woodsmoke-950
                dark:hover:text-woodsmoke-100 dark:hover:border-woodsmoke-100
                `,
              }}
            />
            {errorStatus.field === "all" && (
              <p className="text-sm text-poppy-600">{errorStatus.message}</p>
            )}
          </div>
        </form>
        <Divider />
        <p className="self-end text-woodsmoke-950 dark:text-woodsmoke-100">
          Já possui uma conta ainda?
          <Link
            href="/signin"
            className="inline-block font-bold underline ml-2"
          >
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
}
