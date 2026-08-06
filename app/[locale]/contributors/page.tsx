"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Heart,
  Users,
  Code,
  Palette,
  Languages,
  Sparkles,
  Award,
  Star,
  GraduationCap,
  Boxes,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import {
  ContributorCard,
  ContributorBadge,
  type ContributorData,
  type GitHubUserData,
  type ContributorRole,
} from "@/components/ContributorCard";
import contributorsData from "@/data/contributors.json";
import contributorsCache from "@/data/contributors-cache.json";
import { StarsBackground } from "@/components/ui/stars-background";
import SharedNavbar from "@/components/nav/SharedNavbar";

type GitHubContributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  repos?: string[];
};

type RepoInfo = { name: string; contributorCount: number };

// Use cached data from build time
const githubUsers = contributorsCache.githubUsers as Record<
  string,
  GitHubUserData
>;
const repoContributors =
  contributorsCache.repoContributors as GitHubContributor[];
const repos = ((contributorsCache as { repos?: RepoInfo[] }).repos ?? []).filter(
  (r) => r.contributorCount > 0,
);

// Helper to get GitHub data with fallback
function getGitHubData(username: string): GitHubUserData {
  return (
    githubUsers[username] || {
      login: username,
      id: 0,
      avatar_url: `https://github.com/${username}.png`,
      html_url: `https://github.com/${username}`,
      name: username,
      bio: null,
    }
  );
}

// Featured sections, rendered in order
const sections: {
  role: ContributorRole;
  labelKey: string;
  icon: typeof Users;
  iconColor: string;
  iconBg: string;
}[] = [
  { role: "maintainer", labelKey: "maintainers", icon: Code, iconColor: "text-aurora-purple", iconBg: "bg-aurora-purple/15" },
  { role: "artist", labelKey: "artists", icon: Sparkles, iconColor: "text-pink-400", iconBg: "bg-pink-400/15" },
  { role: "contributor", labelKey: "contributors", icon: Users, iconColor: "text-aurora-blue", iconBg: "bg-aurora-blue/15" },
  { role: "emeritus", labelKey: "emeritus", icon: Award, iconColor: "text-amber-500", iconBg: "bg-amber-500/15" },
  { role: "special-guest", labelKey: "special-guests", icon: Star, iconColor: "text-emerald-500", iconBg: "bg-emerald-500/15" },
  { role: "ublue", labelKey: "ublue", icon: Boxes, iconColor: "text-blue-400", iconBg: "bg-blue-400/15" },
  { role: "designer", labelKey: "designers", icon: Palette, iconColor: "text-aurora-orangina", iconBg: "bg-aurora-orangina/15" },
  { role: "translator", labelKey: "translators", icon: Languages, iconColor: "text-aurora-lightorange", iconBg: "bg-aurora-lightorange/15" },
];

const featuredUsernames = new Set(
  contributorsData.contributors.map((c) => c.github.toLowerCase()),
);
const otherContributors = repoContributors.filter(
  (c) =>
    !featuredUsernames.has(c.login.toLowerCase()) &&
    !c.login.includes("[bot]") &&
    !c.login.startsWith("ubot-"),
);
const humanContributors = repoContributors.filter(
  (c) => !c.login.includes("[bot]") && !c.login.startsWith("ubot-"),
);
const totalContributions = humanContributors.reduce(
  (sum, c) => sum + c.contributions,
  0,
);

function SectionHeader({
  icon: Icon,
  iconColor,
  iconBg,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  title: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <div className="h-px flex-1 bg-linear-to-r from-zinc-700 to-transparent" />
    </div>
  );
}

