"use client";

import { ContributorBadge } from "@/components/ContributorCard";
import contributorsCache from "@/data/contributors-cache.json";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type GitHubContributor = {
	login: string;
	id: number;
	avatar_url: string;
	html_url: string;
	contributions: number;
};

// Use cached repo contributors from build time
const repoContributors =
	contributorsCache.repoContributors as GitHubContributor[];

// Filter out bots
const filteredContributors = repoContributors.filter(
	(c) => !c.login.includes("[bot]"),
);

export default function Contributors() {
	const t = useTranslations("Contributors");

	return (
		<div>
			<div
				className={
					"flex max-w-screen-2xl flex-col items-center justify-center gap-5"
				}
			>
				<h1
					className={
						"bg-gradient-to-r from-aurora-blue to-aurora-lightorange bg-clip-text py-2 text-4xl font-bold text-transparent lg:text-7xl"
					}
				>
					{t("title")}
				</h1>
				<div className={"text-xl"}>{t("subtitle")}</div>
				<div
					className={
						"flex h-fit w-full max-w-screen-2xl flex-wrap justify-center gap-4"
					}
				>
					{filteredContributors.length > 0 ? (
						filteredContributors
							.slice(0, 12)
							.map((contributor) => (
								<ContributorBadge
									key={contributor.id}
									img={contributor.avatar_url}
									profileUrl={contributor.html_url}
									name={contributor.login}
								/>
							))
					) : (
						<p className="text-zinc-400">{t("error")}</p>
					)}
				</div>
				<div className="mt-6 w-full max-w-screen-2xl rounded-2xl border border-zinc-700 bg-zinc-900/60 p-4 shadow-lg backdrop-blur-sm lg:p-6">
					<div className="mb-3 flex items-center justify-between gap-2">
						<h2 className="bg-gradient-to-r from-aurora-blue to-aurora-lightorange bg-clip-text text-xl font-semibold text-transparent lg:text-2xl">
							{t("repo-activity-title")}
						</h2>
						<a
							href="https://repobeats.axiom.co"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-zinc-400 transition-colors hover:text-white"
						>
							{t("repo-activity-powered-by")}
						</a>
					</div>
					<img
						src="https://repobeats.axiom.co/api/embed/c86e98a6654e55f789375ff210dd4eb95f757906.svg"
						alt={t("repo-activity-alt")}
						title={t("repo-activity-alt")}
						className="w-full rounded-xl border border-zinc-700 bg-zinc-950/70"
						loading="lazy"
					/>
				</div>
				<Link
					href="/contributors"
					className="group mt-4 flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-aurora-blue hover:bg-zinc-800 hover:text-white"
				>
					{t("view-all")}
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</div>
	);
}
