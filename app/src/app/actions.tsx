"use server";

const validUrl = (url: string) => {
  const id = url.split("list=")[1] || "";
  return id.length > 2;
};

export async function createYoutubePlaylist(
  prevState: { url: string; error: string },
  data: FormData
) {
  console.log("pprevState", prevState);
  console.log("dsds", data);

  const source = data.get("url")?.toString() || "";
  const valid = validUrl(source);

  const rawData = {
    provider: "youtube-playlist",
    source,
    valid,
  };

  console.log(rawData);

  return { error: valid ? "" : "Invalid youtube playlist URL" };
}
