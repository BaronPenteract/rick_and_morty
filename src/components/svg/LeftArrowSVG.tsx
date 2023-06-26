import React from "react";
import { TComponentSVGProps } from "../../@types/TComponentSVG";

const LeftArrowSVG: React.FC<TComponentSVGProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 42 42">
      <polygon
        fillRule="evenodd"
        points="31,38.32 13.391,21 31,3.68 28.279,1 8,21.01 28.279,41 "
      />
    </svg>
  );
};

export default LeftArrowSVG;
