"use client";

import { useTranslations, useLocale } from "next-intl";
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
import Footer from "@/components/footer/Footer";

type GitHubContributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

// Use cached data from build time
const githubUsers = contributorsCache.githubUsers as Record<
  string,
  GitHubUserData
>;
const repoContributors =
  contributorsCache.repoContributors as GitHubContributor[];

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

const roleIcons: Record<ContributorRole, typeof Users> = {
  maintainer: Code,
  contributor: Users,
  designer: Palette,
  translator: Languages,
  artist: Sparkles,
  emeritus: Award,
  "special-guest": Star,
  advisor: GraduationCap,
  ublue: Boxes,
};

export default function ContributorsPage() {
  const t = useTranslations("Contributors-Page");
  const locale = useLocale();

  // Group contributors by role
  const maintainers = contributorsData.contributors.filter(
    (c) => c.role === "maintainer",
  );
  const artists = contributorsData.contributors.filter(
    (c) => c.role === "artist",
  );
  const emeritus = contributorsData.contributors.filter(
    (c) => c.role === "emeritus",
  );
  const specialGuests = contributorsData.contributors.filter(
    (c) => c.role === "special-guest",
  );
  const advisors = contributorsData.contributors.filter(
    (c) => c.role === "advisor",
  );
  const ublue = contributorsData.contributors.filter((c) => c.role === "ublue");
  const contributors = contributorsData.contributors.filter(
    (c) => c.role === "contributor",
  );
  const designers = contributorsData.contributors.filter(
    (c) => c.role === "designer",
  );
  const translators = contributorsData.contributors.filter(
    (c) => c.role === "translator",
  );

  // Filter repo contributors to exclude featured ones and bots
  const featuredUsernames = new Set(
    contributorsData.contributors.map((c) => c.github.toLowerCase()),
  );
  const otherContributors = repoContributors.filter(
    (c) =>
      !featuredUsernames.has(c.login.toLowerCase()) &&
      !c.login.includes("[bot]"),
  );

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      <StarsBackground starDensity={0.0003} static />
      <SharedNavbar variant="page" />

      <main className="relative z-10 mx-auto max-w-(--breakpoint-xl) px-6 pb-16 pt-32">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-linear-to-r from-aurora-blue via-aurora-darkblue to-aurora-orangina bg-clip-text text-5xl font-bold text-transparent lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-zinc-400">
            {t("subtitle")}
          </p>
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

        {/* Maintainers Section */}
        {maintainers.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Code className="h-6 w-6 text-aurora-purple" />
              <h2 className="text-3xl font-bold text-white">
                {t("maintainers")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {maintainers.map((contributor) => (
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
        )}

        {/* Artists Section */}
        {artists.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-pink-400" />
              <h2 className="text-3xl font-bold text-white">{t("artists")}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artists.map((contributor) => (
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
        )}

        {/* Contributors Section */}
        {contributors.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Users className="h-6 w-6 text-aurora-blue" />
              <h2 className="text-3xl font-bold text-white">
                {t("contributors")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contributors.map((contributor) => (
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
        )}

        {/* Emeritus Section */}
        {emeritus.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-500" />
              <h2 className="text-3xl font-bold text-white">{t("emeritus")}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {emeritus.map((contributor) => (
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
        )}

        {/* Special Guests Section */}
        {specialGuests.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Star className="h-6 w-6 text-emerald-500" />
              <h2 className="text-3xl font-bold text-white">
                {t("special-guests")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {specialGuests.map((contributor) => (
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
        )}

        {/* Universal Blue Section */}
        {ublue.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Boxes className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">{t("ublue")}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ublue.map((contributor) => (
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
        )}

        {/* Advisors Section */}
        {advisors.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-slate-400" />
              <h2 className="text-3xl font-bold text-white">{t("advisors")}</h2>
            </div>
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

        {/* Designers Section */}
        {designers.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Palette className="h-6 w-6 text-aurora-orangina" />
              <h2 className="text-3xl font-bold text-white">
                {t("designers")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {designers.map((contributor) => (
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
        )}

        {/* Translators Section */}
        {translators.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <Languages className="h-6 w-6 text-aurora-lightorange" />
              <h2 className="text-3xl font-bold text-white">
                {t("translators")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {translators.map((contributor) => (
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
        )}

        {/* All Repository Contributors */}
        {otherContributors.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <GithubIcon color="#a1a1aa" size={24} />
              <h2 className="text-3xl font-bold text-white">
                {t("all-contributors")}
              </h2>
            </div>
            <p className="mb-8 text-zinc-400">
              {t("all-contributors-subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {otherContributors.map((contributor) => (
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

      <Footer />
    </div>
  );
}
