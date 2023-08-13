import { Status } from "../utils/constants";
import { IFilterParamsChars } from "./chars";
import { IFilterParamsEpisodes } from "./episodes";

export type THandleSearchSubmit = (
  params: IFilterParamsChars | IFilterParamsEpisodes
) => void;

export type TActiveOptionOnClick = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => void;

export type TActiveOption = {
  value: string;
  name: string;
  onClick: TActiveOptionOnClick;
};

export type TSearchFormProps = {
  onSubmit: THandleSearchSubmit;
  filterCharsParams?: IFilterParamsChars;
  filterEpisodesParams?: IFilterParamsEpisodes;
  status: Status;
};
