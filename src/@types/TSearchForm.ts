import { Status } from "../redux/chars/charsSlice";

export type THandleSearchSubmit = (params: { name: string }) => void;

export type TSearchFormProps = {
  onSubmit: THandleSearchSubmit;
  status: Status;
};
