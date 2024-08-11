import { Hero } from "@/components/Hero";
import Form from "@/components/HomePage/Form";

import { createYoutubePlaylistAndRedirect } from "@/app/actions";

export default function Page() {
  return (
    <div className="flex h-screen flex-col justify-between bg-gray-100 text-gray-600 antialiased">
      <Hero
        title={
          <>
            {"Transform any YouTube playlist into "}
            <span className="inline-block bg-primary-500 px-4">
              structured courses
            </span>
          </>
        }
        description=""
      >
        <Form createYoutubePlaylist={createYoutubePlaylistAndRedirect} />
      </Hero>
    </div>
  );
}
