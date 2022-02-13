import decodeCert from './decodeCert.js';
import decodeMacaroon from './decodeMacaroon.js';
import { lndconnectUrlData } from './types';

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to decode.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
export default function decode(string = ''): lndconnectUrlData {
  const parsedUrl = new URL(string);

  if (
    parsedUrl.protocol !== 'lndconnect:' ||
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
