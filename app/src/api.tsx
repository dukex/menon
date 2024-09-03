import config from "@/config/App";

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
  lessons?: Lesson[];
}

interface Lesson {
  slug: string;
  name: string;
  duration: number;
  position: number;
  provider_uid: "youtube";
  provider_id: string;
  thumbnail_url: string;
  description: string;
  course_id: string;
  id: string;
  published_at: string;
  source_url: string;
}

export const getCourse = async (slug: string) => {
  const course = await fetch(`${config.apiURL}/courses/${slug}`).then((res) =>
    res.json<Course>()
  );

  return course;
};

export const getLessonForMe = async (courseId: string, lessonId: string) => {
  const lesson = await fetch(
    `${config.apiURL}/me/courses/${courseId}/${lessonId}`
  ).then((res) => res.json<Lesson>());

  return lesson;
};
