import { IFieldError } from "@/context/AuthContext";

export default function checkFieldsSignUp(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  function valid(): IFieldError {
    return { error: false, fields: [], message: "" };
  }

  function fieldsEmpty(): IFieldError {
    if (
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1 ||
      username.length < 1
    ) {
      return {
        error: true,
        fields: ["all"],
        message: "Preencha todos os campos",
      };
    }

    return valid();
  }
  const emptyError = fieldsEmpty();
  if (emptyError.error) {
    return emptyError;
  }

  function checkUserName(): IFieldError {
    const userNameRegex: RegExp = /^[a-z0-9_]+$/i;
    if (!userNameRegex.test(username) || username.includes(" ")) {
      return {
        error: true,
        fields: ["username"],
        message: "Nome de usuário inválido",
      };
    }

    return valid();
  }
  const userNameError = checkUserName();
  if (userNameError.error) {
    return userNameError;
  }

  function checkEmail(): IFieldError {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return {
        error: true,
        fields: ["email"],
        message: "Email inválido",
      };
    }

    return valid();
  }
  const emailError = checkEmail();
  if (emailError.error) {
    return emailError;
  }

  function checkPassword(): IFieldError {
    const PasswordRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,48}$/;

    if (password !== confirmPassword) {
      return {
        error: true,
        fields: ["password"],
        message: "Senhas diferentes",
      };
    }

    if (password.length < 8 || password.length > 48) {
      return {
        error: true,
        fields: ["password"],
        message: "Senha muito curta ou muito longa",
      };
    }

    if (!PasswordRegex.test(password) || password.includes(" ")) {
      return {
        error: true,
        fields: ["password"],
        message: "Senha inválida",
      };
    }
    return valid();
  }
  const passwordError = checkPassword();
  if (passwordError.error) {
    return passwordError;
  }

  return valid();
}
