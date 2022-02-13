import base64url from 'base64url';
import decodeUriComponent from 'decode-uri-component';

/**
 * decode a tls certificate from a base64 encoded url string.
 * @param  {String} certString base64url encoded string to decode
 * @return {String} decoded certificate
 */
export default function decodeCert(certString: string): string {
  if (!certString) {
    return '';
  }

  const unescaped = decodeUriComponent(certString);

  if (unescaped.startsWith("/") || unescaped.startsWith("~")) {
    return unescaped;
  }

  const cert = base64url.toBase64(unescaped);
  const prefix = '-----BEGIN CERTIFICATE-----\n';
  const postfix = '-----END CERTIFICATE-----';
  return prefix + cert.match(/.{0,64}/g)?.join('\n') + postfix;
}
