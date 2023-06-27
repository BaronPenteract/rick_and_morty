export type THandleSearchSubmit = (params: { name: string }) => void;

export type TSearchFormProps = {
  onSubmit: THandleSearchSubmit;
};
