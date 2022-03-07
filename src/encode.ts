import encodeCert from './encodeCert.js';
import encodeMacaroon from './encodeMacaroon.js';
import format from './format.js';
import type { lndconnectUrlData } from './types';

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to encode (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
export default function encode(data: lndconnectUrlData): string {
  const cert = data.cert ? encodeCert(data.cert) : false;
  const macaroon = encodeMacaroon(data.macaroon);

  return format({ ...data, cert, macaroon } as lndconnectUrlData);
}
