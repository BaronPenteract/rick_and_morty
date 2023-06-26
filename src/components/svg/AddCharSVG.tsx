import { TComponentSVGProps } from "../../@types/TComponentSVG";

const AddCharSVG: React.FC<TComponentSVGProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-6 -6)">
        <rect width="4" height="20" rx="1.98" transform="translate(14 6)" />
        <rect width="20" height="4" rx="1.98" transform="translate(6 14)" />
      </g>
    </svg>
  );
};

export default AddCharSVG;
