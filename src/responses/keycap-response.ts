import { KeycapProfile } from "enums/keycap";

export type KeycapListItem = {
  id: number;
  name: string;
  detais: KeyListDetailItem[];
};

export type KeyListDetailItem = {
  id: number;
  profile: KeycapProfile;
  size: number;
};
