"use client";

import React, { RefObject, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { DownloadIcon, MenuIcon } from "lucide-react";
import DownloadBtn from "@/components/download-btn";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

const Navbar = ({
  introRef,
  newsRef,
  downloadRef,
}: {
  introRef: RefObject<any>;
  newsRef: RefObject<any>;
  downloadRef: RefObject<any>;
}) => {
  const [isTop, setIsTop] = useState(true);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY > 100;
      setIsTop(!isTop);
    });
  }, []);

  const closeNavbar = () => {
    setNavbarOpen(false);
  };
  const t = useTranslations("Navbar");
  return (
    <nav
      className={`fixed ${isTop ? "top-4" : "top-0 lg:top-4"} z-30 w-full text-white transition duration-300 ease-in-out`}
    >
      <div
        className={`container mx-auto flex w-full max-w-screen-2xl flex-col flex-wrap items-center lg:p-2 p-4 md:flex-row lg:w-2/3 ${isTop ? "bg-transparent" : "bg-gray-300/10 px-2 backdrop-blur-2xl lg:rounded-3xl"}`}
      >
        <div className="mb-4 hidden w-full flex-row items-center justify-between gap-4 font-medium text-white md:mb-0 lg:flex">
          <div
            className={"cursor-pointer ml-2"}
            onClick={() => {
              introRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              closeNavbar();
            }}
          >
            <img
              src={"/aurora-logo-white.svg"}
              width={45}
              height={45}
              className={``}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-14 text-lg">
            <button
              onClick={() => {
                introRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                closeNavbar();
              }}
            >
              {t("end-user")}
            </button>
            <button
              onClick={() => {
                newsRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                closeNavbar();
              }}
            >
              {t("news")}
            </button>
          </div>
          <div
            className={
              "flex max-h-fit flex-row items-center justify-center text-lg"
            }
          >
            <DownloadBtn
              onClick={() => {
                downloadRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                closeNavbar();
              }}
            />
          </div>
        </div>
        <div
          className={
            "flex w-full flex-row items-center justify-between lg:hidden"
          }
        >
          <div
            className={"cursor-pointer"}
            onClick={() => {
              introRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              closeNavbar();
            }}
          >
            <img
              src={"/aurora-logo-white.svg"}
              width={45}
              height={45}
              className={`${isTop ? "hidden" : "block"}`}
            />
            <img
              src={"/aurora-logo.svg"}
              width={45}
              height={45}
              className={`${isTop ? "block" : "hidden"}`}
            />
          </div>
          <div className={"flex flex-row gap-3"}>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => {
                downloadRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                closeNavbar();
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
        <Transition
          show={navbarOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="w-full"
          as="div"
        >
          <div
            className={`mt-5 flex-grow items-center rounded-2xl lg:flex`}
            id="example-navbar-warning"
          >
            <div className="flex w-full flex-col items-center justify-center gap-14 p-10 text-lg">
              <NavbarItems introRef={introRef} newsRef={newsRef} closeNavbar={closeNavbar}/>
            </div>
          </div>
        </Transition>
      </div>
    </nav>
  );
};
export default Navbar;

function NavbarItems({introRef, newsRef, closeNavbar}: {introRef: any, newsRef: any, closeNavbar: any}) {
  const t = useTranslations("Navbar");
  return (
    <>
      <button
        onClick={() => {
          introRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          closeNavbar();
        }}
      >
        {t("end-user")}
      </button>
      <button
        onClick={() => {
          newsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          closeNavbar();
        }}
      >
        {t("news")}
      </button>
    </>
  );
}
