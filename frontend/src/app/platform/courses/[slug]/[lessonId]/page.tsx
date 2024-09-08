import { getSession } from "@auth0/nextjs-auth0/edge";
import { getCourseForMe } from "./actions";
import Link from "next/link";

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
        <div className="relative h-0 overflow-hidden max-w-full pb-[56%] py-2">
          <iframe
            title="Lesson video"
            className="absolute top-0 left-0 w-full h-full"
            id="ytplayer"
            src={`http://www.youtube.com/embed/${lesson?.provider_id}?origin=https://menon.courses`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <h4 className="text-lg font-bold p-2">{lesson?.name}</h4>

        <div className="mt-2 p-2">{lesson?.description}</div>
      </div>
    </div>
  );
}
