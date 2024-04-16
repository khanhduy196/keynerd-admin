import { ProfileType, SizeType } from "enums/keycap";

export type KeycapListItem = {
  id: number;
  name: string;
  detais: KeyListDetailItem[];
};

export type KeyListDetailItem = {
  id: number;
  profile: ProfileType;
  size: SizeType;
};
