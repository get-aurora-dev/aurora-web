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
          <h1 className="bg-gradient-to-r from-aurora-blue to-aurora-lightorange bg-clip-text text-4xl font-bold text-transparent lg:text-7xl py-2">
            Download Aurora
          </h1>
        </div>

        {/* Unified Download Card */}
        <SpotlightCard
          className="text-white bg-black/20 border-zinc-500/40 backdrop-blur-md"
          spotlightColor={`rgba(102, 185, 242, 0.2)`} // aurora-blue
        >
          <div className="space-y-8">
            {/* Hardware Configuration Section - Full Width */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Cpu size={48} className="text-aurora-blue flex-shrink-0" />
                <h2 className="bg-gradient-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-3xl font-semibold text-transparent">
                  Hardware Configuration & Download
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-xl leading-relaxed">
                  Select your primary GPU to get the edition with preinstalled drivers
                  optimized for your hardware.
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
                            <span className="text-zinc-400">{t("pick-gpu")}</span>
                          </div>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mesa">Intel / AMD</SelectItem>
                      <SelectItem value="nvidia">
                        Nvidia (RTX-Series/GTX 16xx)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Installation Guide - More Friendly */}
            <div className="rounded-2xl bg-aurora-blue/5 border border-aurora-blue/20 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-aurora-blue flex-shrink-0" />
                <h4 className="text-lg font-semibold text-aurora-blue">Installation Guide</h4>
              </div>

              <div className="space-y-3 text-lg">
                <p className="text-zinc-200">
                  We recommend using{" "}
                  <a
                    className="inline-flex items-center gap-1 font-semibold text-aurora-lightorange underline underline-offset-2 transition-colors hover:text-aurora-orangina"
                    href="https://fedoraproject.org/workstation/download"
                  >
                    Fedora Image Writer <ArrowUpRight className="h-4 w-4" />
                  </a>{" "}
                  to create your installation USB drive.
                </p>

                <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-blue-200 text-sm">
                    <span className="font-medium">Note:</span> Ventoy is not supported with our ISO files.
                  </p>
                </div>
              </div>
            </div>

            {/* Download Section */}
            {primaryGPU ? (
              <div className="space-y-6 border-t border-zinc-700/50 pt-8">
                <div className="text-center">
                  <h3 className="bg-gradient-to-r from-aurora-darkblue to-aurora-purple bg-clip-text text-2xl font-bold text-transparent lg:text-3xl">
                    Ready to Download
                  </h3>
                  <p className="mt-2 text-lg text-zinc-300">
                    Your personalized Aurora image: <code className="text-aurora-blue font-mono">{imageName}</code>
                  </p>
                </div>

                <DownloadButtons imageName={imageName} isHelium={true} />

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl bg-zinc-900/30 border border-zinc-700/50 p-6 space-y-3">
                    <h4 className="font-semibold text-aurora-blue text-lg">Developer Mode</h4>
                    <p className="text-sm text-zinc-300">
                      Run{" "}
                      <code className="rounded bg-zinc-800 px-2 py-1 text-aurora-blue font-mono">
                        ujust devmode
                      </code>{" "}
                      after installation.{" "}
                      <a
                        href="https://docs.getaurora.dev/dx/aurora-dx-intro"
                        className="text-aurora-blue underline underline-offset-2 hover:text-aurora-lightorange"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>

                  <div className="rounded-2xl bg-zinc-900/30 border border-zinc-700/50 p-6 space-y-3">
                    <h4 className="font-semibold text-aurora-orangina text-lg">Rebasing</h4>
                    <p className="text-sm text-zinc-300">
                      Your image name will be{" "}
                      <code className="rounded bg-zinc-800 px-2 py-1 text-aurora-orangina font-mono">
                        {imageName.replace("-stable", ":stable")}
                      </code>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-aurora-darkblue/10 via-aurora-orangina/10 to-aurora-purple/10 border border-zinc-600/50 p-6">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-aurora-lightorange flex-shrink-0" />
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Slow download?</span> Check out our friends at{" "}
                      <a
                        className="inline-flex items-center gap-1 font-semibold text-aurora-lightorange underline underline-offset-2 transition-colors hover:text-aurora-orangina"
                        href="https://fosstorrents.com/distributions/aurora/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Fosstorrents
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-zinc-700/50 pt-8">
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <Monitor className="h-12 w-12 text-zinc-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-300 mb-2">
                      Select Hardware Configuration
                    </h3>
                    <p className="text-lg text-zinc-400">
                      Choose your GPU above to continue with the download
                    </p>
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
        className="group flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-aurora-darkblue to-aurora-purple border border-aurora-darkblue/50 p-8 text-white shadow-lg transition-all duration-200 hover:shadow-2xl hover:shadow-aurora-darkblue/30 hover:scale-[1.02]"
      >
        <CloudDownload className="h-8 w-8 transition-transform group-hover:scale-110 flex-shrink-0" />
        <div className="text-center">
          <div className="text-xl font-bold">{t("download-iso")}</div>
          <div className="text-sm text-white/80 mt-1">({imageName})</div>
        </div>
      </a>

      <a
        href={checksumLink}
        className="group flex items-center justify-center gap-4 rounded-2xl border border-zinc-500 bg-zinc-900/40 p-8 text-white shadow-lg transition-all duration-200 hover:border-aurora-orangina/50 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-aurora-orangina/20 hover:scale-[1.02]"
      >
        <Package className="h-8 w-8 transition-transform group-hover:scale-110 flex-shrink-0 text-aurora-orangina" />
        <div className="text-center">
          <div className="text-xl font-bold">{t("checksum")}</div>
          <div className="text-sm text-zinc-400 mt-1">(SHA256)</div>
        </div>
      </a>
    </div>
  );
}
