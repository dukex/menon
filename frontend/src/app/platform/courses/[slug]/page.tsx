import { redirect } from "next/navigation";
import { getLessonIdCourse } from "./actions";
import { getSession } from "@auth0/nextjs-auth0/edge";

export const runtime = "edge";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getSession();

  const { slug } = params;

  const lastLessonId = await getLessonIdCourse(slug, session?.accessToken!);

  if (!lastLessonId) {
    return <p>Error</p>;
  }

  redirect(`/platform/courses/${slug}/${lastLessonId}`);
}
