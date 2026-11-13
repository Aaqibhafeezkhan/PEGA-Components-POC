const script = typeof document !== 'undefined' ? document.querySelector('script[nonce]') : null;
export const cspNonce = script?.getAttribute('nonce') || undefined;
