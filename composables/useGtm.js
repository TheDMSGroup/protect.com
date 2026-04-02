export const GTM_DEFAULT_ID = "GTM-MZPRQHZ";

export const useGtm = () => {
  const { proxy } = useScriptGoogleTagManager({ id: GTM_DEFAULT_ID });
  return proxy;
};
