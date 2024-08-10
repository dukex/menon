"use client";

import { useId } from "react";
import { Button } from "../Button";
import { useFormState } from "react-dom";

interface State {
  url: string;
  error: string;
}

const initialState = { url: "", error: "" };

export default function Form({
  createYoutubePlaylist,
}: {
  createYoutubePlaylist: (prevState: State, data: FormData) => State;
}) {
  const urlId = useId();
  const [state, formAction] = useFormState(createYoutubePlaylist, initialState);

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
          state.error.length < 1 ? "" : "bg-red-500"
        } text-md h-10  p-2 text-white`}
      >
        {state.error}
      </p>

      <div className="mt-2">
        <Button xl type="submit">
          Import now
        </Button>
      </div>
    </form>
  );
}
