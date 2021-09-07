import base64url from 'base64url';
import decodeUriComponent from 'decode-uri-component';
import untildify from 'untildify';
import { isAbsolute } from 'path';

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

  if (isAbsolute(untildify(unescaped))) {
    return unescaped;
  }

  const cert = base64url.toBase64(unescaped);
  const prefix = '-----BEGIN CERTIFICATE-----\n';
  const postfix = '-----END CERTIFICATE-----';
  return prefix + cert.match(/.{0,64}/g)?.join('\n') + postfix;
}
