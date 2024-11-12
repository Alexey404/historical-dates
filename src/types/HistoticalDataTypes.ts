export type ContentType = {
  id: number;
  content: string;
  date: number;
};

export type HistoticalDataType = {
  id: number;
  label: string;
  from: number;
  to: number;
  content: ContentType[];
};
