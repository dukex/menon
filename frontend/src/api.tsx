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

export interface CourseForMe extends Course {
  lessons: LessonForMe[];
}

export interface LessonForMe extends Lesson {
  time: number;
  finished: boolean;
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

export const getCourse = async (slug: string): Promise<Course | undefined> => {
  try {
    const course = await fetch(`${config.apiURL}/courses/${slug}`).then((res) =>
      res.json<Course>()
    );

    return course;
  } catch (error) {
    return;
  }
};

export const getCourseForMe = async (
  slug: string,
  token: string
): Promise<CourseForMe | undefined> => {
  try {
    const course = await fetch(`${config.apiURL}/me/courses/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json<CourseForMe>());

    return course;
  } catch (error) {
    return;
  }
};

export const saveProgress = async (
  courseId: string,
  lessonId: string,
  progress: number,
  token: string
) => {
  return await fetch(
    `${config.apiURL}/me/courses/${courseId}/${lessonId}/progress`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress }),
    }
  ).then((res) => res.json());
};
