import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import { LinkButton } from "@/components/Button";
import { getCourse } from "./actions";
import { Course, Lesson } from "@/api";

export const runtime = "edge";

export default async function Page({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);

  if (!course) {
    // TODO: better not found page, with a nice message
    return <div>Course not found</div>;
  }

  const hours = calculateHours(course);

  return (
    <main className="max-w-screen-lg mx-auto text-primary-900">
      <PublicHeader />
      <h2 className="font-bold text-4xl">{course.name}</h2>
      {course.description && <p className="my-5">{course.description}</p>}
      {course.status == "error" && (
        <div className="bg-red-50 border-red-600 border p-5 rounded-md flex items-center">
          <div className="text-5xl w-32 text-center text-red-900">!</div>
          <div>
            <h2 className="font-bold text-lg mb-3">Import error</h2>
            <p className="mb-2">We are unable to get the course!</p>
            <p>
              Make sure the playlist and the videos are public or unlisted and
              try again.
            </p>
          </div>
        </div>
      )}

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
            <p className="mb-2">
              We are importing the course to you learning and enjoy with us!
            </p>
            <p>For now, take a breath, and back here soon.</p>
          </div>
        </div>
      )}

      {course.status == "imported" && (
        <div className="flex justify-between items-center">
          <div className="flex items-center text-2xl my-5">
            <div className="px-2">
              <span className="block font-bold">{course.lessons?.length}</span>
              <span className="block text-base">lessons</span>
            </div>
            {hours > 0.0 && (
              <>
                <span className="block pl-5 mr-5 h-8 border-blue-900 border-r-2"></span>

                <div className="px-2">
                  <span className="block font-bold">{hours}</span>
                  <span className="block text-base">hours</span>
                </div>
              </>
            )}
          </div>
          <LinkButton href={`/platform/courses/${params.slug}`}>
            Join now
          </LinkButton>
        </div>
      )}

      {course.status == "imported" && (
        <div className="drop-shadow-md mb-8 bg-white rounded-3xl p-4">
          <h2 className="font-bold mb-2">Lessons</h2>

          <ol>
            {course.lessons &&
              course.lessons.map((lesson) => (
                <li className="py-4" key={lesson.slug}>
                  <Link
                    href={`/${course.slug}/lessons/${lesson.slug}`}
                    className="flex"
                  >
                    <div>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="20" cy="20" r="20" fill="#80EECD" />
                        <path
                          d="M32.5162 19.538L14.5162 29.0642L14.5162 10.0117L32.5162 19.538Z"
                          fill="#080135"
                        />
                      </svg>
                    </div>
                    <span className="ml-4 flex-1 font-light">
                      {lesson.name}
                    </span>
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      )}
    </main>
  );
}

const calculateHours = (course: Course) => {
  if (!course.lessons) {
    return 0;
  }

  const totalDuration = course.lessons.reduce<number>(
    (total: number, lesson: Lesson) => total + lesson.duration!,
    0
  );

  if (totalDuration == 0) {
    return 0;
  }

  return Math.floor(totalDuration / 1000.0 / 60 / 60);
};
