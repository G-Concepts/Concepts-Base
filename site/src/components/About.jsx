import React, { memo, useEffect, useRef } from "react";

// Static content lives outside the component: created once at module load,
// not re-allocated on every render.
const INTRO =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati adipisci dicta perspiciatis reiciendis, quasi error dolorem! Velit voluptatem obcaecati laborum aspernatur delectus enim labore.";

// Files in /public are served from the site root, so don't prefix "public/".
// Tip: rename the file to "global-concepts-logo.mp4" to avoid spaces in the URL.
// Or import it instead: import logoVideo from "../assets/global-concepts-logo.mp4";
const VIDEO_SRC = encodeURI("/Global Concepts Logo.mp4");

function AutoplayVideo({ src, className }) {
  const ref = useRef(null);

  // React doesn't always apply the `muted` attribute before the browser decides
  // on autoplay (notably Safari/iOS), so set it explicitly and start playback.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      /* Autoplay blocked (e.g. data saver / low power mode): fail silently. */
    });
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      controlsList="nodownload nofullscreen noremoteplayback"
      aria-hidden="true"
      tabIndex={-1}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

function About() {
  return (
    <section className="p-8 text-center bg-gray-100 ">
      <h1 className="mb-4 text-[#C9A227] text-3xl font-bold">Get to know us</h1>
      <p className="mx-auto mb-8 w-full max-w-prose md:w-1/2 text-[#1F3A12]">{INTRO}</p>

      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="mb-4 flex w-full justify-center md:mb-0 md:w-1/2">
          <AutoplayVideo
            src={VIDEO_SRC}
            className="h-auto w-3/4 rounded-lg"
          />
        </div>

        <div className="w-full md:ml-8 md:w-1/4">
          {/* h2: the page already has one h1 */}
          <h2 className="mb-4 text-3xl font-bold text-[#C9A227]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </h2>
          <p className="text-[#1F3A12]">{INTRO}</p>
        </div>
      </div>
    </section>
  );
}

// No props or state, so memo lets React skip re-rendering when a parent updates.
export default memo(About);