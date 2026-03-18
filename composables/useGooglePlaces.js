/**
 * Google Places Autocomplete composable for address validation
 *
 * Usage:
 *   const { loadGooglePlaces, getAddressSuggestions, validateAddress } = useGooglePlaces()
 *
 *   onMounted(() => {
 *     loadGooglePlaces()
 *   })
 *
 *   const suggestions = await getAddressSuggestions('123 Main')
 */

import { ref } from 'vue'

const GOOGLE_PLACES_API_KEY = 'AIzaSyAeGLb-W1GuKegT4QY0mhI5hBOmfL79--c'

export const useGooglePlaces = () => {
  const isLoaded = ref(false)
  const autocompleteService = ref(null)
  const placesService = ref(null)
  const sessionToken = ref(null)

  /**
   * Load the Google Places API script
   */
  const loadGooglePlaces = () => {
    return new Promise((resolve) => {
      if (typeof document === 'undefined') {
        resolve(false)
        return
      }

      // Check if already loaded
      if (window.google?.maps?.places) {
        initServices()
        resolve(true)
        return
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
        const checkLoaded = setInterval(() => {
          if (window.google?.maps?.places) {
            clearInterval(checkLoaded)
            initServices()
            resolve(true)
          }
        }, 100)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        initServices()
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.head.appendChild(script)
    })
  }

  /**
   * Initialize the Places services
   */
  const initServices = () => {
    if (window.google?.maps?.places) {
      autocompleteService.value = new window.google.maps.places.AutocompleteService()
      // Create a dummy div for PlacesService (required but not displayed)
      const dummyDiv = document.createElement('div')
      placesService.value = new window.google.maps.places.PlacesService(dummyDiv)
      sessionToken.value = new window.google.maps.places.AutocompleteSessionToken()
      isLoaded.value = true
    }
  }

  /**
   * Get address suggestions from Google Places Autocomplete
   * @param {string} input - The user's input
   * @returns {Promise<Array>} - Array of address suggestions
   */
  const getAddressSuggestions = (input) => {
    return new Promise((resolve) => {
      if (!autocompleteService.value || !input || input.length < 3) {
        resolve([])
        return
      }

      autocompleteService.value.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'us' },
          types: ['address'],
          sessionToken: sessionToken.value
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            const results = predictions.map(p => ({
              placeId: p.place_id,
              description: p.description,
              mainText: p.structured_formatting?.main_text || '',
              secondaryText: p.structured_formatting?.secondary_text || ''
            }))
            resolve(results)
          } else {
            resolve([])
          }
        }
      )
    })
  }

  /**
   * Get detailed address information from a place ID
   * @param {string} placeId - The Google Place ID
   * @returns {Promise<Object>} - Parsed address components
   */
  const getPlaceDetails = (placeId) => {
    return new Promise((resolve) => {
      if (!placesService.value || !placeId) {
        resolve(null)
        return
      }

      placesService.value.getDetails(
        {
          placeId,
          fields: ['address_components', 'formatted_address'],
          sessionToken: sessionToken.value
        },
        (place, status) => {
          // Generate new session token after details request
          sessionToken.value = new window.google.maps.places.AutocompleteSessionToken()

          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const components = place.address_components || []
            const getComponent = (type) => {
              const comp = components.find(c => c.types.includes(type))
              return comp?.long_name || ''
            }
            const getShortComponent = (type) => {
              const comp = components.find(c => c.types.includes(type))
              return comp?.short_name || ''
            }

            const result = {
              formattedAddress: place.formatted_address || '',
              streetNumber: getComponent('street_number'),
              street: getComponent('route'),
              city: getComponent('locality') || getComponent('sublocality_level_1'),
              state: getShortComponent('administrative_area_level_1'),
              zipcode: getComponent('postal_code'),
              country: getShortComponent('country')
            }
            resolve(result)
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  /**
   * Validate and parse a manually entered address
   * Uses Geocoding to attempt to parse the address
   * @param {string} address - The full address string
   * @returns {Promise<Object|null>} - Parsed address or null if invalid
   */
  const validateAddress = async (address) => {
    if (!address || address.length < 5) return null

    // First try to get suggestions for the address
    const suggestions = await getAddressSuggestions(address)

    if (suggestions.length > 0) {
      // Get details for the first (best) match
      const details = await getPlaceDetails(suggestions[0].placeId)
      return details
    }

    return null
  }

  return {
    loadGooglePlaces,
    getAddressSuggestions,
    getPlaceDetails,
    validateAddress,
    isLoaded
  }
}

export default useGooglePlaces
