import React from "react";
import { IoIosPlay } from "react-icons/io";
interface DropdownProps{
    title: string;
    content: string[];
    isActive: boolean;
    onToggle: ()=>void;
}

const DropdownComponent:React.FC<DropdownProps> = ({ title, content, isActive, onToggle }) => {
 
    return (
      <div className="flex flex-col gap-2 border-b border-white  ">
        <button
          className={`w-full flex justify-start items-center p-4   cursor-pointer ${isActive ? 'text-orange-400': 'text-white'}`}
          onClick={onToggle}
        >
          <div className="flex gap-2 items-center">
          <span className={isActive ? "rotate-45" : " "}>
          <IoIosPlay/>
          </span>
          <span>{title}</span>
          </div>
        </button>
  

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col ${
            isActive ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-4 py-2 text-white whitespace-pre-line flex flex-col gap-1">
          {
  content.map((ele, i) => <p key={i}>{ele}</p>)
}
          </div>
        </div>
      </div>
    );
  };
  
  
   
export default DropdownComponent;