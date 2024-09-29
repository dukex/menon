import {
  IDatabase,
  CourseImportRequest,
  InvalidProviderError,
  CourseImported,
  ImportCourseError,
} from "../types";
import ImportProvider from "../providers/Provider";
import { getCourseByProvider } from "../repositories/courses/getCourseByProvider";

export default async function importCourse(
  body: CourseImportRequest,
  key: string,
  database: IDatabase
): Promise<CourseImported> {
  const provider = ImportProvider.fetch(body.provider, {
    key,
    source: body.source,
  });

  if (!provider.id) {
    throw new InvalidProviderError();
  }

  console.log(provider.id);

  const existentCourse = await getCourseByProvider(
    body.provider,
    provider.id,
    database
  );

  if (existentCourse) {
    if (existentCourse.status === "pending") {
      await provider.importLessons(existentCourse.id, database);
    }

    return existentCourse;
  }

  try {
    const course = await provider.importCourse(database);

    await provider.importLessons(course.id, database);

    return course;
  } catch (error) {
    throw new ImportCourseError();
  }
}
