"use client";
import React, { forwardRef } from "react";

interface SkillIconProps {
  icon: React.ReactNode;
  name: string;
}

const SkillIcon = forwardRef<HTMLDivElement, SkillIconProps>(
  ({ icon, name }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl sm:text-3xl md:text-4xl rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-shadow duration-300"
      >
        {icon}
        <span className="mt-1 sm:mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          {name}
        </span>
      </div>
    );
  }
);

SkillIcon.displayName = "SkillIcon";

export default SkillIcon;