export default function ContributorsPage() {
  const t = useTranslations("Contributors-Page");
  const [repoFilter, setRepoFilter] = useState<string | null>(null);

  const byRole = (role: ContributorRole) =>
    contributorsData.contributors.filter((c) => c.role === role);
  const advisors = byRole("advisor");

  const visibleOthers = repoFilter
    ? otherContributors.filter((c) => c.repos?.includes(repoFilter))
    : otherContributors;

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      <StarsBackground starDensity={0.0003} static />
      <SharedNavbar variant="page" />

      <main className="relative z-10 mx-auto max-w-(--breakpoint-xl) px-6 pb-16 pt-32">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-linear-to-r from-aurora-blue via-aurora-darkblue to-aurora-orangina bg-clip-text pb-2 text-5xl font-bold text-transparent lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-zinc-400">
            {t("subtitle")}
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              [
                humanContributors.length,
                t("stats-contributors"),
                "border-aurora-blue/40 bg-aurora-blue/10 text-aurora-blue",
              ],
              [
                repos.length,
                t("stats-repos"),
                "border-purple-400/40 bg-purple-400/10 text-purple-400",
              ],
              [
                totalContributions.toLocaleString(),
                t("stats-contributions"),
                "border-aurora-lightorange/40 bg-aurora-lightorange/10 text-aurora-lightorange",
              ],
            ].map(([value, label, color]) => (
              <div
                key={label}
                className={`rounded-2xl border px-8 py-4 backdrop-blur-xs ${color}`}
              >
                <div className="text-3xl font-bold">
                  {value}
                </div>
                <div className="mt-1 text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-aurora-lightred/20 bg-linear-to-r from-aurora-lightred/10 to-aurora-lightorange/10 p-8">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-500/20">
              <Heart className="h-8 w-8 text-aurora-lightred" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold text-white">
                {t("sponsor-title")}
              </h2>
              <p className="text-zinc-400">{t("sponsor-subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Featured role sections */}
        {sections.map(({ role, labelKey, icon, iconColor, iconBg }) => {
          const members = byRole(role);
          if (members.length === 0) return null;
          return (
            <section key={role} className="mb-16">
              <SectionHeader
                icon={icon}
                iconColor={iconColor}
                iconBg={iconBg}
                title={t(labelKey)}
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((contributor) => (
                  <ContributorCard
                    key={contributor.github}
                    contributor={contributor as ContributorData}
                    githubData={getGitHubData(contributor.github)}
                    roleLabels={contributorsData.roles}
                    variant="detailed"
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Advisors Section */}
        {advisors.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              icon={GraduationCap}
              iconColor="text-slate-400"
              iconBg="bg-slate-400/15"
              title={t("advisors")}
            />
            <div className="flex flex-wrap justify-center gap-4">
              {advisors.map((contributor) => {
                const ghData = getGitHubData(contributor.github);
                return (
                  <ContributorBadge
                    key={contributor.github}
                    img={ghData.avatar_url}
                    profileUrl={ghData.html_url}
                    name={ghData.login}
                    sponsorLink={contributor.sponsorLink}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* All Repository Contributors */}
        {otherContributors.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              icon={() => <GithubIcon color="#a1a1aa" size={24} />}
              iconColor=""
              iconBg="bg-zinc-400/15"
              title={t("all-contributors")}
            />
            <p className="mb-8 text-zinc-400">
              {t("all-contributors-subtitle")}
            </p>

            {/* Repository filter */}
            {repos.length > 1 && (
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setRepoFilter(null)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    repoFilter === null
                      ? "border-aurora-blue bg-aurora-blue/20 text-white"
                      : "border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {t("all-repos")}
                </button>
                {repos.map((repo) => (
                  <button
                    key={repo.name}
                    type="button"
                    onClick={() => setRepoFilter(repo.name)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      repoFilter === repo.name
                        ? "border-aurora-blue bg-aurora-blue/20 text-white"
                        : "border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {repo.name.split("/")[1]}
                    <span className="ml-2 text-xs text-zinc-500">
                      {repo.contributorCount}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {visibleOthers.length === 0 && (
              <p className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
                {t("no-other-contributors")}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {visibleOthers.map((contributor) => (
                <ContributorBadge
                  key={contributor.id}
                  img={contributor.avatar_url}
                  profileUrl={contributor.html_url}
                  name={contributor.login}
                />
              ))}
            </div>
          </section>
        )}

        {/* Join CTA */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            {t("join-title")}
          </h2>
          <p className="mb-6 text-zinc-400">{t("join-subtitle")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://github.com/ublue-os/aurora"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-aurora-blue to-aurora-darkblue px-6 py-3 font-semibold text-white transition-all hover:scale-105"
            >
              <GithubIcon color="#ffffff" size={20} />
              {t("contribute-github")}
            </a>
            <a
              href="https://discord.getaurora.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-zinc-600 bg-zinc-800 px-6 py-3 font-semibold text-white transition-all hover:border-zinc-500 hover:bg-zinc-700"
            >
              {t("join-discord")}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
