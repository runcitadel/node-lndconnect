import decodeCert from './decodeCert.js';
import decodeMacaroon from './decodeMacaroon.js';
import { lndconnectUrlData, UrlVersion } from './types';

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to decode.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
export default function decode(string = ''): lndconnectUrlData {
  let parsedUrl = new URL(string);

  // In browsers, the URL API behaviour isn't consistent if using a custom protocol.
  // https://felixfbecker.github.io/whatwg-url-custom-host-repro/
  // Force the protocol to HTTP and parse again to work around this.
  if(parsedUrl.protocol !== 'lndconnect:' && parsedUrl.protocol !== 'lnconnect:')
    throw new Error('Invalid lndconnect url');
  
  parsedUrl.protocol = "http:";
  parsedUrl = new URL(parsedUrl.toString());

  const hasCert = parsedUrl.searchParams.has('cert') || parsedUrl.searchParams.has('c');
  const hasMacaroon = parsedUrl.searchParams.has('macaroon') || parsedUrl.searchParams.has('m');
  if (
    !hasCert ||
    !hasMacaroon
  ) {
    throw new Error('Invalid lndconnect url');
  }

  if(parsedUrl.searchParams.has('v') && parsedUrl.searchParams.get('v') !== "0")
    throw new Error("Unsupported URL version");

  return {
    host: parsedUrl.host,
    cert: decodeCert(parsedUrl.searchParams.get('cert') || parsedUrl.searchParams.get('c') as string),
    macaroon: decodeMacaroon(parsedUrl.searchParams.get('macaroon') || parsedUrl.searchParams.get('m') as string),
    version: parsedUrl.searchParams.has('v') ? UrlVersion.LNCONNECT_UNIVERSAL_V0 : UrlVersion.LNDCONNECT,
    server: (parsedUrl.searchParams.get('s') as "c-lightning-rest" | "lnd") || "lnd",
  };
}
