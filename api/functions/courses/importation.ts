import response from "../../src/web/response";
import importCourse from "../../src/services/importCourse";
import {
  CourseImportRequest,
  InvalidBodyError,
  ProviderNotFoundError,
  InvalidProviderError,
  ImportCourseError,
} from "../../src/types";
import { getRequestBody } from "../../src/helpers/getRequestBody";

export interface Env {
  YOUTUBE_API_KEY: string;
  ACCEPTED_ORIGINS: string;
  DATABASE: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.env.ACCEPTED_ORIGINS;

  try {
    const body = await getRequestBody<CourseImportRequest>(context);

    const course = await importCourse(
      body,
      context.env.YOUTUBE_API_KEY,
      context.env.DATABASE
    );

    return response(course, origin);
  } catch (error) {
    if (error instanceof ProviderNotFoundError) {
      return response({ error: "provider not found" }, origin, 422);
    } else if (error instanceof InvalidProviderError) {
      return response({ error: "invliad provider error" }, origin, 422);
    } else if (error instanceof InvalidBodyError) {
      return response({ error: "invalid body" }, origin, 400);
    } else if (error instanceof ImportCourseError) {
      return response({ error: "import error" }, origin, 500);
    } else {
      console.log("error", error);
      return response({ error: "error" }, origin, 500);
    }
  }
};
