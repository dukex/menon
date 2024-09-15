import { Course, Lesson } from "@/api";
import { LinkButton } from "../Button";

export default function Header({ course }: { course: Course }) {
  const hours = calculateHours(course);

  return (
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
      <LinkButton href={`/platform/courses/${course.slug}`}>
        Join now
      </LinkButton>
    </div>
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
