import { redirect } from "next/navigation";
import { getLessonIdCourse } from "./actions";

export const runtime = "edge";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const lastLessonId = await getLessonIdCourse(slug);

  if (!lastLessonId) {
    return <p>Error</p>;
  }

  redirect(`/platform/courses/${slug}/${lastLessonId}`);
}
