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

export type UpdateKeycapRequest = {
  id: number;
  name: string;
  details: UpdateKeycapDetailRequest[];
};

export type UpdateKeycapDetailRequest = {
  key: number;
  profile: KeycapProfile;
  size: number;
  file?: File;
};
