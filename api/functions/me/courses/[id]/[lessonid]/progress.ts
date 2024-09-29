import { User } from "../../../../../src/types";
import response from "../../../../../src/web/response";
import updateLessonProgress from "../../../../../src/services/updateLessonProgress";

interface Env {
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

interface ProgressInputBody {
  progress: number;
}

export const onRequestPost: PagesFunction<Env> = async (
  context: EventContext<Env, any, { user: User }>
) => {
  const { user } = context.data;
  const lessonId = context.params.lessonid as string;
  const { progress } = await context.request.json<ProgressInputBody>();

  await updateLessonProgress(
    user.email,
    lessonId,
    progress,
    context.env.DATABASE
  );

  return response({}, context.env.ACCEPTED_ORIGINS);
};
