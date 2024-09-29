import getCourseWithLessons from "../../src/services/getCourseWithLessons";
import response from "../../src/web/response";

interface Env {
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug as string;

  try {
    const course = await getCourseWithLessons(slug, context.env.DATABASE);

    return response(course, context.env.ACCEPTED_ORIGINS);
  } catch (error) {
    return new Response(null, { status: 404 });
  }
};
