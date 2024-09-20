import { Hero } from "@/components/Hero";
import Form from "@/components/HomePage/Form";
import Image from "next/image";
import { createYoutubePlaylistAndRedirect } from "./client-actions";
import { listCourses } from "./actions";
import Link from "next/link";

export const runtime = "edge";

export default async function Page() {
  const courses = await listCourses();

  console.log(courses);

  return (
    <div className="flex flex-col justify-between bg-gray-100 text-gray-600 antialiased">
      <Hero
        title={
          <>
            {"Transform any YouTube playlist into "}
            <span className="inline-block bg-primary-500 px-4">
              structured courses
            </span>
          </>
        }
        description=""
      >
        <Form createYoutubePlaylist={createYoutubePlaylistAndRedirect} />
      </Hero>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Available Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Link
                  href={`/${course.slug}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
