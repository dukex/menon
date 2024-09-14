import { User } from "../types";
import { Cache, D1CacheStorage } from "../helpers/cache";

interface Env {
  DATABASE: D1Database;
}

async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    console.log("error", err.message, err.stack);
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

const server = "https://dev-task-boss.us.auth0.com/userinfo";

const getToken = (context) => {
  return context.request.headers.get("Authorization")?.split(" ")[1];
};

async function authentication(context: EventContext<Env, any, { user: User }>) {
  const storage = new D1CacheStorage(context.env.DATABASE, "auth-token");

  const cache = new Cache(storage);
  const token = getToken(context);

  if (!token) {
    return new Response("Unauthorized", { status: 403 });
  }

  const user = await cache.fetch<User>(token, 1000 * 10, async () => {
    const auth0resp = await fetch(server, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (auth0resp.status !== 200) {
      console.log("auth0resp", auth0resp.status, auth0resp.statusText);
      return null;
    }

    const user = (await auth0resp.json()) as User;

    if (!user.sub) {
      return null;
    }

    return user;
  });

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  context.data.user = user;

  return await context.next();
}

export const onRequest = [errorHandling, authentication];
