import decodeCert from './decodeCert.js';
import decodeMacaroon from './decodeMacaroon.js';
import { lndconnectUrlData } from './types';

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
  if(parsedUrl.protocol !== 'lndconnect:')
    throw new Error('Invalid lndconnect url');
  
  parsedUrl.protocol = "http:";
  parsedUrl = new URL(parsedUrl.toString());

  if (
    !parsedUrl.searchParams.has('cert') ||
    !parsedUrl.searchParams.has('macaroon')
  ) {
    throw new Error('Invalid lndconnect url');
  }

  return {
    host: parsedUrl.host,
    cert: decodeCert(<string>parsedUrl.searchParams.get('cert')),
    macaroon: decodeMacaroon(<string>parsedUrl.searchParams.get('macaroon')),
  };
}
