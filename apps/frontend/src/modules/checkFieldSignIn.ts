import { IFieldError } from "@/context/AuthContext";

export function checkFieldsSignIn(email: string, password: string) {
  function valid(): IFieldError {
    return { error: false, fields: [], message: "" };
  }

  function fieldsEmpty(): IFieldError {
    if (email.length < 1 || password.length < 1) {
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

  return valid();
}
