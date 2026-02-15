"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
	X,
	ZoomIn,
	ZoomOut,
	RotateCcw,
	Heart,
	ExternalLink,
	ChevronLeft,
	ChevronRight,
	Download,
	ChevronDown,
	User,
	Image,
	Palette,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import SharedNavbar from "@/components/nav/SharedNavbar";
import Footer from "@/components/footer/Footer";
import { StarsBackground } from "@/components/ui/stars-background";
import artData from "@/data/art.json";

type Artwork = {
	id: string;
	title: string;
	pronouns?: string;
	category: string;
	image?: string;
	images?: string[];
	thumbnail?: string;
	profilePicture?: string;
	artist: string;
};

type Artist = {
	username: string;
	displayName: string;
	sponsorLink: string;
};

const categories = ["characters", "wallpapers"] as const;
type Category = (typeof categories)[number];

const getArtworkImages = (artwork: Artwork): string[] => {
	if (artwork.images?.length) return artwork.images;
	if (artwork.image) return [artwork.image];
	return [];
};

const getArtworkPreview = (artwork: Artwork): string | undefined =>
	artwork.thumbnail || artwork.profilePicture || getArtworkImages(artwork)[0];

function CategoryCarousel({
	category,
	artworks,
	onSelect,
	categoryLabel,
}: {
	category: Category;
	artworks: Artwork[];
	onSelect: (artwork: Artwork) => void;
	categoryLabel: string;
}) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		dragFree: true,
	});
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	const onSelectChange = useCallback(() => {
		if (!emblaApi) return;
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelectChange();
		emblaApi.on("select", onSelectChange);
		emblaApi.on("reInit", onSelectChange);
		return () => {
			emblaApi.off("select", onSelectChange);
			emblaApi.off("reInit", onSelectChange);
		};
	}, [emblaApi, onSelectChange]);

	if (artworks.length === 0) return null;

	return (
		<section className="mb-16">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-white lg:text-3xl">
					{categoryLabel}
				</h2>
				<div className="flex gap-2">
					<button
						onClick={scrollPrev}
						disabled={!canScrollPrev}
						className="rounded-full bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-800"
						aria-label="Previous"
					>
						<ChevronLeft className="h-5 w-5" />
					</button>
					<button
						onClick={scrollNext}
						disabled={!canScrollNext}
						className="rounded-full bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-800"
						aria-label="Next"
					>
						<ChevronRight className="h-5 w-5" />
					</button>
				</div>
			</div>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex gap-4">
					{artworks.map((artwork) => {
						const isWallpaper = category === "wallpapers";
						const previewImage = getArtworkPreview(artwork);
						if (!previewImage) return null;
						return (
							<div
								key={artwork.id}
								className={`group flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 border-zinc-700 bg-zinc-900/80 shadow-xl transition-all hover:border-aurora-blue/50 hover:shadow-2xl hover:shadow-aurora-blue/20 ${
									isWallpaper
										? "w-[600px] lg:w-[800px]"
										: "w-[280px] lg:w-[320px]"
								}`}
								onClick={() => onSelect(artwork)}
							>
								<div
									className={`relative overflow-hidden ${isWallpaper ? "aspect-video" : "aspect-square"}`}
								>
									<img
										src={previewImage}
										alt={artwork.title}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<h3 className="flex items-baseline gap-2 text-lg font-semibold text-white drop-shadow-lg">
											{artwork.title}
											{artwork.pronouns && (
												<span className="text-sm font-normal text-zinc-300">
													{artwork.pronouns}
												</span>
											)}
										</h3>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default function ArtGalleryPage() {
	const t = useTranslations("Art-Page");
	const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [showDownloadMenu, setShowDownloadMenu] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const getArtworksByCategory = (category: Category) => {
		const artworks = artData.artworks.filter(
			(artwork) => artwork.category === category,
		) as Artwork[];
		// Show wallpapers in descending order (newest first)
		return category === "wallpapers" ? artworks.reverse() : artworks;
	};

	const getArtist = (artistKey: string): Artist => {
		return artData.artists[artistKey as keyof typeof artData.artists];
	};

	const openViewer = (artwork: Artwork) => {
		setSelectedArtwork(artwork);
		setSelectedImageIndex(0);
		setZoom(1);
		setPosition({ x: 0, y: 0 });
		setShowDownloadMenu(false);
	};

	const closeViewer = useCallback(() => {
		setSelectedArtwork(null);
		setSelectedImageIndex(0);
		setZoom(1);
		setPosition({ x: 0, y: 0 });
		setShowDownloadMenu(false);
	}, []);

	const selectedArtworkImages = selectedArtwork
		? getArtworkImages(selectedArtwork)
		: [];

	const selectedArtworkImage =
		selectedArtworkImages[selectedImageIndex] ||
		selectedArtwork?.image ||
		selectedArtwork?.thumbnail ||
		"";

	const showImageNavigation = selectedArtworkImages.length > 1;

	const showPreviousImage = useCallback(() => {
		if (!showImageNavigation) return;
		setSelectedImageIndex((prev) =>
			prev === 0 ? selectedArtworkImages.length - 1 : prev - 1,
		);
		setZoom(1);
		setPosition({ x: 0, y: 0 });
		setShowDownloadMenu(false);
	}, [showImageNavigation, selectedArtworkImages.length]);

	const showNextImage = useCallback(() => {
		if (!showImageNavigation) return;
		setSelectedImageIndex((prev) => (prev + 1) % selectedArtworkImages.length);
		setZoom(1);
		setPosition({ x: 0, y: 0 });
		setShowDownloadMenu(false);
	}, [showImageNavigation, selectedArtworkImages.length]);

	const handleZoomIn = useCallback(() => {
		setZoom((prev) => Math.min(prev + 0.5, 4));
	}, []);

	const handleZoomOut = useCallback(() => {
		setZoom((prev) => Math.max(prev - 0.5, 0.5));
	}, []);

	const handleResetZoom = useCallback(() => {
		setZoom(1);
		setPosition({ x: 0, y: 0 });
	}, []);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (zoom > 1) {
			setIsDragging(true);
			setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging && zoom > 1) {
			setPosition({
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleWheel = useCallback((e: WheelEvent) => {
		e.preventDefault();
		if (e.deltaY < 0) {
			setZoom((prev) => Math.min(prev + 0.2, 4));
		} else {
			setZoom((prev) => Math.max(prev - 0.2, 0.5));
		}
	}, []);

	// Close viewer on escape key and handle wheel zoom
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeViewer();
				return;
			}

			if (e.key === "ArrowLeft") {
				e.preventDefault();
				showPreviousImage();
			}

			if (e.key === "ArrowRight") {
				e.preventDefault();
				showNextImage();
			}
		};

		if (selectedArtwork) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("wheel", handleWheel, { passive: false });
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("wheel", handleWheel);
			document.body.style.overflow = "";
		};
	}, [
		selectedArtwork,
		closeViewer,
		handleWheel,
		showPreviousImage,
		showNextImage,
	]);

	return (
		<div className="relative min-h-screen bg-gray-950 text-white">
			<StarsBackground starDensity={0.0003} static />
			<SharedNavbar variant="page" />

			<main className="relative z-10 mx-auto max-w-screen-2xl px-6 pb-16 pt-32">
				{/* Hero Section */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 bg-gradient-to-r from-aurora-blue via-pink-400 to-aurora-lightorange bg-clip-text text-5xl font-bold text-transparent lg:text-7xl">
						{t("title")}
					</h1>
					<p className="mx-auto max-w-2xl text-xl text-zinc-400">
						{t("subtitle")}
					</p>
				</div>

				<div className="mb-16 rounded-2xl border border-pink-500/30 p-6 backdrop-blur-sm">
					<div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500/20">
							<Palette className="h-6 w-6 text-pink-400" />
						</div>
						<div className="flex-1">
							<h3 className="mb-1 text-lg font-semibold text-white">
								{t("contribute-title")}
							</h3>
							<p className="text-zinc-400">{t("contribute-description")}</p>
						</div>
						<a
							href="https://github.com/ublue-os/artwork"
							target="_blank"
							rel="noopener noreferrer"
							className="flex shrink-0 items-center gap-2 rounded-full bg-pink-500/20 px-5 py-2.5 font-medium text-pink-400 transition-colors hover:bg-pink-500/30"
						>
							{t("contribute-button")}
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>
				</div>

				{categories.map((category) => (
					<CategoryCarousel
						key={category}
						category={category}
						artworks={getArtworksByCategory(category)}
						onSelect={openViewer}
						categoryLabel={t(`categories.${category}`)}
					/>
				))}
			</main>

			<AnimatePresence>
				{selectedArtwork && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
						onClick={closeViewer}
					>
						{/* Close button */}
						<button
							onClick={closeViewer}
							className="absolute right-4 top-4 z-50 rounded-full bg-zinc-800/80 p-2 text-white transition-colors hover:bg-zinc-700"
							aria-label={t("close")}
						>
							<X className="h-6 w-6" />
						</button>

						{/* Zoom controls */}
						<div
							className="absolute left-4 top-4 z-50 flex flex-col items-center gap-2"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleZoomIn();
								}}
								className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/90 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
								aria-label={t("zoom-in")}
							>
								<ZoomIn className="h-5 w-5" />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleZoomOut();
								}}
								className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/90 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
								aria-label={t("zoom-out")}
							>
								<ZoomOut className="h-5 w-5" />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleResetZoom();
								}}
								className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/90 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
								aria-label={t("reset-zoom")}
							>
								<RotateCcw className="h-5 w-5" />
							</button>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/90 text-xs font-medium text-white backdrop-blur-sm">
								{Math.round(zoom * 100)}%
							</div>
							<div className="relative">
								{selectedArtwork.profilePicture ? (
									<>
										<button
											onClick={(e) => {
												e.stopPropagation();
												setShowDownloadMenu(!showDownloadMenu);
											}}
											className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/90 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
											aria-label={t("download")}
										>
											<Download className="h-4 w-4" />
											<ChevronDown className="h-3 w-3" />
										</button>
										{showDownloadMenu && (
											<div
												className="absolute left-0 top-12 z-50 min-w-[160px] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800/95 shadow-xl backdrop-blur-sm"
												onClick={(e) => e.stopPropagation()}
											>
												<a
													href={selectedArtworkImage}
													download
													className="flex items-center gap-3 px-4 py-3 text-sm text-white transition-colors hover:bg-zinc-700"
													onClick={() => setShowDownloadMenu(false)}
												>
													<Image className="h-4 w-4" />
													{t("download-character")}
												</a>
												<a
													href={selectedArtwork.profilePicture}
													download
													className="flex items-center gap-3 px-4 py-3 text-sm text-white transition-colors hover:bg-zinc-700"
													onClick={() => setShowDownloadMenu(false)}
												>
													<User className="h-4 w-4" />
													{t("download-profile")}
												</a>
											</div>
										)}
									</>
								) : (
									<a
										href={selectedArtworkImage}
										download
										onClick={(e) => e.stopPropagation()}
										className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/90 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
										aria-label={t("download")}
									>
										<Download className="h-5 w-5" />
									</a>
								)}
							</div>
						</div>

						<div
							className="relative flex h-full w-full cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing"
							onClick={(e) => e.stopPropagation()}
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
							onMouseLeave={handleMouseUp}
						>
							{showImageNavigation && (
								<>
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											showPreviousImage();
										}}
										className="absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-zinc-800/90 p-2 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
										aria-label="Previous image"
									>
										<ChevronLeft className="h-5 w-5" />
									</button>
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											showNextImage();
										}}
										className="absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-zinc-800/90 p-2 text-white backdrop-blur-sm transition-colors hover:bg-zinc-700"
										aria-label="Next image"
									>
										<ChevronRight className="h-5 w-5" />
									</button>
									<div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur-sm">
										{selectedArtworkImages.map((image, index) => (
											<button
												type="button"
												key={image}
												onClick={(e) => {
													e.stopPropagation();
													setSelectedImageIndex(index);
													setZoom(1);
													setPosition({ x: 0, y: 0 });
													setShowDownloadMenu(false);
												}}
												className={`h-2.5 w-2.5 rounded-full transition-colors ${
													selectedImageIndex === index
														? "bg-white"
														: "bg-zinc-400/60 hover:bg-zinc-200"
												}`}
												aria-label={`View image ${index + 1}`}
											/>
										))}
									</div>
								</>
							)}
							<img
								src={selectedArtworkImage}
								alt={t(`artworks.${selectedArtwork.id}.title`)}
								className="max-h-[80vh] max-w-[90vw] object-contain"
								style={{
									transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
									transition: isDragging ? "none" : "transform 0.2s ease-out",
								}}
								draggable={false}
							/>
						</div>

						<motion.div
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 100, opacity: 0 }}
							className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="mx-auto max-w-screen-lg">
								<h2 className="mb-4 flex items-baseline gap-3 text-2xl font-bold text-white">
									{selectedArtwork.title}
									{selectedArtwork.pronouns && (
										<span className="text-lg font-normal text-zinc-400">
											{selectedArtwork.pronouns}
										</span>
									)}
								</h2>
								<div className="flex flex-wrap items-center gap-4">
									<div className="flex items-center gap-2">
										<span className="text-sm text-zinc-500">
											{t("by-artist")}
										</span>
										<span className="font-medium text-white">
											{getArtist(selectedArtwork.artist).displayName}
										</span>
									</div>
									<a
										href={getArtist(selectedArtwork.artist).sponsorLink}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 rounded-full bg-pink-500/20 px-4 py-2 text-sm font-medium text-pink-400 transition-colors hover:bg-pink-500/30"
									>
										<Heart className="h-4 w-4" />
										{t("sponsor-artist")}
										<ExternalLink className="h-3 w-3" />
									</a>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Footer />
		</div>
	);
}
