"use client";

import {
  ArrowUpRight,
  CloudDownload,
  Monitor,
  Package,
  Cpu,
  Info,
} from "lucide-react";
import { RefObject, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { getImageName } from "@/lib/utils/download";
import SpotlightCard from "@/components/SpotlightCard";

export default function DownloadAurora({
  downloadRef,
}: {
  downloadRef: RefObject<any>;
}) {
  const [primaryGPU, setPrimaryGPU] = useState("");
  const [developerVersion, setDeveloperVersion] = useState("");
  const [isHWE, setIsHWE] = useState("no");
  const imageName = getImageName(isHWE === "yes", primaryGPU, developerVersion);
  console.log(imageName);
  const t = useTranslations("Download-Component");

  return (
    <div
      ref={downloadRef}
      className="flex min-h-dvh items-center justify-center p-6"
      id={"download"}
    >
      <div className="w-full max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-aurora-blue to-aurora-lightorange bg-clip-text py-2 text-4xl font-bold text-transparent lg:text-7xl">
            {t("title")}
          </h1>
        </div>

        {/* Unified Download Card */}
        <SpotlightCard
          className="border-zinc-500/40 bg-black/20 text-white backdrop-blur-md"
          spotlightColor={`rgba(102, 185, 242, 0.2)`} // aurora-blue
        >
          <div className="space-y-8">
            {/* Hardware Configuration Section - Full Width */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Cpu size={48} className="flex-shrink-0 text-aurora-blue" />
                <h2 className="bg-gradient-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-3xl font-semibold text-transparent">
                  {t("hardware-config")}
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-xl leading-relaxed">
                  {t("gpu-description")}
                </p>

                <div className="space-y-4">
                  <p className="text-lg font-medium text-white">
                    {t("primary-gpu")}
                  </p>
                  <Select onValueChange={setPrimaryGPU}>
                    <SelectTrigger className="h-14 w-full border-zinc-600 bg-zinc-900/50 text-white backdrop-blur-sm transition-colors hover:bg-zinc-900/70">
                      <SelectValue
                        placeholder={
                          <div className="flex items-center gap-2">
                            <Monitor className="h-5 w-5 stroke-zinc-400" />
                            <span className="text-zinc-400">
                              {t("pick-gpu")}
                            </span>
                          </div>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mesa">{t("intel-amd")}</SelectItem>
                      <SelectItem value="nvidia">{t("nvidia")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Installation Guide - More Friendly */}
            <div className="space-y-4 rounded-2xl border border-aurora-blue/20 bg-aurora-blue/5 p-6">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 flex-shrink-0 text-aurora-blue" />
                <h4 className="text-lg font-semibold text-aurora-blue">
                  {t("installation-guide")}
                </h4>
              </div>

              <div className="space-y-3 text-lg">
                <p className="text-zinc-200">
                  {t("recommend-using")}{" "}
                  <a
                    className="inline-flex items-center gap-1 font-semibold text-aurora-lightorange underline underline-offset-2 transition-colors hover:text-aurora-orangina"
                    href="https://fedoraproject.org/workstation/download"
                  >
                    {t("fedora-image-writer")}{" "}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>{" "}
                  {t("create-usb")}
                </p>

                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                  <p className="text-sm text-blue-200">
                    <span className="font-medium">{t("note")}</span>{" "}
                    {t("ventoy-not-supported")}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Section */}
            {primaryGPU ? (
              <div className="space-y-6 border-t border-zinc-700/50 pt-8">
                <div className="text-center">
                  <h3 className="bg-gradient-to-r from-aurora-darkblue to-aurora-purple bg-clip-text text-2xl font-bold text-transparent lg:text-3xl">
                    {t("ready-to-download")}
                  </h3>
                  <p className="mt-2 text-lg text-zinc-300">
                    {t("personalized-image")}{" "}
                    <code className="font-mono text-aurora-blue">
                      {imageName}
                    </code>
                  </p>
                </div>

                <DownloadButtons imageName={imageName} isHelium={true} />

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-6">
                    <h4 className="text-lg font-semibold text-aurora-blue">
                      {t("developer-mode")}
                    </h4>
                    <p className="text-sm text-zinc-300">
                      {t("run")}{" "}
                      <code className="rounded bg-zinc-800 px-2 py-1 font-mono text-aurora-blue">
                        ujust devmode
                      </code>{" "}
                      {t("run-after-install")}{" "}
                      <a
                        href="https://docs.getaurora.dev/dx/aurora-dx-intro"
                        className="text-aurora-blue underline underline-offset-2 hover:text-aurora-lightorange"
                      >
                        {t("learn-more")}
                      </a>
                    </p>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-6">
                    <h4 className="text-lg font-semibold text-aurora-orangina">
                      {t("rebasing")}
                    </h4>
                    <p className="text-sm text-zinc-300">
                      {t("image-name-will-be", {
                        name: imageName.replace("-stable", ":stable"),
                      })}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-zinc-700/50 pt-8">
                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                  <Monitor className="h-12 w-12 text-zinc-400" />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-zinc-300">
                      {t("select-hardware-config")}
                    </h3>
                    <p className="text-lg text-zinc-400">{t("choose-gpu")}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

function DownloadButtons({
  imageName,
  isHelium,
  isx86 = true,
}: {
  imageName: string;
  isHelium: boolean;
  isx86?: boolean;
}) {
  const downloadLink: string = `https://dl.getaurora.dev/${imageName}-webui-x86_64.iso`;
  const checksumLink: string = `https://dl.getaurora.dev/${imageName}-webui-x86_64.iso-CHECKSUM`;
  const t = useTranslations("Download-Component");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <a
        href={downloadLink}
        className="group flex items-center justify-center gap-4 rounded-2xl border border-aurora-darkblue/50 bg-gradient-to-r from-aurora-darkblue to-aurora-purple p-8 text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-aurora-darkblue/30"
      >
        <CloudDownload className="h-8 w-8 flex-shrink-0 transition-transform group-hover:scale-110" />
        <div className="text-center">
          <div className="text-xl font-bold">{t("download-iso")}</div>
          <div className="mt-1 text-sm text-white/80">({imageName})</div>
        </div>
      </a>

      <a
        href={checksumLink}
        className="group flex items-center justify-center gap-4 rounded-2xl border border-zinc-500 bg-zinc-900/40 p-8 text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-aurora-orangina/50 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-aurora-orangina/20"
      >
        <Package className="h-8 w-8 flex-shrink-0 text-aurora-orangina transition-transform group-hover:scale-110" />
        <div className="text-center">
          <div className="text-xl font-bold">{t("checksum")}</div>
          <div className="mt-1 text-sm text-zinc-400">(SHA256)</div>
        </div>
      </a>
    </div>
  );
}
