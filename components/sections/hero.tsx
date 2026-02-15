"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TextLoop } from "@/components/ui/text-loop";
import { useHotkeySequence } from "@tanstack/react-hotkeys";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { type RefObject, useMemo, useState } from "react";
import BlurText from "../BlurText";

const LOGO_DEFAULT = "/aurora-text-logo.svg";
const LOGO_PRIDE = "/pride-aurora.svg";
const LOGO_TRANS = "/aurora-trans.svg";
const LOGO_ROTATION = [LOGO_DEFAULT, LOGO_PRIDE, LOGO_TRANS] as const;
type HeroLogo = (typeof LOGO_ROTATION)[number];

type HeroButtonTheme = {
	learnGradient: string;
	docsGradient: string;
};

const HERO_BUTTON_THEMES: Record<HeroLogo, HeroButtonTheme> = {
	[LOGO_DEFAULT]: {
		learnGradient: "from-aurora-orangina to-aurora-lightorange",
		docsGradient: "from-aurora-darkblue to-aurora-blue",
	},
	[LOGO_PRIDE]: {
		learnGradient: "from-aurora-pride-red to-aurora-pride-yellow",
		docsGradient: "from-aurora-pride-blue to-aurora-pride-violet",
	},
	[LOGO_TRANS]: {
		learnGradient: "from-aurora-trans-blue to-aurora-trans-pink",
		docsGradient: "from-aurora-trans-pink to-aurora-trans-blue",
	},
};

export default function Hero({
	introRef,
	aboutRef,
}: {
	introRef: RefObject<HTMLDivElement>;
	aboutRef: RefObject<HTMLDivElement | null>;
}) {
	const t = useTranslations("Introduction");
	const router = useRouter();
	const [manualLogo, setManualLogo] = useState<HeroLogo | null>(null);
	const isJune = useMemo(() => new Date().getMonth() === 5, []);
	const seasonalLogo = isJune ? LOGO_PRIDE : LOGO_DEFAULT;
	const activeLogo = manualLogo ?? seasonalLogo;

	useHotkeySequence(["A", "U", "R", "O", "R", "A"], () => {
		setManualLogo((currentManualLogo) => {
			const currentLogo = currentManualLogo ?? seasonalLogo;
			const currentIndex = LOGO_ROTATION.indexOf(
				currentLogo as (typeof LOGO_ROTATION)[number],
			);
			const nextLogo =
				LOGO_ROTATION[
					currentIndex >= 0 ? (currentIndex + 1) % LOGO_ROTATION.length : 0
				];
			return nextLogo;
		});
	});

	return (
		<div
			ref={introRef}
			className="relative flex h-screen flex-col items-center justify-center gap-4 overflow-hidden text-wrap bg-gray-950 text-white backdrop-blur-xl animate-ease-linear"
		>
			<ShootingStars minDelay={3200} />
			<StarsBackground starDensity={0.00003} />
			<div className="z-10 flex max-w-screen-2xl flex-col items-center justify-center gap-5 lg:m-0">
				<div className="mb-4 flex w-2/3 items-center justify-start md:w-3/4 lg:w-2/3">
					<h1 className="bg-gradient-to-r from-aurora-blue via-aurora-darkblue to-aurora-orangina bg-clip-text text-6xl font-extrabold uppercase tracking-widest text-transparent md:text-7xl lg:text-9xl">
						<img src={activeLogo} alt="Aurora Logo" />
					</h1>
				</div>
				<div className="flex w-2/3 flex-col gap-3 text-2xl font-semibold md:w-3/4 md:text-3xl lg:w-2/3 lg:text-4xl">
					<BlurText
						text={t("tagline")}
						delay={50}
						animateBy="words"
						direction="top"
						className="text-2xl"
					/>

					<TextLoop className="italic">
						<span
							className={
								"bg-gradient-to-r from-aurora-blue via-aurora-darkblue to-aurora-orangina bg-clip-text text-transparent"
							}
						>
							{t("loop-1")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-blue to-aurora-lightorange bg-clip-text text-transparent"
							}
						>
							{t("loop-2")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-blue to-aurora-lightorange bg-clip-text text-transparent"
							}
						>
							{t("loop-3")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-transparent"
							}
						>
							{t("loop-4")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-transparent"
							}
						>
							{t("loop-5")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-lightred to-aurora-orangina bg-clip-text text-transparent"
							}
						>
							{t("loop-6")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-lightred to-aurora-orangina bg-clip-text text-transparent"
							}
						>
							{t("loop-7")}
						</span>
						<span
							className={
								"bg-gradient-to-r from-aurora-blue to-aurora-darkblue bg-clip-text text-transparent"
							}
						>
							{t("loop-8")}
						</span>
					</TextLoop>
				</div>
				<div className="flex w-2/3 flex-col-reverse items-center justify-center gap-5 lg:w-2/3 lg:flex-row lg:items-start lg:justify-start">
					<div className="group relative">
						<button
							type="button"
							className="relative inline-flex min-w-[250px] items-center justify-center gap-3 overflow-hidden rounded-xl px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
							onClick={() =>
								aboutRef.current?.scrollIntoView({ behavior: "smooth" })
							}
						>
							{LOGO_ROTATION.map((logo) => (
								<div
									key={logo}
									className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r transition-opacity duration-700 ease-out ${
										HERO_BUTTON_THEMES[logo].learnGradient
									} ${activeLogo === logo ? "opacity-100" : "opacity-0"}`}
								/>
							))}
							<span className="relative z-10 inline-flex items-center gap-3">
								<ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
								{t("learn-more")}
							</span>
							<div className="pointer-events-none absolute inset-0 z-20 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</button>
					</div>

					<div className="group relative">
						<button
							type="button"
							className="relative inline-flex min-w-[250px] items-center justify-center gap-3 overflow-hidden rounded-2xl px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
							onClick={() => router.push("https://docs.getaurora.dev")}
						>
							{LOGO_ROTATION.map((logo) => (
								<div
									key={logo}
									className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r transition-opacity duration-700 ease-out ${
										HERO_BUTTON_THEMES[logo].docsGradient
									} ${activeLogo === logo ? "opacity-100" : "opacity-0"}`}
								/>
							))}
							<span className="relative z-10 inline-flex items-center gap-3">
								{t("go-to-docs")}
								<ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
							</span>
							<div className="pointer-events-none absolute inset-0 z-20 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
