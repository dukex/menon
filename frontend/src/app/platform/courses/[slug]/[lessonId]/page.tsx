import { getSession } from "@auth0/nextjs-auth0/edge";
import { getCourseForMe } from "./actions";
import Link from "next/link";
import YoutubePlayer from "@/components/YoutubePlayer";
import { SetTitle } from "@/components/Title";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { slug: string; lessonId: string };
}) {
  const session = await getSession();
  const course = await getCourseForMe(params.slug, session?.accessToken!);

  if (!course) {
    return <div>Course not found</div>;
  }

  const index = course.lessons.findIndex(
    (lesson) => lesson.id === params.lessonId
  );

  const lesson = course.lessons[index];
  const previousLesson = course.lessons.find(
    (lesson, i) => !lesson.finished && i < index
  );

  if (previousLesson) {
    redirect(`/platform/courses/${course.slug}/${previousLesson.id}`);
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <SetTitle title={course.name} />
      <div className="md:w-3/12">
        <div className="md:p-2">
          <ol className="mt-2 md:overflow-y-scroll md:h-[calc(100vh-4rem)]">
            {course?.lessons?.map((lesson) => (
              <li
                className={`${
                  lesson.id === params.lessonId ? "bg-gray-400" : ""
                } border-b border-gray-200 p-2 `}
                key={lesson.id}
              >
                <Link href={`/platform/courses/${course.slug}/${lesson.id}`}>
                  <h5
                    className={`${
                      lesson.id === params.lessonId ? "font-bold" : ""
                    } text-sm `}
                  >
                    {parseInt(lesson.time) > 0
                      ? lesson.finished
                        ? "✅ "
                        : "🕒 "
                      : lesson.id === params.lessonId
                      ? "🕒 "
                      : "🔒 "}

                    {lesson.name}
                  </h5>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="md:w-9/12 mt-2">
        <YoutubePlayer
          courseId={course!.id}
          lesson={lesson!}
          token={session?.accessToken!}
        />
        <h4 className="text-lg font-bold p-2">{lesson?.name}</h4>
        <div className="mt-2 px-2">{lesson?.description}</div>
      </div>
    </div>
  );
}
