"use client";

import { GlowEffect } from "@/components/ui/glow";
import SpotlightCard from "@/components/SpotlightCard";
import KDELogo from "@/components/icons/kde";
import { Trees } from "lucide-react";
import { useTranslations } from "next-intl";

export default function YourNewDesktop() {
  const t = useTranslations("Your-New-Desktop");

  return (
    <div className="relative flex flex-col items-center justify-center gap-10">
      <div
        className={
          "relative aspect-auto h-full w-full max-w-(--breakpoint-2xl) lg:min-w-[750px]"
        }
      >
        <div className="relative h-full w-full">
          <GlowEffect
            colors={[
              "#3B1C6F",
              "#D95C7F",
              "#66B9F2",
              "#4E67B2",
              "#EC92A1",
              "#AA507A",
            ]}
            mode="colorShift"
            blur="soft"
            duration={5}
            scale={1.008}
          />
          <div className="relative h-full w-full bg-black text-white dark:bg-white dark:text-black">
            <img
              className={"h-full w-full"}
              src={"/newdesktop.webp"}
              alt={"Desktop"}
            />
          </div>
        </div>
      </div>

      <div className={"flex w-full max-w-(--breakpoint-2xl) flex-col gap-8"}>
        <div className="text-center">
          <h1
            className={
              "bg-linear-to-br from-aurora-blue to-aurora-orangina bg-clip-text text-4xl font-bold text-transparent lg:text-7xl py-2"
            }
          >
            {t("title")}
          </h1>
          <p className="w-full text-xl lg:text-2xl mt-6 max-w-4xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className={"grid grid-cols-1 gap-8 lg:grid-cols-2"}>
          <SpotlightCard
            className="text-white bg-black/20 border-zinc-500/40 backdrop-blur-md"
            spotlightColor={`rgba(78, 103, 178, 0.2)`} // aurora-darkblue
          >
            <div className={"flex flex-col gap-6 h-full"}>
              <div className={"flex items-center gap-4"}>
                <div className={"shrink-0"}>
                  <KDELogo size={48} />
                </div>
                <h2
                  className={
                    "bg-linear-to-r from-aurora-darkblue to-ublue-lightblue bg-clip-text text-3xl font-semibold text-transparent"
                  }
                >
                  {t("kde-title")}
                </h2>
              </div>

              <div className={"text-xl leading-relaxed flex-1"}>
                <p className={"mb-4"}>
                  {t("kde-text")}
                </p>
                <p
                  className={
                    "bg-linear-to-r from-aurora-darkblue to-ublue-lightblue bg-clip-text text-2xl font-semibold text-transparent"
                  }
                >
                  {t("kde-highlight")}
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="text-white bg-black/20 border-zinc-500/40 backdrop-blur-md"
            spotlightColor={`rgba(236, 146, 161, 0.2)`} // aurora-lightorange
          >
            <div className={"flex flex-col gap-6 h-full"}>
              <div className={"flex items-center gap-4"}>
                <div className={"shrink-0"}>
                  <Trees size={48} className={"text-aurora-lightorange"} />
                </div>
                <h2
                  className={
                    "bg-linear-to-r from-aurora-lightorange to-aurora-orangina bg-clip-text text-3xl font-semibold text-transparent"
                  }
                >
                  {t("defaults-title")}
                </h2>
              </div>

              <div className={"text-xl leading-relaxed flex-1"}>
                <p className={"mb-4"}>
                  {t("defaults-text")}
                </p>
                <p
                  className={
                    "bg-linear-to-r from-aurora-lightorange to-aurora-orangina bg-clip-text text-2xl font-semibold text-transparent"
                  }
                >
                  {t("defaults-highlight")}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
