import { NextResponse } from "next/server";
// SignOut
export async function GET() {

  const response = NextResponse.json({ message: "Successfully Logout" }, { status: 200 });

  response.cookies.set('accessToken', '', { 
    httpOnly: true, 
    secure: true, 
    sameSite: 'none', 
    path: '/', 
    expires: new Date(0) 
  });

  return response;
}

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

  if (!data.fields[0].accessToken) return NextResponse.json({ message: "User or Password are invalid" }, { status: 401 });

  const response = NextResponse.json({ accessToken: data.fields[0].accessToken }, { status: res.status });
  
  response.cookies.set('accessToken', data.fields[0].accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  return response
}