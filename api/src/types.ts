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
  finished: boolean;
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

export class NotFoundError extends Error {}
export class ImportCourseError extends Error {}
export class InvalidProviderError extends Error {}
export class ProviderNotFoundError extends Error {}
export class InvalidBodyError extends Error {}

export interface IDatabase {
  prepare(query: string): IDatabaseStatement;
  batch<T>(values: IDatabaseStatement[]): Promise<IDatabaseResult<T>[]>;
}

interface IDatabaseStatement {
  bind(...values: any[]): IDatabaseStatement;
  first<T = unknown>(colName?: string): Promise<T>;
  run<T = unknown>(): Promise<IDatabaseResult<T>>;
  all<T = unknown>(): Promise<IDatabaseResult<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

interface IDatabaseResult<T> {
  results?: T[];
  success: boolean;
  error?: string;
  meta: any;
}

export interface CourseImportRequest {
  provider: string;
  source: string;
}
