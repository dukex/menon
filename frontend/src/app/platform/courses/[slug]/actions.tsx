import { redirect } from "next/navigation";
import {
  getCourseForMe as _getCourseForMe,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../../../api";
import { getSession } from "@auth0/nextjs-auth0/edge";

export const getLessonIdCourse = async (slug: string) => {
  const session = await getSession();

  try {
    const course = await _getCourseForMe(slug, session?.accessToken!);

    if (!course) {
      return;
    }

    const lessonId =
      course.lessons.find((l) => l.time > 0)?.id || course.lessons[0].id;

    return lessonId;
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      redirect("/api/auth/logout");
    } else if (error instanceof NotFoundError) {
      return redirect("/platform/courses");
    } else if (error instanceof Error) {
      console.error(error);
    }
  }
};
