"use client";
import { useId, useState } from "react";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

export default function Form({
  createYoutubePlaylist,
}: {
  createYoutubePlaylist: (
    data: FormData
  ) => Promise<{ url: string; error?: string }>;
}) {
  const urlId = useId();
  const router = useRouter();

  const [error, setError] = useState("");

  const formAction = async (data: FormData) => {
    const { url, error } = await createYoutubePlaylist(data);

    if (url.length > 1) {
      router.push(url);
    }

    setError(error || "");
  };

  return (
    <form className="flex flex-col" action={formAction}>
      <label
        htmlFor={urlId}
        className="pb-2 text-lg font-bold text-primary-900"
      >
        Youtube Playlist URL:
      </label>
      <input
        id={urlId}
        name="url"
        required
        placeholder="https://www.youtube.com/playlist?list=..."
        type="text"
        className="rounded-sm border border-primary-900 p-5 font-mono text-xl text-primary-900"
      />
      <p
        className={`${
          error.length < 1 ? "" : "bg-red-500"
        } text-md h-10  p-2 text-white`}
      >
        {error}
      </p>

      <div className="mt-2">
        <Button xl type="submit">
          Import now
        </Button>
      </div>
    </form>
  );
}
