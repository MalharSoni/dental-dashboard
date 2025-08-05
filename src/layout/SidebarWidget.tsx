import React from "react";

export default function SidebarWidget() {
  return (
    <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-5 text-center">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        SmilePoint Dental
      </h3>
      <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
        Professional dental practice management dashboard.
      </p>
      <a
        href="#"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-blue-500 text-sm hover:bg-blue-600"
      >
        Upgrade To Pro
      </a>
    </div>
  );
}
