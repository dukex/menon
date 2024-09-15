import { Course } from "@/api";
import Link from "next/link";

export default function Lessons({ course }: { course: Course }) {
  return (
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
                <span className="ml-4 flex-1 font-light">{lesson.name}</span>
              </Link>
            </li>
          ))}
      </ol>
    </div>
  );
}
