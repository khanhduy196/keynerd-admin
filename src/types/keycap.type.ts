import { KeycapProfile } from "enums/keycap";

export type CreateKeycapRequest = {
  name: string;
  details: CreateKeycapDetailRequest[];
  photos: File[];
};

export type CreateKeycapDetailRequest = {
  key: number;
  profile: KeycapProfile;
  size: number;
  file?: File;
};
