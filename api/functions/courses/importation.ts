import { CourseImportRequest, importCourse } from "../importation";

interface Env {
  YOUTUBE_API_KEY: string;
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = await context.request.json<CourseImportRequest>();

  const course = await importCourse(
    body,
    context.env.YOUTUBE_API_KEY,
    context.env.DATABASE
  );

  const responseBody = { ...body, ...course };

  const response = new Response(JSON.stringify(responseBody), {
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
      "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
      "Access-Control-Max-Age": "86400",
    },
  });
};
