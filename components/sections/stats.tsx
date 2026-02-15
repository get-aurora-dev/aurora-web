"use client";

import { StarsBackground } from "@/components/ui/stars-background";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type StatSlideId = "countme" | "star-history";

type StatSlide = {
	id: StatSlideId;
	src: string;
	href?: string;
	invert?: boolean;
	poweredByHref?: string;
};

const STAT_SLIDES: StatSlide[] = [
	{
		id: "countme",
		src: "https://raw.githubusercontent.com/ublue-os/countme/refs/heads/main/growth_aurora.svg",
		href: "https://raw.githubusercontent.com/ublue-os/countme/refs/heads/main/growth_aurora.svg",
		invert: true,
		poweredByHref: "https://coreos.github.io/rpm-ostree/countme/",
	},
	{
		id: "star-history",
		src: "https://api.star-history.com/svg?repos=ublue-os/aurora&type=date&legend=top-left",
		href: "https://www.star-history.com/#ublue-os/aurora&type=date&legend=top-left",
		invert: true,
	},
];

export default function StatsSection() {
	const t = useTranslations("Stats-Section");
	const [activeIndex, setActiveIndex] = useState(0);

	const goToPrevious = () => {
		setActiveIndex((currentIndex) =>
			currentIndex === 0 ? STAT_SLIDES.length - 1 : currentIndex - 1,
		);
	};

	const goToNext = () => {
		setActiveIndex((currentIndex) => (currentIndex + 1) % STAT_SLIDES.length);
	};

	return (
		<section className="relative w-full bg-gray-950 px-6 py-20 text-white">
			<StarsBackground starDensity={0.00035} static />
			<div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col gap-10">
				<h2 className="bg-gradient-to-r from-aurora-blue via-aurora-darkblue to-aurora-orangina bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
					{t("title")}
				</h2>

				<div className="rounded-2xl border border-white/10 bg-gray-900/70 p-4 shadow-sm backdrop-blur-sm md:p-6">
					<div className="mb-4 flex items-center justify-between gap-4">
						<h3 className="text-xl font-semibold text-white md:text-2xl">
							{t(`slides.${STAT_SLIDES[activeIndex].id}.title`)}
						</h3>
						<div className="flex items-center gap-4">
							{STAT_SLIDES[activeIndex].poweredByHref && (
								<a
									href={STAT_SLIDES[activeIndex].poweredByHref}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-zinc-400 transition-colors hover:text-white"
								>
									{t(`slides.${STAT_SLIDES[activeIndex].id}.powered-by-label`)}
								</a>
							)}
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={goToPrevious}
									className="rounded-full border border-white/15 bg-zinc-900/70 p-2 text-white transition-colors hover:bg-zinc-800"
									aria-label={t("previous-slide")}
								>
									<ChevronLeft className="h-5 w-5" />
								</button>
								<button
									type="button"
									onClick={goToNext}
									className="rounded-full border border-white/15 bg-zinc-900/70 p-2 text-white transition-colors hover:bg-zinc-800"
									aria-label={t("next-slide")}
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>

					<div className="overflow-hidden rounded-xl">
						<div
							className="flex transition-transform duration-500 ease-out"
							style={{ transform: `translateX(-${activeIndex * 100}%)` }}
						>
							{STAT_SLIDES.map((slide) => {
								const imageClassName = `w-full rounded-xl border border-white/10 bg-zinc-950/60 ${
									slide.invert ? "invert hue-rotate-180" : ""
								}`;
								const image = (
									<img
										src={slide.src}
										alt={t(`slides.${slide.id}.alt`)}
										className={imageClassName}
										loading="lazy"
									/>
								);

								return (
									<div key={slide.id} className="w-full flex-shrink-0">
										<div className="mx-auto w-full">
											{slide.href ? (
												<a
													href={slide.href}
													target="_blank"
													rel="noopener noreferrer"
													className="block rounded-xl"
												>
													{image}
												</a>
											) : (
												image
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div className="mt-5 flex items-center justify-center gap-2">
						{STAT_SLIDES.map((slide, index) => (
							<button
								type="button"
								key={slide.id}
								onClick={() => setActiveIndex(index)}
								className={`h-2.5 w-2.5 rounded-full transition-colors ${
									activeIndex === index
										? "bg-aurora-blue"
										: "bg-zinc-600 hover:bg-zinc-500"
								}`}
								aria-label={t("go-to-slide", {
									title: t(`slides.${slide.id}.title`),
								})}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
