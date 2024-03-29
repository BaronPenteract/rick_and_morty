import { TComponentSVGProps } from "../../@types/TComponentSVG";

const AddCharSVG: React.FC<TComponentSVGProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.55 3.084a5.452 5.452 0 0 1 3.852 9.307l-.648.654-.86.854-6.852 6.852L5.19 13.9l-.86-.854-.648-.654a5.453 5.453 0 1 1 7.706-7.712l.654.654.655-.654a5.452 5.452 0 0 1 3.852-1.595Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddCharSVG;
