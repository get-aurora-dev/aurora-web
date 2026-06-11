"use client";

import {
  ArrowUpRight,
  CloudDownload,
  ShieldCheck,
  Cpu,
  Info,
  CheckCircle2,
  ChevronRight,
  HardDriveDownload,
} from "lucide-react";
import { RefObject, useState } from "react";
import { useTranslations } from "next-intl";
import { getImageName } from "@/lib/utils/download";

type GPU = "mesa" | "nvidia" | "";

export default function DownloadAurora({
  downloadRef,
}: {
  downloadRef: RefObject<any>;
}) {
  const [primaryGPU, setPrimaryGPU] = useState<GPU>("");
  const imageName = getImageName(false, primaryGPU, "");
  const t = useTranslations("Download-Component");

  return (
    <div
      ref={downloadRef}
      className="flex min-h-dvh/50 items-center justify-center p-6"
      id="download"
    >
      <div className="w-full max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-linear-to-r from-aurora-blue to-aurora-lightorange bg-clip-text py-2 text-4xl font-bold text-transparent lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-lg text-zinc-400">{t("gpu-description")}</p>
        </div>

        <div className="rounded-xl border border-zinc-700/50 bg-zinc-950/60 p-8 text-white backdrop-blur-md">
          <div className="space-y-8">
            {/* Step 1 — GPU Selection */}
            <div className="space-y-4">
              <StepLabel number={1} done={!!primaryGPU} label={t("primary-gpu")} />

              <div className="grid gap-3 sm:grid-cols-2">
                <GPUCard
                  selected={primaryGPU === "mesa"}
                  onClick={() => setPrimaryGPU("mesa")}
                  title={t("intel-amd")}
                />
                <GPUCard
                  selected={primaryGPU === "nvidia"}
                  onClick={() => setPrimaryGPU("nvidia")}
                  title={t("nvidia")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <StepLabel
                number={2}
                done={false}
                label={primaryGPU ? t("ready-to-download") : t("select-hardware-config")}
                muted={!primaryGPU}
              />

              {primaryGPU ? (
                <div className="space-y-4">
                  
{/* Installation note */}
                  <div className="flex items-start gap-3 rounded-xl border border-aurora-blue/20 bg-aurora-blue/5 px-4 py-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-aurora-blue" />
                    <p className="text-sm text-zinc-300">
                      {t("recommend-using")}{" "}
                      <a
                        className="inline-flex items-center gap-0.5 font-semibold text-aurora-blue underline underline-offset-2 transition-colors hover:text-white"
                        href="https://fedoraproject.org/workstation/download"
                      >
                        {t("fedora-image-writer")}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>{" "}
                      {t("create-usb")}{" "}
                      <span className="text-zinc-500">
                        {t("note")} {t("ventoy-not-supported")}
                      </span>
                    </p>
                  </div>
                  {/* Download Buttons */}
                  <DownloadButtons imageName={imageName} />

                  

                  {/* Extra Info */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoPanel title={t("developer-mode")}>
                      {t("run")}{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-aurora-blue">
                        ujust devmode
                      </code>{" "}
                      {t("run-after-install")}{" "}
                      <a
                        href="https://docs.getaurora.dev/dx/aurora-dx-intro"
                        className="text-aurora-blue underline underline-offset-2 hover:text-white"
                      >
                        {t("learn-more")}
                      </a>
                    </InfoPanel>

                    <InfoPanel title={t("rebasing")}>
                      {t.rich("image-name-will-be", {
                        name: imageName.replace("-stable", ":stable"),
                        bold: (chunks) => (
                          <strong className="font-semibold text-white">{chunks}</strong>
                        ),
                      })}
                    </InfoPanel>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700/50 py-8 text-zinc-500">
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-sm">{t("choose-gpu")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepLabel({
  number,
  done,
  label,
  muted = false,
}: {
  number: number;
  done: boolean;
  label: string;
  muted?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${muted ? "opacity-40" : ""}`}>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
          done
            ? "bg-aurora-blue text-zinc-950"
            : "border border-zinc-600 text-zinc-400"
        }`}
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : number}
      </span>
      <h2 className="text-base font-semibold text-zinc-100">{label}</h2>
    </div>
  );
}

function GPUCard({
  selected,
  onClick,
  title,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-aurora-blue/60 bg-aurora-blue/10 shadow-lg shadow-aurora-blue/10"
          : "border-zinc-700/50 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50"
      }`}
    >
      <span
        className={`h-3 w-3 shrink-0 rounded-full transition-colors ${
          selected ? "bg-aurora-blue" : "bg-zinc-600 group-hover:bg-zinc-400"
        }`}
      />
      <div>
        <p className="font-semibold text-white">{title}</p>
      </div>
      {selected && (
        <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-aurora-blue" />
      )}
    </button>
  );
}

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-700/40 bg-zinc-900/30 p-4">
      <p className="mb-1.5 text-sm font-semibold text-zinc-300">{title}</p>
      <p className="text-xs leading-relaxed text-zinc-400">{children}</p>
    </div>
  );
}

function DownloadButtons({ imageName }: { imageName: string }) {
  const downloadLink = `https://dl.getaurora.dev/${imageName}-webui-x86_64.iso`;
  const checksumLink = `https://dl.getaurora.dev/${imageName}-webui-x86_64.iso-CHECKSUM`;
  const t = useTranslations("Download-Component");

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <a
        href={downloadLink}
        className="group flex items-center justify-center gap-3 rounded-xl border border-none bg-linear-to-r from-aurora-blue via-aurora-darkblue to-aurora-orangina px-6 py-5 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-aurora-darkblue/30 hover:shadow-xl"
      >
        <HardDriveDownload className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
        <span>{t("download-iso")}</span>
      </a>

      <a
        href={checksumLink}
        className="group flex items-center justify-center gap-3 rounded-xl border border-zinc-700/50 bg-zinc-900/40 px-6 py-5 font-semibold text-zinc-300 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-zinc-500 hover:text-white hover:shadow-xl"
      >
        <ShieldCheck className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-hover:scale-110 group-hover:text-white" />
        <span>{t("checksum")}</span>
      </a>
    </div>
  );
}
