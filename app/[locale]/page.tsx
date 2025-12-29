"use client";

import SharedNavbar from "@/components/nav/SharedNavbar";
import Hero from "@/components/sections/hero";
import Footer from "@/components/footer/Footer";
import React, { useRef, useCallback } from "react";
import AboutAuroraNew from "@/components/sections/about/about-aurora-new";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = useCallback((section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      intro: introRef,
      download: downloadRef,
      news: newsRef,
    };
    refs[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [introRef, downloadRef, newsRef]);

  return (
    <div>
      <SharedNavbar variant="home" onScrollTo={handleScrollTo} />
      <main className="min-h-[100dvh]">
        <Hero introRef={introRef} aboutRef={aboutRef} />
        <AboutAuroraNew aboutRef={aboutRef} downloadRef={downloadRef} newsRef={newsRef} />
        <Footer introRef={introRef} />
      </main>
    </div>
  );
}


/*
  <AboutAurora aboutRef={aboutRef} aboutDxRef={aboutDXRef} />
        <AboutAuroraDx aboutDxRef={aboutDXRef} />
        <DownloadAurora downloadRef={downloadRef} />
        <FAQ faqRef={faqRef} />
        <News newsRef={newsRef} />
        <BuildYourOwn />
 */
