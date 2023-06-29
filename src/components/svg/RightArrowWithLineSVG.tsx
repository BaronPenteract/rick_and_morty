import React from "react";
import { TComponentSVGProps } from "../../@types/TComponentSVG";

const RightArrowWithLineSVG: React.FC<TComponentSVGProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="-1.5 0 20 20">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="translate(-1192.000000, -748.000000)" strokeWidth="2">
          <g transform="translate(1189.000000, 746.000000)">
            <path
              d="M19,21 L9.5,12 L19,3 M5,3 L5,21"
              transform="translate(11.750000, 12.000000) scale(-1, 1) translate(-11.750000, -12.000000) "
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default RightArrowWithLineSVG;
