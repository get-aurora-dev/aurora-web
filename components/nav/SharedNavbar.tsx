"use client";

import { useEffect, useState } from "react";
import { DownloadIcon, MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import LanguageSelector from "@/components/LanguageSelector";
import DownloadBtn from "@/components/download-btn";
import { cn } from "@/lib/utils";

interface SharedNavbarProps {
  variant?: "home" | "page";
  onScrollTo?: (section: string) => void;
}

const SharedNavbar = ({ variant = "page", onScrollTo }: SharedNavbarProps) => {
  const [isTop, setIsTop] = useState(true);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY <= 100);
    };
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNavbar = () => setNavbarOpen(false);

  const handleNavClick = (section: string) => {
    if (variant === "home" && onScrollTo) {
      onScrollTo(section);
    }
    closeNavbar();
  };

  const isHomePage = pathname === "/";

  return (
    <nav
      className={cn('fixed select-none z-30 w-full text-white transition-[top] ease-out top-0 lg:top-4 has-[:popover-open]:top-0', isTop && "top-4")} >
      <div
        className={cn(`container mx-auto transition-[background-color,padding,backdrop-filter] flex w-full flex-col flex-wrap items-center p-6 md:flex-row lg:w-5/6 lg:p-2 ease-out has-[:popover-open]:bg-gray-300/10 has-[:popover-open]:px-4 has-[:popover-open]:backdrop-blur-2xl lg:has-[:popover-open]:rounded-3xl lg:rounded-3xl`, isTop ? "bg-transparent" : "bg-gray-300/10 px-4 drop-shadow-xl backdrop-blur-2xl")}
      >
        {/* Desktop navbar */}
        <div className="mb-4 hidden w-full flex-row items-center justify-between gap-4 font-medium text-white md:mb-0 lg:flex">
          {/* Left side - Logo and Nav links */}
          <div className="flex flex-row items-center gap-10">
            {/* Logo */}
            {isHomePage && variant === "home" ? (
              <div
                className="ml-2 cursor-pointer"
                onClick={() => handleNavClick("intro")}
              >
                <img
                  src="/aurora-logo-white.svg"
                  width={45}
                  height={45}
                  alt="Aurora"
                />
              </div>
            ) : (
              <Link href="/" className="ml-2">
                <img
                  src="/aurora-logo-white.svg"
                  width={45}
                  height={45}
                  alt="Aurora"
                />
              </Link>
            )}

            {/* Nav links */}
            <div className="flex flex-row items-center gap-8 text-lg">
              {isHomePage && variant === "home" ? (
                <>
                  <button
                    onClick={() => handleNavClick("intro")}
                    className="transition-colors hover:text-aurora-blue"
                  >
                    {t("end-user")}
                  </button>
                  <button
                    onClick={() => handleNavClick("news")}
                    className="transition-colors hover:text-aurora-blue"
                  >
                    {t("news")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="transition-colors hover:text-aurora-blue"
                  >
                    {t("end-user")}
                  </Link>
                  <Link
                    href="/"
                    className="transition-colors hover:text-aurora-blue"
                  >
                    {t("news")}
                  </Link>
                </>
              )}
              <Link
                href="/contributors"
                className={`transition-colors ${pathname === "/contributors" ? "text-aurora-blue" : "hover:text-aurora-blue"}`}
              >
                {t("contributors")}
              </Link>
              <Link
                href="/art"
                className={`transition-colors ${pathname === "/art" ? "text-aurora-blue" : "hover:text-aurora-blue"}`}
              >
                {t("art")}
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex max-h-fit flex-row items-center justify-center gap-2 text-lg">
            <LanguageSelector />
            <DownloadBtn
              onClick={() => {
                if (isHomePage && variant === "home") {
                  handleNavClick("download");
                } else {
                  router.push("/#download");
                }
              }}
            />
          </div>
        </div>

        {/* Mobile navbar */}
        <div className="flex w-full flex-row items-center justify-between lg:hidden">
          {isHomePage && variant === "home" ? (
            <div
              className="cursor-pointer"
              onClick={() => handleNavClick("intro")}
            >
              <img
                src="/aurora-logo-white.svg"
                width={45}
                height={45}
                className={isTop ? "hidden" : "block"}
                alt="Aurora"
              />
              <img
                src="/aurora-logo.svg"
                width={45}
                height={45}
                className={isTop ? "block" : "hidden"}
                alt="Aurora"
              />
            </div>
          ) : (
            <Link href="/">
              <img
                src="/aurora-logo-white.svg"
                width={45}
                height={45}
                className={isTop ? "hidden" : "block"}
                alt="Aurora"
              />
              <img
                src="/aurora-logo.svg"
                width={45}
                height={45}
                className={isTop ? "block" : "hidden"}
                alt="Aurora"
              />
            </Link>
          )}

          <div className="flex flex-row items-center gap-3">
            <LanguageSelector />
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-hidden focus:outline-hidden lg:hidden"
              type="button"
              onClick={() => {
                if (isHomePage && variant === "home") {
                  handleNavClick("download");
                } else {
                  window.location.href = "/#download";
                }
              }}
            >
              <DownloadIcon width={30} height={30} />
            </button>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-hidden focus:outline-hidden lg:hidden"
              type="button"
              popoverTarget="mobile-menu"
            >
              <MenuIcon width={30} height={30} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          popover="auto"
          id="mobile-menu"
          className="mx-0 opacity-0 w-full mt-21 transition-discrete ease-out open:scale-100 transition-opacity open:opacity-100 starting:open:opacity-0 bg-gray-300/10 backdrop-blur-2xl text-white"
        >
          <div className="mt-5 grow items-center rounded-2xl lg:flex">
            <div className="flex w-full flex-col items-center justify-center gap-8 p-10 text-lg">
              {isHomePage && variant === "home" ? (
                <>
                  <button onClick={() => handleNavClick("intro")}>
                    {t("end-user")}
                  </button>
                  <button onClick={() => handleNavClick("news")}>
                    {t("news")}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/" onClick={closeNavbar}>
                    {t("end-user")}
                  </Link>
                  <Link href="/" onClick={closeNavbar}>
                    {t("news")}
                  </Link>
                </>
              )}
              <Link
                href="/contributors"
                onClick={closeNavbar}
                className={
                  pathname === "/contributors" ? "text-aurora-blue" : ""
                }
              >
                {t("contributors")}
              </Link>
              <Link
                href="/art"
                onClick={closeNavbar}
                className={pathname === "/art" ? "text-aurora-blue" : ""}
              >
                {t("art")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SharedNavbar;
