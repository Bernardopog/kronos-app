import { NextResponse } from "next/server";

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

  const data = await res.json();

  const response = NextResponse.json(data, { status: res.status });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response
}