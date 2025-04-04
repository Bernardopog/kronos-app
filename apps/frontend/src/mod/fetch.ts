import { IUser } from "@/mock/mockUsers";

function error(err: unknown) {
  console.error("Fetch Error ==>", err);
}

export async function loginFetch(email: string, password: string) {
  try {
    const res = await fetch("http://localhost:3030/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function signUpFetch(body: Partial<IUser>) {
  try {
    const res = await fetch("http://localhost:3030/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function meFetch() {
  try {
    const res = await fetch("http://localhost:3030/auth/me", {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}

export async function logoutFetch() {
  try {
    const res = await fetch("http://localhost:3030/auth/signout", {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    error(err);
  }
}
