"use client";

import { Heart, ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";

export type ContributorRole =
  | "maintainer"
  | "contributor"
  | "designer"
  | "translator"
  | "artist"
  | "emeritus"
  | "special-guest"
  | "advisor"
  | "ublue";

export interface ContributorData {
  github: string;
  role: ContributorRole;
  title?: string;
  sponsorLink?: string;
}

export interface GitHubUserData {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string | null;
  bio?: string | null;
}

interface ContributorCardProps {
  contributor: ContributorData;
  githubData?: GitHubUserData;
  roleLabels: Record<string, Record<string, string>>;
  variant?: "compact" | "detailed";
}

const roleColors: Record<ContributorRole, string> = {
  maintainer: "bg-aurora-purple",
  contributor: "bg-aurora-blue",
  designer: "bg-aurora-orangina",
  translator: "bg-aurora-lightorange",
  artist: "bg-pink-500",
  emeritus: "bg-amber-500",
  "special-guest": "bg-emerald-500",
  advisor: "bg-slate-500",
  ublue: "bg-blue-500",
};

const roleBorderColors: Record<ContributorRole, string> = {
  maintainer: "border-aurora-purple",
  contributor: "border-aurora-blue",
  designer: "border-aurora-orangina",
  translator: "border-aurora-lightorange",
  artist: "border-pink-500",
  emeritus: "border-amber-500",
  "special-guest": "border-emerald-500",
  advisor: "border-slate-500",
  ublue: "border-blue-500",
};

export function ContributorCard({
  contributor,
  githubData,
  roleLabels,
  variant = "detailed",
}: ContributorCardProps) {
  const locale = useLocale();
  const roleLabel = roleLabels[contributor.role]?.[locale] || contributor.role;

  if (!githubData) {
    return (
      <div className="animate-pulse rounded-2xl border border-zinc-700 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-zinc-700" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-zinc-700" />
            <div className="h-3 w-16 rounded bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={githubData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/80 p-2 pr-5 transition-all duration-300 hover:scale-105 hover:border-zinc-500 hover:bg-zinc-800"
      >
        <img
          src={githubData.avatar_url}
          alt={githubData.login}
          width={48}
          height={48}
          className="rounded-full ring-2 ring-zinc-700"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-white">{githubData.login}</span>
          <span className="text-xs text-zinc-400">{roleLabel}</span>
        </div>
        {contributor.sponsorLink && (
          <Heart className="ml-1 h-4 w-4 text-pink-400" fill="currentColor" />
        )}
      </a>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${roleBorderColors[contributor.role]} bg-zinc-900/50 backdrop-blur-xs transition-all duration-300 hover:border-aurora-lightorange hover:bg-zinc-900/70`}
    >
      <div className="p-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <a
            href={githubData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <img
              src={githubData.avatar_url}
              alt={githubData.login}
              width={80}
              height={80}
              className="rounded-full ring-2 ring-aurora-darkblue transition-all duration-300 group-hover:ring-4 group-hover:ring-aurora-blue"
            />
          </a>

          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <a
                href={githubData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-xl font-bold text-white transition-colors hover:text-aurora-blue"
              >
                {githubData.name || githubData.login}
              </a>
              <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500" />
            </div>

            <span className="text-sm text-zinc-400">@{githubData.login}</span>

            {contributor.title && (
              <p className="mt-1 text-sm font-medium text-zinc-300">
                {contributor.title}
              </p>
            )}

            {githubData.bio && !contributor.title && (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {githubData.bio}
              </p>
            )}
          </div>
        </div>

        {/* Sponsor button */}
        {contributor.sponsorLink && (
          <a
            href={contributor.sponsorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-2.5 text-sm font-semibold text-pink-400 transition-all duration-300 hover:border-pink-500 hover:bg-pink-500/20 hover:text-pink-300"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            Sponsor
          </a>
        )}
      </div>
    </div>
  );
}

// Simple badge for homepage use
export function ContributorBadge({
  img,
  profileUrl,
  name,
  sponsorLink,
}: {
  img: string;
  profileUrl: string;
  name: string;
  sponsorLink?: string;
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-full border border-aurora-darkblue bg-zinc-900/80 p-1.5 pr-5 transition-all duration-300 hover:scale-105 hover:border-aurora-blue hover:bg-zinc-800"
    >
      <img
        width={48}
        height={48}
        src={img}
        alt={name}
        className="rounded-full"
      />
      <span className="font-medium text-white">{name}</span>
      {sponsorLink && (
        <Heart className="h-4 w-4 text-pink-400" fill="currentColor" />
      )}
    </a>
  );
}
