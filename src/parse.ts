import { URL } from 'url';
import type { lndconnectUrlData } from './types';
/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to parse.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
export default function parse(string: string): lndconnectUrlData {
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
    cert: <string>parsedUrl.searchParams.get('cert'),
    macaroon: <string>parsedUrl.searchParams.get('macaroon'),
  };
}
