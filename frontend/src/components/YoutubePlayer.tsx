"use client";

import { LessonForMe } from "@/api";
import { saveProgress } from "@/app/platform/courses/[slug]/[lessonId]/actions";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5,
}

interface YoutubeOnStageChangeEvent {
  data: PlayerState;
}

export default function YoutubePlayer({
  courseId,
  lesson,
  token,
}: {
  courseId: string;
  lesson: LessonForMe;
  token: string;
}) {
  const [playState, setPlayState] = useState<PlayerState>();
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState<any>();

  const _onReady = (event: any) => {
    event.target.g.classList.add(
      "absolute",
      "top-0",
      "left-0",
      "w-full",
      "h-full"
    );

    setPlayer(event.target);
  };

  const _onStateChange = (event: YoutubeOnStageChangeEvent) => {
    setPlayState(event.data);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (playState === PlayerState.PLAYING) {
        setCurrentTime(player.getCurrentTime() * 1000);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [playState, player, currentTime]);

  useEffect(() => {
    if (currentTime > 5) {
      saveProgress(courseId, lesson.id, currentTime, token);
    }
  }, [currentTime, lesson.id, courseId, token]);

  return (
    <div className="relative h-0 overflow-hidden max-w-full pb-[56%] py-2">
      <YouTube
        videoId={lesson?.provider_id}
        opts={{}}
        onReady={_onReady}
        onStateChange={_onStateChange}
      />
    </div>
  );
}
