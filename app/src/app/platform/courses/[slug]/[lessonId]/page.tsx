import { getCourse, getLessonForMe } from "@/api";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { slug: string; lessonId: string };
}) {
  const course = await getCourse(params.slug);
  const lesson = await getLessonForMe(course!.id, params.lessonId);

  return (
    <div>
      <p>{JSON.stringify(course)}</p>
      <p>{JSON.stringify(lesson)}</p>
    </div>
  );
}
