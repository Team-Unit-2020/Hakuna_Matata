export const getSetting = (key) => {
  const value = process.env[key] || null;
  if (value === null) console.error('Missing config key', key);
  return value || '';
};


export const appSettings = {
  backendUrl: getSetting("REACT_APP_BACKEND_API"),
  googleMapAPIKey: getSetting("REACT_APP_GOOGLEMAP_APP_KEY"),
  payhereMerchentId: getSetting("REACT_APP_PAYHERE_MERCHENT_ID"),
  payhereNotifyUrl: getSetting("REACT_APP_PAYHERE_NOTIFY_URL"),
};

