import { Status } from "../utils/constants";
import { IFilterParamsChars } from "./chars";
import { IFilterParamsEpisodes } from "./episodes";

export type THandleSearchSubmit = (params: { name: string }) => void;

export type TSearchFormProps = {
  onSubmit: THandleSearchSubmit;
  filterParams: IFilterParamsChars | IFilterParamsEpisodes;
  status: Status;
};
