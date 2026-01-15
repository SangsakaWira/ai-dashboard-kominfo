"use client";

import Hls from "hls.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  Minimize,
} from "lucide-react";
import { CCTV } from "@/types";

type Props = {
  selected?: CCTV;
  selectedLoading: boolean;
  onRemoveMainPlayer: () => void
};

export function MainPlayer({ selected, selectedLoading, onRemoveMainPlayer }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamUrlRef = useRef<string>("");
  const mutedRef = useRef<boolean>(true);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);
  const [theatre, setTheatre] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  // const [reconnectTimer, setReconnectTimer] = useState<any>(null);

  const streamUrl = selected ? selected.stream_url : "";

  const isYouTubeUrl = (url: string) =>
  /youtube\.com|youtu\.be/.test(url);

  useEffect(() => {
    streamUrlRef.current = streamUrl;
  }, [streamUrl]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const destroyHls = useCallback(() => {
    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch (e) {
        console.error("HLS destroy error:", e);
      }
      hlsRef.current = null;
    }
  }, []);

  const cleanupTimers = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  const loadStreamInternal = useCallback(
    (isReconnect: boolean = false) => {
      const videoEl = videoRef.current;
      const currentStreamUrl = streamUrlRef.current;
      const currentMuted = mutedRef.current;

 if (!videoEl || !currentStreamUrl || isYouTubeUrl(currentStreamUrl)) {
      if (!videoEl || !currentStreamUrl) {
        console.error(
          "Cannot load stream: missing video element or stream URL"
        );
      }
      return;
    }

      // const currentVolume = volumeRef.current;

      if (!videoEl || !currentStreamUrl) {
        console.error(
          "Cannot load stream: missing video element or stream URL"
        );
        return;
      }

      if (isReconnect) {
        console.log("Reconnecting stream...");
      }

      setError(false);
      destroyHls();

      // Clear existing source
      videoEl.removeAttribute("src");
      videoEl.load();

      // HLS Stream
      if (currentStreamUrl.endsWith(".m3u8")) {
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
            backBufferLength: 90,
            liveSyncDuration: 3,
            maxBufferLength: 30,
            maxBufferSize: 60 * 1000 * 1000,
            maxMaxBufferLength: 30,
            maxBufferHole: 0.5,
            stretchShortVideoTrack: true,
            fragLoadingTimeOut: 10000,
            manifestLoadingTimeOut: 10000,
            levelLoadingTimeOut: 10000,
            manifestLoadingMaxRetry: 2,
            fragLoadingMaxRetry: 3,
          });

          hlsRef.current = hls;

          hls.loadSource(currentStreamUrl);
          hls.attachMedia(videoEl);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("HLS manifest parsed");
            videoEl.muted = currentMuted;
            // videoEl.volume = currentMuted ? 0 : currentVolume;
            videoEl.play().catch((err) => {
              console.error("Auto-play failed:", err);
            });
          });

          hls.on(Hls.Events.ERROR, (_, data) => {
            // Filter out non-fatal buffer warnings
            if (
              (data.details === "bufferSeekOverHole" ||
                data.details === "bufferStalledError") &&
              !data.fatal
            ) {
              console.debug(`Buffer warning: ${data.details}`);
              return;
            }

            console.error("HLS error:", data.type, data.details);

            if (!data.fatal) {
              return;
            }

            setError(true);

            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              console.log("Network error → scheduling reconnect");
              scheduleReconnect();
            } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
              console.log("Media error → attempting recovery");
              hls.recoverMediaError();
            } else {
              console.log("Fatal error → scheduling reconnect");
              scheduleReconnect();
            }
          });
        } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS support (Safari)
          videoEl.src = currentStreamUrl;
          videoEl.muted = currentMuted;
          // videoEl.volume = currentMuted ? 0 : currentVolume;
          videoEl.play().catch((err) => {
            console.error("Native HLS play failed:", err);
          });
        } else {
          console.error("HLS not supported");
          setError(true);
        }
      } else {
        // MP4 or other formats
        videoEl.src = currentStreamUrl;
        videoEl.muted = currentMuted;
        // videoEl.volume = currentMuted ? 0 : currentVolume;
        videoEl.play().catch((err) => {
          console.error("MP4 play failed:", err);
        });
      }
    },
    [destroyHls]
  );

  const loadStream = useCallback(() => {
    // setReconnecting(false);
    cleanupTimers();
    loadStreamInternal(false);
  }, [cleanupTimers, loadStreamInternal]);

  const scheduleReconnect = useCallback(() => {
    cleanupTimers();
    // setReconnecting(true);

    reconnectTimerRef.current = setTimeout(() => {
      loadStreamInternal(true);
    }, 4000);
  }, [cleanupTimers, loadStreamInternal]);

  useEffect(() => {
    if (!selected) {
      destroyHls();
      cleanupTimers();
      return;
    }

    console.log("Loading stream for:", selected.id);

    const delay = setTimeout(() => {
      loadStream();
    }, 200);

    return () => {
      clearTimeout(delay);
      destroyHls();
      cleanupTimers();
    };
  }, [selected, loadStream, destroyHls, cleanupTimers]);

  useEffect(() => {
    return () => {
      destroyHls();
      cleanupTimers();
    };
  }, [destroyHls, cleanupTimers]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => {
      console.error("Video element error:", video.error);
      setError(true);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => {
        console.error("Play failed:", err);
        setPlaying(false);
      });
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = false;
      // video.volume = volume;
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  const safeReload = () => {
    console.log("Manually reloading stream...");
    setError(false);
    // setReconnecting(false);
    cleanupTimers();
    destroyHls();

    setTimeout(() => {
      loadStream();
    }, 100);
  };

  const fullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const toggleTheatre = () => {
    setTheatre(!theatre);
  };

  return (
    <div className={theatre ? "lg:col-span-3" : "lg:col-span-2"}>
      <div className="relative bg-black rounded-lg overflow-hidden">
        {selectedLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <div className="animate-pulse text-white">Loading...</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-black/80 z-30 flex items-center justify-center">
            <div className="text-red-500 text-center">
              <p className="font-semibold">Stream Error</p>
              <p className="text-sm opacity-80 mt-1">
                Reconnecting in 4 seconds...
              </p>
              {/* <Button
                onClick={() => {
                  destroyHls();
                  loadStream();
                }}
                className="mt-2"
              >
                Retry Now
              </Button> */}
            </div>
          </div>
        )}

        {/* <div className="aspect-video bg-black flex items-center justify-center">
          {!selected ? (
            <p className="text-white opacity-60">
              Pilih CCTV untuk menampilkan video
            </p>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted={muted}
              className="w-full h-full object-contain"
              playsInline
              preload="auto"
            />
          )}
        </div> */}

        <div className="aspect-video bg-black flex items-center justify-center">
  {isYouTubeUrl(streamUrl) ? (
    <iframe
      className="w-full h-full"
      src={streamUrl}
      title={selected?.name || "CCTV Stream"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <video
      ref={videoRef}
      autoPlay
      muted={muted}
      className="w-full h-full object-contain"
      playsInline
      preload="auto"
    />
  )}
</div>



        {selected && !isYouTubeUrl(streamUrl) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Play / pause */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>

                {/* Mute */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={toggleMute}
                  aria-label={playing ? "Unmute" : "Mute"}
                >
                  {muted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>

                {/* Reload */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={safeReload}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>

                {/* Theatre */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={toggleTheatre}
                  aria-label={theatre ? "Exit theatre mode" : "Enter theatre mode"}
                >
                  {theatre ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white text-sm font-medium">
                  {selected.name}
                </span>
                {/* CLOCK */}
                <span className="text-white text-sm">
                  {/* {new Date().toLocaleTimeString()} */}
                  {currentTime}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button className="w-full mt-5" onClick={onRemoveMainPlayer}>Remove Main Player</Button>
    </div>
  );
}
