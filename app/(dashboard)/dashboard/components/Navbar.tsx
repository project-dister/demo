"use client";
import { useState } from "react";
import Link from "next/link";
import { FaShippingFast, FaComments, FaUserCog } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./nav.module.scss";

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <BsBarChartFill />,
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icon: <FaShippingFast />,
    },
    {
      name: "Messages",
      link: "/dashboard/chat",
      icon: <FaComments />,
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: <FaUserCog />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.nav} ${className}`}>
      <nav className="flex ">
        <div className="relative">
          <div
            className={`fixed z-50 ${open ? "" : "hidden"}`}
            onClick={() => setOpen(false)}
          ></div>
          <div
            className={`fixed ${
              styles.navBg
            } cardBg lightWhiteText pt-10 pb-6 z-50 transition-all ${
              open ? "w-52" : "w-16"
            }`}
          >
            <div className="flex justify-end mr-5">
              {open ? (
                <SlArrowLeft
                  className={`${styles.navArrowIcon} cursor-pointer orangeText`}
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <SlArrowRight
                  className={`${styles.navArrowIcon} cursor-pointer orangeText`}
                  onClick={() => setOpen(!open)}
                />
              )}
            </div>

            <div className="mt-4 flex flex-col gap-4 relative">
              {menus?.map((menu, i) => (
                <div className={styles.itemTextContainer} key={i}>
                  <Link
                    href={menu?.link}
                    key={i}
                    className={`group flex items-center gap-3.5 p-2 ${styles.itemText}`}
                  >
                    <div className="itemIconContainer">{menu.icon}</div>
                    <h2
                      className={`whitespace-pre  ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </h2>{" "}
                    <h2
                      className={`${open && "hidden"} absolute left-28 ${
                        styles.navItem
                      } whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:w-fit  `}
                    >
                      {menu?.name}
                    </h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
