import { type RefObject } from "react";
import { CircleArrowUp, GitMerge, GlobeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import GithubIcon from "../GithubIcon";

type FooterProps = {
  introRef?: RefObject<HTMLDivElement | null>;
};

const externalLinkProps = {
  target: "_blank",
  rel: "noreferrer",
} as const;

export default function Footer({ introRef }: FooterProps) {
  const t = useTranslations("Footer");

  const handleScrollUp = () => {
    if (introRef?.current) {
      introRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 flex min-h-[30vh] w-full flex-col items-center justify-center gap-4 bg-gray-800 p-12 text-center text-white lg:p-0">
      <button
        type="button"
        className="mt-5 flex flex-row items-center justify-center gap-5"
        onClick={handleScrollUp}
      >
        <CircleArrowUp className="h-10 w-10" />
        {t("go-up")}
      </button>

      <div className="flex flex-col items-center justify-center gap-2 p-4 text-xl">
        {t("proudly-built")}{" "}
        <a
          className="flex flex-row items-center gap-2 font-bold underline"
          href="https://universal-blue.org"
          {...externalLinkProps}
        >
          <img
            src="/ublue-color.svg"
            width={35}
            height={35}
            alt="Universal Blue"
          />
          Universal Blue
        </a>
        {t("proudly-built-phrase")}
      </div>

      <div>{t("built-with-love")}</div>

      <div>
        Logos have been crafted by{" "}
        <a
          className="underline"
          href="https://ko-fi.com/melodyofdelphi"
          {...externalLinkProps}
        >
          Delphic Melody
        </a>{" "}
        and{" "}
        <a className="underline" href="https://github.com/zandrro" {...externalLinkProps}>
          @zandrro
        </a>
        . ❤️
      </div>

      <div>
        Wallpapers & other art are made by{" "}
        <a
          className="underline"
          href="https://ko-fi.com/chandeleer"
          {...externalLinkProps}
        >
          Chandeleer
        </a>{" "}
        ❤️
      </div>

      <div className="mb-5 flex w-full flex-col items-center justify-center gap-5 underline underline-offset-4 lg:w-fit lg:flex-row">
        <a
          className="flex flex-row items-center justify-center gap-1"
          href="https://github.com/ublue-os/aurora"
          {...externalLinkProps}
        >
          <GithubIcon color="#ffffff" /> Aurora GitHub Repository
        </a>

        <a
          className="flex flex-row items-center justify-center gap-1"
          href="https://universal-blue.org"
          {...externalLinkProps}
        >
          <GlobeIcon />
          Universal Blue Website
        </a>

        <a
          className="flex flex-row items-center justify-center gap-1"
          href="https://github.com/get-aurora-dev/aurora-web"
          {...externalLinkProps}
        >
          <GitMerge />
          Website Source Code
        </a>
      </div>

      <div className="mb-3 text-sm italic">{t("not-affiliated")}</div>

      <div>
        <div className="text-xl font-bold italic">
          Deploying Linux to your machine, please wait...
        </div>
        <img
          className="scale-50"
          src="/glorp.png"
          width={534}
          height={534}
          alt="Glorp mascot"
        />
      </div>
    </footer>
  );
}
