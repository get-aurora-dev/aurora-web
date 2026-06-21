"use client";

import { CircleArrowUp, GitMerge, GlobeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import GithubIcon from "../GithubIcon";

export default function Footer() {
  const t = useTranslations("Footer");

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        className={
          "flex min-h-[30vh] w-full flex-col items-center justify-center gap-4 bg-gray-800 p-12 text-center text-white lg:p-0"
        }
      >
        <button
          className={"mt-5 flex flex-row items-center justify-center gap-5"}
          onClick={handleScrollUp}
        >
          <CircleArrowUp className={"h-10 w-10"} />
          {t("go-up")}
        </button>
        <div
          className={
            "flex flex-col items-center justify-center gap-2 p-4 text-xl"
          }
        >
          {t("proudly-built")}{" "}
          <a
            className={"flex flex-row items-center gap-2 font-bold underline"}
            href={"https://universal-blue.org"}
          >
            <img alt={"Universal Blue Logo with a white U and blue gradient background"} src={"/ublue-color.svg"} width={35} height={35} />
            Universal Blue
          </a>
          {t("proudly-built-phrase")}
        </div>
        <a className={"underline underline-offset-4"} href={"https://www.youtube.com/watch?v=K0HSD_i2DvA"}>{t("built-with-love")}</a>
        <div>Logos have been crafted by Delphic Melody (@delphicmelody on Discord) and @zandrro. ❤️</div>
        <div
          className={
            "mb-5 flex w-full flex-col items-center justify-center gap-5 underline underline-offset-4 lg:w-fit lg:flex-row"
          }
        >
          <a
            className={"flex flex-row justify-center items-center gap-1"}
            href={"https://github.com/ublue-os/aurora"}
          >
            <GithubIcon color="#ffffff" /> Aurora GitHub Repository
          </a>

          <a
            className={"flex flex-row justify-center items-center gap-1"}
            href={"https://universal-blue.org"}
          >
            <GlobeIcon />
            Universal Blue Website
          </a>

          <a
            className={"flex flex-row justify-center items-center gap-1"}
            href={"https://github.com/get-aurora-dev/aurora-web"}
          >
            <GitMerge />
            Website Source Code
          </a>
        </div>
        <div className={"mb-3 text-sm italic"}>{t("not-affiliated")}</div>
        <div>
          <div className={"text-xl font-bold italic"}>
            Deploying Linux to your machine, please wait...
          </div>
          <img alt={"Linux being sucked up by an alien ship"} className={"scale-50"} src={"/glorp.png"} />
        </div>
      </footer>
    </>
  );
}
