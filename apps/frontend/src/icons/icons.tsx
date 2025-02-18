import { ReactNode } from "react";
import {
  BiAccessibility,
  BiBody,
  BiBookAlt,
  BiBookBookmark,
  BiBookHeart,
  BiBookOpen,
  BiCalendar,
  BiCar,
  BiChurch,
  BiCodeAlt,
  BiCoffee,
  BiDesktop,
  BiFootball,
  BiHeart,
  BiMobile,
  BiTag,
} from "react-icons/bi";

type IconsTypes =
  | "desktop"
  | "mobile"
  | "book"
  | "acessibility"
  | "defTag"
  | "body"
  | "bookHeart"
  | "bookOpen"
  | "bookBookmark"
  | "calendar"
  | "car"
  | "church"
  | "code"
  | "coffee"
  | "heart"
  | "sport";

type IIcons = {
  [key in IconsTypes]: ReactNode;
};

const icons: IIcons = {
  desktop: <BiDesktop />,
  mobile: <BiMobile />,
  book: <BiBookAlt />,
  body: <BiBody />,
  acessibility: <BiAccessibility />,
  defTag: <BiTag />,
  bookHeart: <BiBookHeart />,
  bookOpen: <BiBookOpen />,
  bookBookmark: <BiBookBookmark />,
  calendar: <BiCalendar />,
  car: <BiCar />,
  church: <BiChurch />,
  code: <BiCodeAlt />,
  coffee: <BiCoffee />,
  heart: <BiHeart />,
  sport: <BiFootball />,
};

export { icons };
export type { IconsTypes };
