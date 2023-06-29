import React from "react";
import { TComponentSVGProps } from "../../@types/TComponentSVG";

const LeftArrowWithLineSVG: React.FC<TComponentSVGProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="-2 0 20 20" version="1.1">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="translate(-1267.000000, -748.000000)" strokeWidth="2">
          <g transform="translate(1263.000000, 746.000000)">
            <path d="M19,21 L9.5,12 L19,3 M5,3 L5,21"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LeftArrowWithLineSVG;
