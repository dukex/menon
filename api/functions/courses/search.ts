import response from "../../src/web/response";
import searchCourse from "../../src/services/searchCourses";

interface Env {
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const params = url.searchParams;

  const courses = await searchCourse(params, context.env.DATABASE);

  return response(courses, context.env.ACCEPTED_ORIGINS);
};
