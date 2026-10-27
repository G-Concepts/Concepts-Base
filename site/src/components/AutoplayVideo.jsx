import { useEffect, useRef, useState } from "react";

export default function AutoplayVideo({ src, className }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  if (failed) {
    return (
      <div className={`${className} grid aspect-video place-items-center bg-[#1F3A12] font-bold text-[#C9A227]`}>
        Global Concepts
      </div>
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      aria-hidden="true"
      tabIndex={-1}
      onError={(e) => {
        // code 4 = file not found or unsupported format, 3 = decode error
        console.error("Video failed:", e.currentTarget.error);
        setFailed(true);
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}