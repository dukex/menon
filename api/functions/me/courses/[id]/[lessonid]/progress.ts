import { updateProgress } from "../../../../course";
import { User } from "../../../../types";

interface Env {
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

interface ProgressInputBody {
  progress: number;
  finished?: boolean;
}

export const onRequestPost: PagesFunction<Env> = async (
  context: EventContext<Env, any, { user: User }>
) => {
  const { user } = context.data;
  const lessonId = context.params.lessonid as string;
  const { progress, finished = false } =
    await context.request.json<ProgressInputBody>();

  await updateProgress(
    user.email,
    lessonId,
    progress,
    finished,
    context.env.DATABASE
  );

  const response = new Response(JSON.stringify({}), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": context.env.ACCEPTED_ORIGINS,
    },
  });

  return response;
};
