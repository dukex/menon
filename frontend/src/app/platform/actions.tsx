import {
  getCoursesForMe as _getCoursesForMe,
  ForbiddenError,
  UnauthorizedError,
} from "@/api";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { redirect } from "next/navigation";

export async function getCoursesForMe() {
  const session = await getSession();

  try {
    return _getCoursesForMe(session?.accessToken!);
  } catch (error) {
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      redirect("/api/auth/logout");
    } else if (error instanceof Error) {
      console.error(error);
    }

    return [];
  }
}
