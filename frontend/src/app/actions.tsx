import { Course } from "@/api";
import config from "../config/App";

export const listCourses = async () => {
  const response = await fetch(
    `${config.apiURL}/courses/search?status=imported`
  );
  const data = await response.json<{ results: Course[] }>();
  return data.results;
};
