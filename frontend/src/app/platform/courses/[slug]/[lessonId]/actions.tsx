import { getCourseForMe as _getCourseForMe } from "@/api";

export const getCourseForMe = async (slug: string, token: string) => {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  return await _getCourseForMe(slug, token);
};
