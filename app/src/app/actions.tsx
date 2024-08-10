"use client";

const validUrl = (url: string) => {
  const id = url.split("list=")[1] || "";
  return id.length > 2;
};

export async function createYoutubePlaylist(
  prevState: { url: string; error: string },
  data: FormData
) {
  const source = data.get("url")?.toString() || "";
  const valid = validUrl(source);

  const rawData = {
    provider: "youtube-playlist",
    source,
    valid,
  };

  if (valid) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const course = await fetch(
      "https://api.menon.courses/courses/importation",
      {
        method: "POST",
        body: JSON.stringify(rawData),
        headers,
      }
    ).then((r) => r.json());

    return { url: source, error: "", course };
  }

  return { url: source, error: "Invalid youtube playlist URL" };
}
