export default defineNuxtPlugin(() => {
  const store = useStore();

  // Function to parse GeoIP2 info
  const parseGeoInfo = () => {
    if (typeof window !== 'undefined' && window.geoip2) {
      return window.geoip2;
    }
    return false;
  };

  // Wait for geoip2 script to load, then fetch location
  const initGeoIP = () => {
    const geoip2 = parseGeoInfo();

    if (geoip2) {
      geoip2.city((location) => {
        const visitorGeoInfo = {};

        if (location.postal && location.postal.code) {
          visitorGeoInfo.zip = location.postal.code;
        }

        if (location.city && location.city.names && location.city.names.en) {
          visitorGeoInfo.city = location.city.names.en;
        }

        if (typeof location.subdivisions !== 'undefined' && location.subdivisions.length > 0) {
          if (typeof location.subdivisions[0].iso_code !== 'undefined') {
            visitorGeoInfo.region = location.subdivisions[0].names.en.toLowerCase();
          }
        }

        store.setVisitorInfo(visitorGeoInfo);
      }, (error) => {
        // Handle error silently or log if needed
        console.warn('GeoIP2 error:', error);
      });
    } else {
      // Retry after script loads
      setTimeout(initGeoIP, 100);
    }
  };

  // Initialize on client side
  if (process.client) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGeoIP);
    } else {
      initGeoIP();
    }
  }
});
