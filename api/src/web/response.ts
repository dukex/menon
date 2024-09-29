export default function response(
  body: Record<string, any>,
  origin: string,
  status: number = 200
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
    },
  });
}
