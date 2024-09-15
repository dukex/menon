import PublicHeader from "@/components/PublicHeader";
import { getCourse } from "./actions";
import Importing from "@/components/Course/Status/Importing";
import Error from "@/components/Course/Status/Error";
import Imported from "@/components/Course/Status/Imported";

export const runtime = "edge";

export default async function Page({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);

  if (!course) {
    // TODO: better not found page, with a nice message
    return <div>Course not found</div>;
  }

  return (
    <main className="max-w-screen-lg mx-auto text-primary-900">
      <PublicHeader />
      <h2 className="font-bold text-4xl">{course.name}</h2>
      {course.description && <p className="my-5">{course.description}</p>}

      {course.status == "error" && <Error />}
      {course.status == "pending" && <Importing />}
      {course.status == "imported" && <Imported course={course} />}
    </main>
  );
}
