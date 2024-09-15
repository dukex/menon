import PublicHeader from "@/components/PublicHeader";
import { getCourse } from "@/api";
import Importing from "@/components/Course/Status/Importing";
import Error from "@/components/Course/Status/Error";
import Imported from "@/components/Course/Status/Imported";
import Link from "next/link";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { slug: string; lessonSlug: string };
}) {
  const course = await getCourse(params.slug);

  if (!course) {
    // TODO: better not found page, with a nice message
    return <div>Course not found</div>;
  }

  const lesson = course.lessons?.find(
    (lesson) => lesson.slug === params.lessonSlug
  );

  if (!lesson) {
    // TODO: better not found page, with a nice message
    return <div>Lesson not found</div>;
  }

  return (
    <main className="max-w-screen-lg mx-auto text-primary-900">
      <PublicHeader />
      <h2 className="font-bold text-4xl">{lesson.name}</h2>
      <h3 className="font-bold text-lg">
        <Link href={`/${course.slug}`}>{course.name}</Link>
      </h3>
      {lesson.description && <p className="my-5">{lesson.description}</p>}

      <img
        src={lesson.thumbnail_url}
        alt={lesson.name}
        className="w-full h-auto"
      />

      <h3 className="font-bold text-lg border-t border-primary-200 pt-5 mt-5">
        About the course
      </h3>
      <p>{course.description}</p>

      {course.status == "error" && <Error />}
      {course.status == "pending" && <Importing />}
      {course.status == "imported" && <Imported course={course} />}
    </main>
  );
}
