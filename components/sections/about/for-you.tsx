"use client";

import SpotlightCard from "@/components/SpotlightCard";
import { CpuIcon, RotateCw, ScrollText } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ForYou() {
  const t = useTranslations("For-You");

  return (
    <div
      className={
        "flex w-full max-w-(--breakpoint-2xl) flex-col items-center justify-start gap-10"
      }
    >
      <h1
        className={
          "bg-linear-to-r from-aurora-blue to-aurora-lightorange bg-clip-text text-4xl font-bold text-transparent lg:text-7xl py-2"
        }
      >
        {t("title")}
      </h1>
      <p className={"text-xl text-center max-w-3xl"}>
        {t("subtitle")}
      </p>
      <div className={"grid grid-cols-1 gap-8 lg:grid-cols-3 w-full"}>
        <SpotlightCard
          className="text-white bg-black/20 border-zinc-500/40 backdrop-blur-md"
          spotlightColor={`rgba(102, 185, 242, 0.2)`} // aurora-blue
        >
          <div className={"flex flex-col items-center gap-6 text-center h-full"}>
            <div className={"shrink-0"}>
              <RotateCw
                size={48}
                className="text-aurora-blue"
                style={{ animation: "spin 12s linear infinite" }}
              />
            </div>
            <div className={"flex flex-col gap-4 flex-1"}>
              <h2
                className={
                  "bg-linear-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-3xl font-semibold text-transparent"
                }
              >
                {t("automatic-updates")}
              </h2>
              <div className={"text-xl leading-relaxed"}>
                <p className={"mb-4"}>
                  {t("automatic-updates-text")}
                </p>
                <p
                  className={
                    "bg-linear-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-2xl font-semibold text-transparent"
                  }
                >
                  {t("automatic-updates-highlight")}
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="text-white bg-black/20 border-zinc-500/40 backdrop-blur-md"
          spotlightColor={`rgba(217, 92, 127, 0.2)`} // aurora-orangina
        >
          <div className={"flex flex-col items-center gap-6 text-center h-full"}>
            <div className={"shrink-0"}>
              <CpuIcon className={"text-aurora-orangina"} size={48} />
            </div>
            <div className={"flex flex-col gap-4 flex-1"}>
              <h2
                className={
                  "bg-linear-to-r from-aurora-orangina to-aurora-lightred bg-clip-text text-3xl font-semibold text-transparent"
                }
              >
                {t("hardware-support")}
              </h2>
              <div className={"text-xl leading-relaxed"}>
                <p className={"mb-4"}>
                  {t("hardware-support-text")}
                </p>
                <p
                  className={
                    "bg-linear-to-r from-aurora-orangina to-aurora-lightred bg-clip-text text-2xl font-semibold text-transparent"
                  }
                >
                  {t("hardware-support-highlight")}
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="text-white bg-black/20 border-zinc-500/40 backdrop-blur-md"
          spotlightColor={`rgba(78, 103, 178, 0.2)`} // aurora-darkblue
        >
          <div className={"flex flex-col items-center gap-6 text-center h-full"}>
            <div className={"shrink-0"}>
              <ScrollText  className={"text-aurora-darkblue"} size={48} />
            </div>
            <div className={"flex flex-col gap-4 flex-1"}>
              <h2
                className={
                  "bg-linear-to-r from-aurora-darkblue to-ublue-lightblue bg-clip-text text-3xl font-semibold text-transparent"
                }
              >
                {t("helping-you")}
              </h2>
              <div className={"text-xl leading-relaxed"}>
                <p className={"mb-4"}>
                  {t("helping-you-text")}
                </p>
                <p
                  className={
                    "bg-linear-to-r from-aurora-darkblue to-ublue-lightblue bg-clip-text text-2xl font-semibold text-transparent"
                  }
                >

                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
