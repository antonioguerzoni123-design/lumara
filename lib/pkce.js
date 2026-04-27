function base64url(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function generateCodeVerifier() {
  return base64url(crypto.getRandomValues(new Uint8Array(64)));
}

export async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64url(new Uint8Array(digest));
}

export function generateState() {
  return base64url(crypto.getRandomValues(new Uint8Array(32)));
}

export function generateNonce() {
  return base64url(crypto.getRandomValues(new Uint8Array(32)));
}
