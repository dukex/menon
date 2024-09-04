import { redirect } from "next/navigation";
import { getCourse as _getCourse, getLessonForMe } from "@/api";

export const getCourse = async (slug: string) => {
  const course = await _getCourse(slug);
};
