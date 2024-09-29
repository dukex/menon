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

    const lastLessons = course.lessons
      .map<[number, string]>((l) => [
        l.finished ? 20 : parseInt(l.time) > 0 ? 0 : 5,
        l.id,
      ])
      .sort((a, b) => a[0] - b[0]);

    const lessonId = lastLessons[0][1];

    return lessonId;
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      redirect("/api/auth/logout");
    } else if (error instanceof NotFoundError) {
      return redirect("/platform");
    } else if (error instanceof Error) {
      console.error(error);
    }
  }
};
