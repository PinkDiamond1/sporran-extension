import { DidUri, KiltAddress } from '@kiltprotocol/types';

export interface Identity {
  address: KiltAddress;
  did?: DidUri;
  name: string;
  index: number;
}

export type IdentitiesMap = Record<string, Identity>;
