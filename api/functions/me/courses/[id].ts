import { getCourse, getLessonsForMe } from "../../course";
import { User } from "../../types";

interface Env {
  DATABASE: D1Database;
  ACCEPTED_ORIGINS: string;
}

export const onRequestGet: PagesFunction<Env> = async (
  context: EventContext<Env, any, { user: User }>
) => {
  const { user } = context.data;

  const courseId = context.params.id as string;

  const course = await getCourse(courseId, context.env.DATABASE);

  const lessons = await getLessonsForMe(
    course.id,
    user.email,
    context.env.DATABASE
  );

  const progress =
    lessons.filter((lesson) => lesson.finished).length / lessons.length;

  const response = new Response(
    JSON.stringify({ ...course, lessons, progress }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
      },
    }
  );

  return response;
};
