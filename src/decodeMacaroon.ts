import base64url from 'base64url';
import decodeUriComponent from 'decode-uri-component';

/**
 * decode a binary macaroon as a base64 decoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {String} decoded macaroon
 */
export default function decodeMacaroon(macaroonString: string): string {
  if (!macaroonString) {
    return '';
  }

  const unescaped = decodeUriComponent(macaroonString);

  if (unescaped.startsWith("/") || unescaped.startsWith("~")) {
    return unescaped;
  }

  return base64url.toBuffer(unescaped).toString('hex');
}
