import { KeycapProfile } from "enums/keycap";

export type KeycapListItem = {
  id: number;
  name: string;
  photos: string[];
  details: KeyListDetailItem[];
};

export type KeyListDetailItem = {
  id: number;
  profile: KeycapProfile;
  size: number;
};


export type KeycapViewItem = {
  id: number;
  name: string;
  photos: string[]
  details: KeycapDetailViewItem[];
};

export type KeycapDetailViewItem = {
  id: number;
  profile: KeycapProfile;
  size: number;
  fileUrl: string;

};
