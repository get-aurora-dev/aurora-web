import { type RefObject } from "react";
import {
  ArrowUpRightIcon,
  BookOpen,
  CircleArrowUp,
  GitMerge,
  GlobeIcon,
  Heart,
  MessageCircleMore,
} from "lucide-react";
import Image from "next/image";
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
  const tDocs = useTranslations("Docs-Community");

  const handleScrollUp = () => {
    if (introRef?.current) {
      introRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800 bg-black/60 px-6 py-12 text-center text-white backdrop-blur-xs lg:px-8">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col items-center gap-8">
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-3 font-medium transition-colors hover:border-aurora-blue hover:bg-zinc-800"
          onClick={handleScrollUp}
        >
          <CircleArrowUp className="h-6 w-6" />
          {t("go-up")}
        </button>

        <div className="flex max-w-3xl flex-col items-center gap-3">
          <div className="text-xl">
            {t("proudly-built")}{" "}
            <a
              className="inline-flex items-center gap-2 font-bold underline underline-offset-4"
              href="https://universal-blue.org"
              {...externalLinkProps}
            >
              <Image
                src="/ublue-color.svg"
                width={28}
                height={28}
                alt="Universal Blue"
              />
              Universal Blue
            </a>
          </div>
          <p className="text-zinc-300">{t("proudly-built-phrase")}</p>
        </div>

        <div className="grid w-full max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          <a
            href="https://docs.getaurora.dev"
            {...externalLinkProps}
            className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 font-medium text-zinc-100 transition-all hover:border-aurora-blue hover:bg-zinc-800/80 hover:text-aurora-blue"
          >
            <BookOpen className="h-5 w-5" />
            {tDocs("read-docs")}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>

          <a
            href="https://github.com/ublue-os/aurora/discussions"
            {...externalLinkProps}
            className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 font-medium text-zinc-100 transition-all hover:border-aurora-orangina hover:bg-zinc-800/80 hover:text-aurora-orangina"
          >
            <MessageCircleMore className="h-5 w-5" />
            {tDocs("visit-forums")}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>

          <a
            href="https://discord.getaurora.dev"
            {...externalLinkProps}
            className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 font-medium text-zinc-100 transition-all hover:border-aurora-lightorange hover:bg-zinc-800/80 hover:text-aurora-lightorange md:col-span-2 xl:col-span-1"
          >
            <ArrowUpRightIcon className="h-5 w-5" />
            {tDocs("join-discord")}
          </a>

          <a
            href="https://github.com/ublue-os/aurora"
            {...externalLinkProps}
            className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 font-medium text-zinc-100 transition-all hover:border-white hover:bg-zinc-800/80"
          >
            <GithubIcon color="#ffffff" />
            Aurora GitHub Repository
          </a>

          <a
            href="https://github.com/get-aurora-dev/aurora-web"
            {...externalLinkProps}
            className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 font-medium text-zinc-100 transition-all hover:border-white hover:bg-zinc-800/80"
          >
            <GitMerge className="h-5 w-5" />
            Website Source Code
          </a>

          <a
            href="https://ko-fi.com/chandeleer"
            {...externalLinkProps}
            className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 font-medium text-zinc-100 transition-all hover:border-pink-400 hover:bg-zinc-800/80 hover:text-pink-300"
          >
            <Heart className="h-5 w-5" />
            Support the Artist
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-300">
          <span>{t("built-with-love")}</span>
          <a
            href="https://universal-blue.org"
            {...externalLinkProps}
            className="inline-flex items-center gap-2 underline underline-offset-4"
          >
            <GlobeIcon className="h-4 w-4" />
            Universal Blue Website
          </a>
          <span>{t("copyright")}</span>
        </div>

        <div className="max-w-4xl text-sm italic text-zinc-400">
          {t("not-affiliated")}
        </div>

        <div>
          <div className="text-xl font-bold italic">
            Deploying Linux to your machine, please wait...
          </div>
          <Image
            className="mx-auto scale-50"
            src="/glorp.png"
            width={534}
            height={534}
            alt="Glorp mascot"
          />
        </div>
      </div>
    </footer>
  );
}
