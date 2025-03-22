"use client";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import AuthInput from "@/components/Input/AuthInput";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, errorStatus } = useContext(AuthContext);

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    login(email, password);
  }

  return (
    <main className="page flex items-center justify-center" id="main">
      <section
        className="flex flex-col items-center min-w-[300px] w-[90%] max-w-[568px] h-fit px-4 pt-8 pb-4 border rounded-lg gap-y-4
        dark:border-woodsmoke-800 border-woodsmoke-300"
      >
        <form
          onSubmit={(ev) => handleSubmit(ev)}
          className="flex flex-col gap-y-8 w-full"
        >
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
          <div className="flex flex-col self-end">
            <Button
              type="submit"
              label="Entrar"
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
          Não possui uma conta ainda?
          <Link
            href="/signup"
            className="inline-block font-bold underline ml-2"
          >
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  );
}
