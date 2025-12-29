"use client";

import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { DownloadIcon, MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSelector from "@/components/LanguageSelector";
import DownloadBtn from "@/components/download-btn";

interface SharedNavbarProps {
  variant?: "home" | "page";
  onScrollTo?: (section: string) => void;
}

const SharedNavbar = ({ variant = "page", onScrollTo }: SharedNavbarProps) => {
  const [isTop, setIsTop] = useState(true);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY <= 100);
    };
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
      className={`fixed ${isTop && !navbarOpen ? "top-4" : "top-0 lg:top-4"} z-30 w-full text-white transition duration-300 ease-in-out`}
    >
      <div
        className={`container mx-auto flex w-full flex-col flex-wrap items-center p-6 md:flex-row lg:w-5/6 lg:p-2 ${isTop && !navbarOpen ? "bg-transparent" : "bg-gray-300/10 px-4 drop-shadow-xl backdrop-blur-2xl lg:rounded-3xl"} ${navbarOpen && isTop ? "pt-10" : ""}`}
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
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none focus:outline-none lg:hidden"
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
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon width={30} height={30} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={navbarOpen}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="w-full"
          as="div"
        >
          <div className="mt-5 flex-grow items-center rounded-2xl lg:flex">
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
        </Transition>
      </div>
    </nav>
  );
};

export default SharedNavbar;
