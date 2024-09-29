import { User } from "../../src/types";
import getCoursesForUser from "../../src/services/getCoursesForUser";
import response from "../../src/web/response";

interface Env {
  DATABASE: D1Database;
  ACCEPTED_ORIGINS: string;
}

export const onRequestGet: PagesFunction<Env> = async (
  context: EventContext<Env, any, { user: User }>
) => {
  const { user } = context.data;

  const courses = await getCoursesForUser(user.email, context.env.DATABASE);

  return response(courses, context.env.ACCEPTED_ORIGINS);
};
