import { format as formatUrl } from 'url';
import { lndconnectUrlData, lndConnectData, UrlVersion, universalLnConnectData } from './types';

export function formatLndConnect(data: lndConnectData): string {
  const { cert, macaroon, host } = data;
  return formatUrl({
    protocol: 'lndconnect',
    slashes: true,
    host,
    query: {
      cert,
      macaroon,
    },
  });
}

export function formatLnConnectV0(data: universalLnConnectData) {
  const { cert, macaroon, host } = data;
  return formatUrl({
    protocol: 'lnconnect',
    slashes: true,
    host,
    query: {
      c: cert,
      m: macaroon,
      v: "0",
      s: data.server || "lnd",
    },
  });
}
/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to format (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
export default function format(data: lndconnectUrlData): string {
  data.version = data.version ?? UrlVersion.LNDCONNECT;
  switch(data.version) {
    case UrlVersion.LNCONNECT_UNIVERSAL_V0:
      return formatLnConnectV0(data);
    case UrlVersion.LNDCONNECT:
    default: 
      return formatLndConnect(data as lndConnectData);
  }
}
