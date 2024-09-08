export interface Lesson {
  slug: string;
  name: string;
  duration: number;
  position: number;
  provider_uid: "youtube";
  provider_id: string;
  thumbnail_url: string;
  description: string;
  id: string;
  published_at: string;
  source_url: string;
}

export interface CourseImported {
  id: string;
  slug: string;
  status: "pending" | "error" | "imported";
  provider_id: string;
}

export interface Course extends CourseImported {
  provider_uid: string;
  name: string;
  description: string;
  creator_name: string;
  thumbnail_url: string;
  published_at: string;
  source_url: string;
  lessons: Lesson[];
}

export interface User {
  sub: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
}
