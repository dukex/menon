import getCourseByUser from "../../../src/services/getCourseForUser";
import { IDatabase, User } from "../../../src/types";
import response from "../../../src/web/response";

interface Env {
  DATABASE: IDatabase;
  ACCEPTED_ORIGINS: string;
}

export const onRequestGet: PagesFunction<Env> = async (
  context: EventContext<Env, any, { user: User }>
) => {
  const { user } = context.data;

  const courseId = context.params.id as string;

  const course = await getCourseByUser(
    user.email,
    courseId,
    context.env.DATABASE
  );

  return response(course, context.env.ACCEPTED_ORIGINS);
};
