import { CourseImported, IDatabase } from "../types";

export default interface IProvider {
  get id(): string | null;

  importCourse(database: IDatabase): Promise<CourseImported>;
  importLessons(courseId: string, database: IDatabase): Promise<boolean>;
}
