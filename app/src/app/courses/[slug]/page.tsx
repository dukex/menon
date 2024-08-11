import { Logo } from "@/components/Logo";
import { NavbarTwoColumns } from "@/components/NavbarTwoColumns";
import { Section } from "@/components/Section";
import Link from "next/link";

export interface Course {
  id: string;
  slug: string;
  provider_uid: string;
  provider_id: string;
  name: string;
  description: string;
  creator_name: string;
  thumbnail_url: string;
  published_at: string;
  source_url: string;
  status: "pending" | "error" | "imported";
}

export default async function Page({ params }: { params: { slug: string } }) {
  const course = await fetch(
    `http://localhost:8788/courses/${params.slug}`
  ).then((res) => res.json<Course>());

  console.log(params);

  console.log("data", course);

  return (
    <main className=" max-w-screen-lg mx-auto">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo />}>
          <li>
            <Link href="/app">Sign in</Link>
          </li>
        </NavbarTwoColumns>
      </Section>

      <h2 className="font-bold text-4xl text-primary-900">{course.name}</h2>
      <p className="my-5 text-primary-900">{course.description}</p>
      {course.status == "error" && (
      <div className="bg-red-50 border-red-600 border p-5 rounded-md flex items-center">
          <div className="text-5xl w-32 text-center text-red-900">
            !
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Import error</h2>
            <p className="mb-2">We are unable to import the course!</p>
            <p>Make sure the playlist and the videos are public or unlisted and try again.</p>
          </div>
        </div>)}

      {course.status == "pending" && (
        <div className="bg-yellow-50 border-yellow-600 border p-5 rounded-md flex items-center">
          <div>
            <svg viewBox="0 0 240 240" className="inline-block loader w-32">
              <line
                className="loader-pointer"
                x1="120"
                y1="120"
                x2="120"
                y2="97"
              />
              <line
                className="loader-line"
                x1="120"
                y1="120"
                x2="135"
                y2="120"
              />
              <circle className="loader-circle" cx="120" cy="120" r="30" />
              <circle className="loader-center" cx="120" cy="120" r="5" />
            </svg>
          </div>{" "}
          <div>
            <h2 className="font-bold text-lg mb-3">Importing...</h2>
            <p className="mb-2">We are importing the course to you learning and enjoy with us!</p>
            <p>For now, take a breath, and back here soon.</p>
          </div>
        </div>
      )}

      {course.status != "pending" && (
        <div className="flex items-center text-2xl my-5">
          <div className="px-2">
            <span className="block font-bold">12</span>
            <span className="block text-base">vídeos</span>
          </div>
          <span className="block pl-5 mr-5 h-8 border-blue-900 border-r-2"></span>
          <div className="px-2">
            <span className="block font-bold">4</span>
            <span className="block text-base">hours</span>
          </div>
        </div>
      )}
      {course.status != "pending" && (
        <div className="drop-shadow-md mb-8 bg-white rounded-3xl p-4">
          <h2 className="font-bold mb-2">Lessons</h2>

          <ol>
            % @course.lessons_ordered.each do |lesson| %
            <li className="py-4">
              %= link_to course_lesson_url(course_id: @course.to_param, id:
              lesson.to_param), class: "flex" do % %= image_tag 'play.svg',
              width: "40px", height: "40px", alt: "Start lesson" %
              <span className="ml-4 flex-1 font-light">%= lesson.name %</span>%
              end %
            </li>
            % end %
          </ol>
        </div>
      )}
    </main>
  );
}
