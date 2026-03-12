export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.CRON_SECRET;

    if (!secret || !authHeader || authHeader !== `Bearer ${secret}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL || "http://localhost:3030"}/keepalive`,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
      },
    );

    return new Response("Wake up signal sent!", { status: response.status });
  } catch {
    return new Response("Failed to send wake up signal", { status: 500 });
  }
}
