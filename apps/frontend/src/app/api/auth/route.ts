import { NextResponse } from "next/server";

// SignIn
export async function POST(req: Request) {

  const body = await req.json();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;

  const res = await fetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  const data: {fields: {accessToken: string}[]} = await res.json();

  const response = NextResponse.json({ accessToken: data.fields[0].accessToken }, { status: res.status });
  
  response.cookies.set('accessToken', data.fields[0].accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  return response
}