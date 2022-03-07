export enum UrlVersion {
  LNDCONNECT = 0,
  LNCONNECT_UNIVERSAL_V0 = 1,
}

export type lndConnectData = {
  host: string;
  cert: string;
  macaroon: string;
  version?: UrlVersion.LNDCONNECT;
};

export type universalLnConnectData = {
  host: string;
  cert: string | false;
  macaroon: string;
  version?: UrlVersion.LNCONNECT_UNIVERSAL_V0;
  /** If not provided, LND is assumed */
  server?: "c-lightning-rest" | "lnd";
};

export type lndconnectUrlData = lndConnectData | universalLnConnectData;
