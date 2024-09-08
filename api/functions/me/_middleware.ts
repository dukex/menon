async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

const server = "https://dev-task-boss.us.auth0.com/userinfo";

const getToken = (context) => {
  return context.request.headers.get("Authorization")?.split(" ")[1];
};

async function authentication(context) {
  const token = getToken(context);

  if (!token) {
    return new Response("Unauthorized", { status: 403 });
  }

  const auth0resp = await fetch(server, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (auth0resp.status !== 200) {
    return new Response("Unauthorized", { status: 403 });
  }

  const user = (await auth0resp.json()) as User;

  if (!user.sub) {
    return new Response("Unauthorized", { status: 403 });
  }

  context.data.user = user;

  return context.next();
}

export const onRequest = [errorHandling, authentication];
