import { getLessons } from "../../../course";

interface Env {
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  console.log(context.params);
  const courseId = context.params.id as string;
  const lessonId = context.params.lessonid as string;

  const lessons = await getLessons(courseId, context.env.DATABASE);

  const response = new Response(JSON.stringify(lessons), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
    },
  });

  return response;
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
};
