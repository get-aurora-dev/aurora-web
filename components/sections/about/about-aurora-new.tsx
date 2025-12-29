import Contributors from "@/components/sections/contributors";
import ParadigmShift from "@/components/sections/about/paradigm-shift";
import AboutDocs from "@/components/sections/about/docs";
import YourNewDesktop from "@/components/sections/about/your-new-desktop";
import ForYou from "@/components/sections/about/for-you";
import ForDevelopers from "@/components/sections/about/for-developers";
import { RefObject } from "react";
import DownloadAurora from "@/components/sections/download/download";
import NewsFromBlog from "@/components/news-new";
import { StarsBackground } from "@/components/ui/stars-background";

export default function AboutAuroraNew({
  aboutRef,
  downloadRef,
  newsRef,
}: {
  aboutRef: RefObject<HTMLDivElement>;
  downloadRef: RefObject<HTMLDivElement>;
  newsRef: RefObject<HTMLDivElement>;
}) {
  return (
    <main className={"relative min-h-dvh bg-gray-950 p-10 text-white"}>
      <StarsBackground starDensity={0.0005} static />
      <div ref={aboutRef} className={"relative z-10 flex flex-row gap-10"}>
        <div className="flex w-full flex-col items-center justify-center gap-44">
          <YourNewDesktop />
          <ParadigmShift />
          <ForYou />
          <ForDevelopers />
          <Contributors />
          <AboutDocs />
          <NewsFromBlog newsRef={newsRef} />
          <DownloadAurora downloadRef={downloadRef} />
        </div>
      </div>
    </main>
  );
}
