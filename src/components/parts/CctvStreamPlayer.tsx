'use client'
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  url?: string;
}

export function CctvStreamPlayer({ url }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isYoutube = url?.includes("youtube.com/embed");
  const isHls = url?.includes(".m3u8");

  useEffect(() => {
    if (!url || !isHls || !videoRef.current) return;

    const video = videoRef.current;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else {
      video.src = url;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [url, isHls]);

  if (isYoutube) {
    return (
      <iframe
        src={url}
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  );
}
