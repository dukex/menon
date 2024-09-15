import { getCoursesForMe } from "../course";
import { User } from "../../types";

interface Env {
  DATABASE: D1Database;
  ACCEPTED_ORIGINS: string;
}

export const onRequestGet: PagesFunction<Env> = async (
  context: EventContext<Env, any, { user: User }>
) => {
  const { user } = context.data;

  const courses = await getCoursesForMe(user.email, context.env.DATABASE);

  const response = new Response(JSON.stringify(courses), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
    },
  });

  return response;
};
