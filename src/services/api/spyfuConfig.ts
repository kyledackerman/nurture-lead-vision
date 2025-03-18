
// SpyFu API configuration
export const SPYFU_API_USERNAME = 'bd5d70b5-7793-4c6e-b012-2a62616bf1af';
export const SPYFU_API_KEY = 'VESAPD8P';

// PRIMARY RAILWAY PROXY URL - this is the ONLY URL we should use
export const DEFAULT_PUBLIC_PROXY_URL = 'https://nurture-lead-vision-production.up.railway.app';

// Function to check if a domain has a valid format
export const isValidDomain = (domain: string): boolean => {
  if (domain === 'ping') return true; // Special case for connection testing
  return domain.trim().length > 0 && domain.includes('.');
};

// Function to clean domain format (remove http://, https://, www. etc.)
export const cleanDomain = (domain: string): string => {
  if (domain === 'ping') return domain;
  return domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .trim();
};

// Function to get the SpyFu URL for the given domain
export const getSpyFuUrl = (domain: string): string => {
  const cleanedDomain = cleanDomain(domain);
  return `https://www.spyfu.com/overview/domain?query=${encodeURIComponent(cleanedDomain)}`;
};

// Get the proxy server URL - ALWAYS return the Railway URL
export const getProxyServerUrl = (): string => {
  // ONLY use the Railway URL - no exceptions
  console.log('Using Railway proxy URL:', DEFAULT_PUBLIC_PROXY_URL);
  return DEFAULT_PUBLIC_PROXY_URL;
};

// Function to get the current proxy URL
export const PROXY_SERVER_URL = (): string => DEFAULT_PUBLIC_PROXY_URL;

// Function to get the proxy URL for SpyFu API requests
export const getProxyUrl = (domain: string): string => {
  const cleanedDomain = cleanDomain(domain);
  // ONLY use the Railway URL - no exceptions
  return `${DEFAULT_PUBLIC_PROXY_URL}/proxy/spyfu?domain=${encodeURIComponent(cleanedDomain)}`;
};

// Function to get a test URL for the proxy
export const getProxyTestUrl = (): string => {
  // ONLY use the Railway URL - no exceptions
  return `${DEFAULT_PUBLIC_PROXY_URL}/`;
};

// These functions do nothing - we ONLY use the Railway URL
export const saveCustomProxyUrl = (url: string): void => {
  // Never save custom URLs
  console.log('Custom proxy URLs are disabled - always using Railway URL');
};

export const toggleLocalProxy = (useLocal: boolean): void => {
  // Never toggle local proxy
  console.log('Local proxy usage is disabled - always using Railway URL');
};

// Function to check if SpyFu API key is available
export const hasSpyFuApiKey = (): boolean => {
  // We always have the API key available since it's hardcoded
  return Boolean(SPYFU_API_KEY);
};
