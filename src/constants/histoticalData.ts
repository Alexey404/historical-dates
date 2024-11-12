import { ContentType, HistoticalDataType } from "../types/HistoticalDataTypes";

const science: ContentType[] = [
  {
    id: 1,
    content:
      "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    date: 1975,
  },
  {
    id: 2,
    content:
      "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
    date: 1903,
  },
  {
    id: 3,
    content:
      "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    date: 1903,
  },
  {
    id: 4,
    content: "Слайд 4",
    date: 1903,
  },
  {
    id: 5,
    content: "Слайд 5",
    date: 1903,
  },
  {
    id: 6,
    content: "Слайд 4",
    date: 1903,
  },
  {
    id: 7,
    content: "Слайд 5",
    date: 1903,
  },
];

const movie: ContentType[] = [
  {
    id: 1,
    content: " «Хищник»/Predator, США (реж. Джон Мактирнан)",
    date: 1987,
  },
  {
    id: 2,
    content:
      " «Кто подставил кроликароджера»/Who Framed Roger Rabbit, США (реж. Роберт Земекис)",
    date: 1988,
  },
  {
    id: 3,
    content:
      "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    date: 1989,
  },
  {
    id: 4,
    content: "Слайд 4",
    date: 1900,
  },
  {
    id: 5,
    content: "Слайд 5",
    date: 1901,
  },
];

export const histoticalData: HistoticalDataType[] = [
  { label: "Наука", id: 1, from: 1975, to: 1987, content: science },
  { label: "Кино", id: 2, from: 1987, to: 1991, content: movie },
  { label: "Литература", id: 3, from: 1991, to: 2004, content: movie },
  { label: "Наука1", id: 4, from: 2004, to: 2009, content: movie },
  { label: "Наука2", id: 5, from: 2009, to: 2017, content: movie },
  { label: "Наука", id: 6, from: 2017, to: 2024, content: science },
];
