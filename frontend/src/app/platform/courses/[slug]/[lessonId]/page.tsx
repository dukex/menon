import { getSession } from "@auth0/nextjs-auth0/edge";
import { getCourseForMe } from "./actions";
import Link from "next/link";
import YoutubePlayer from "@/components/YoutubePlayer";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { slug: string; lessonId: string };
}) {
  const session = await getSession();
  const course = await getCourseForMe(params.slug, session?.accessToken!);
  const lesson = course?.lessons?.find(
    (lesson) => lesson.id === params.lessonId
  );

  if (!course) {
    return <div>Course not found</div>;
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="flex">
      <div className="w-2/12">
        <div className="p-2">
          <h3 className="text-lg font-bold border-b border-gray-200 pb-2">
            {course?.name}
          </h3>
          <ol className="mt-2 overflow-y-scroll h-[calc(100vh-10rem)]">
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
                    {lesson.name}
                  </h5>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="w-10/12">
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
