"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  LayoutGrid as GridIcon,
  Calendar as CalenderIcon,
  Phone as PhoneIcon,
  Voicemail as VoicemailIcon,
  Bot as BotIcon,
  UserCircle as UserCircleIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon className="w-5 h-5" />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <CalenderIcon className="w-5 h-5" />,
    name: "Appointments",
    path: "/dashboard/appointments",
  },
  {
    icon: <PhoneIcon className="w-5 h-5" />,
    name: "Call Logs",
    path: "/dashboard/call-logs",
  },
  {
    icon: <VoicemailIcon className="w-5 h-5" />,
    name: "Voicemails",
    path: "/dashboard/voicemails",
  },
  {
    icon: <BotIcon className="w-5 h-5" />,
    name: "AI Agents",
    path: "/dashboard/ai-agents",
  },
];

const DentalSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Check if path is active
  const isActive = useCallback(
    (path?: string, subItems?: { path: string }[]) => {
      if (path && pathname === path) return true;
      if (subItems) {
        return subItems.some((subItem) => pathname === subItem.path);
      }
      return false;
    },
    [pathname]
  );

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  useEffect(() => {
    // Auto-open dropdowns for active items
    navItems.forEach((item) => {
      if (item.subItems && isActive(item.path, item.subItems)) {
        setOpenDropdowns((prev) =>
          prev.includes(item.name) ? prev : [...prev, item.name]
        );
      }
    });
  }, [pathname, isActive]);

  const isCollapsed = !isExpanded && !isHovered;

  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-0 z-50 h-screen bg-white dark:bg-dark-bg shadow-xl transition-all duration-300 ${
        isMobileOpen
          ? "translate-x-0"
          : "-translate-x-full xl:translate-x-0"
      } ${isCollapsed ? "w-[90px]" : "w-[290px]"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex h-19 items-center justify-between px-6 py-5">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-2xl font-bold text-brand-500">SmilePoint</span>
        </Link>
        {isCollapsed && (
          <Link
            href="/dashboard"
            className="flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-brand-500">S</span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100vh-80px)] overflow-y-auto px-4 pb-4">
        <div>
          <h3
            className={`mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            MENU
          </h3>
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        isActive(item.path, item.subItems)
                          ? "bg-brand-50 text-brand-500 dark:bg-brand-500/10"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        {!isCollapsed && <span>{item.name}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform ${
                            openDropdowns.includes(item.name)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>
                    {!isCollapsed && openDropdowns.includes(item.name) && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              href={subItem.path}
                              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                                pathname === subItem.path
                                  ? "bg-brand-50 text-brand-500 dark:bg-brand-500/10"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              <span className="ml-6">{subItem.name}</span>
                              {subItem.pro && (
                                <span className="rounded bg-brand-500 px-1.5 py-0.5 text-xs text-white">
                                  PRO
                                </span>
                              )}
                              {subItem.new && (
                                <span className="rounded bg-green-500 px-1.5 py-0.5 text-xs text-white">
                                  NEW
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path || "#"}
                    className={`flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isActive(item.path)
                        ? "bg-brand-50 text-brand-500 dark:bg-brand-500/10"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.icon}
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Upgrade Widget */}
        {!isCollapsed && <SidebarWidget />}
      </nav>
    </aside>
  );
};

export default DentalSidebar;