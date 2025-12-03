import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/me`;

  const cookieStore = cookies();
  const token = (await cookieStore).get('accessToken')?.value;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${token}`
    }
  });

  const data = (await res.json());
  return NextResponse.json(data, { status: res.status });
}