"use client";
const URL = "https://api.menon.courses";

const validUrl = (url: string) => {
  const id = url.split("list=")[1] || "";
  return id.length > 2;
};

export const createYoutubePlaylistAndRedirect = async (data: FormData) => {
  try {
    const source = data.get("url")?.toString() || "";
    const valid = validUrl(source);

    const rawData = {
      provider: "youtube-playlist",
      source,
      valid,
    };

    if (!valid) {
      return { url: source, error: "Invalid youtube playlist URL" };
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const course: { slug?: string | null; id?: string | null } = await fetch(
      `${URL}/courses/importation`,
      {
        method: "POST",
        body: JSON.stringify(rawData),
        headers,
      }
    )
      .then((r) => {
        if (r.status < 200 || r.status > 300) {
          throw Error("failed to request imporation");
        }
        console.log(r);
        return r;
      })
      .then((r) => r.json());

    if (!(course.slug || course.id)) {
      return {
        url: source,
        error: "Error to fetch youtube playlist data",
        course,
      };
    }

    return { url: `/${course.slug}`, error: "" };
  } catch (e) {
    return { url: "", error: "unknow error" };
  }
};
