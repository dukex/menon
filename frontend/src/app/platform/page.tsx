import { SetTitle } from "@/components/Title";
import { getCoursesForMe } from "./actions";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default async function Page() {
  const courses = await getCoursesForMe();

  return (
    <div className="container mx-auto px-4 py-8">
      <SetTitle title={""} />
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={course.thumbnail_url}
              alt={course.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      course.progress === 1
                        ? "bg-green-500"
                        : course.progress > 0.5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${course.progress * 100}%` }}
                  ></div>
                </div>
              </div>
              <Link
                href={`/platform/courses/${course.slug}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
