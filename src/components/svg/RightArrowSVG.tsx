import { TComponentSVGProps } from "../../@types/TComponentSVG";

const RightArrowSVG: React.FC<TComponentSVGProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 42 42">
      <polygon
        fillRule="evenodd"
        points="11,38.32 28.609,21 11,3.68 13.72,1 34,21.01 13.72,41 "
      />
    </svg>
  );
};

export default RightArrowSVG;
