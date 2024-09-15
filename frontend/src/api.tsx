import config from "@/config/App";

export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

async function request<T>(path: string, token?: string): Promise<T> {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return await fetch(`${config.apiURL}/${path}`, {
    headers: headers as HeadersInit,
  }).then((res) => {
    if (res.ok) {
      return res.json<T>();
    } else {
      if (res.status === 404) {
        throw new NotFoundError("Not found");
      } else if (res.status === 401) {
        throw new UnauthorizedError("Unauthorized");
      } else if (res.status === 403) {
        throw new ForbiddenError("Forbidden");
      } else {
        throw new Error("Unknown error");
      }
    }
  });
}

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

export interface Lesson {
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
  return await request(`me/courses/${slug}`, token);
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
