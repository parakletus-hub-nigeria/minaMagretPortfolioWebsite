import React, { useRef } from "react";
import { IoIosPlay } from "react-icons/io";

interface DropdownProps {
  title: string;
  content: string[];
  isActive: boolean;
  onToggle: () => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({ title, content, isActive, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);  // Reference to the dropdown content

  return (
    <div className="flex flex-col gap-2 border-b border-white">
      <button
        className={`w-full flex justify-start items-center p-4 cursor-pointer ${isActive ? 'text-orange-400' : 'text-white'}`}
        onClick={onToggle}
      >
        <div className="flex gap-2 items-center">
          <span className={`transform transition-transform ${isActive ? "rotate-90" : ""}`}>
            <IoIosPlay />
          </span>
          <span>{title}</span>
        </div>
      </button>

      <div
        ref={contentRef}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="px-4 py-2 text-white whitespace-pre-line flex flex-col gap-1">
          {content.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownComponent;
