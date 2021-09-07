import url from 'url';
import type { lndconnectUrlData } from './types';

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to format (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
export default function format(data: lndconnectUrlData): string {
  const { cert, macaroon, host } = data;
  return url.format({
    protocol: 'lndconnect',
    slashes: true,
    host,
    query: {
      cert,
      macaroon,
    },
  });
}
