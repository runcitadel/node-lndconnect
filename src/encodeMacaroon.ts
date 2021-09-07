import base64url from 'base64url';
import strictUriEncode from 'strict-uri-encode';

/**
 * Encode a binary macaroon as a base64 encoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {String} Encoded macaroon
 */
export default function encodeMacaroon(input: string, format: BufferEncoding = 'hex'): string {
  if (!input) {
    return '';
  }

  // If we have a string, which does not look like hex treat it as a file path.
  if (typeof input === 'string' && !/^[0-9a-fA-F]+$/.test(input)) {
    return strictUriEncode(input);
  }

  // Otherwise, base64url encode it.
  const macaroonBase64 = Buffer.from(input, format).toString('base64');
  return base64url.fromBase64(macaroonBase64);
}
