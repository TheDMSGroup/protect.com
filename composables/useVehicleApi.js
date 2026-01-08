/**
 * Vehicle API composable for fetching makes and models
 *
 * Usage:
 *   const { getMakes, getModels, loading, error } = useVehicleApi()
 *
 *   // Get all makes for a year
 *   const makes = await getMakes(2024)
 *
 *   // Get all models for a year and make
 *   const models = await getModels(2024, 'Toyota')
 */

import { ref } from 'vue'

// DMS Group Vehicle API endpoints
const API_BASE_URL = 'https://api.dmsgroup.com/vehicle'

// Priority makes to show first in quick replies
const PRIORITY_MAKES = ['CHEVROLET', 'FORD', 'HONDA', 'TOYOTA', 'NISSAN', 'GMC', 'BMW', 'JEEP', 'KIA', 'HYUNDAI', 'SUBARU']

export const useVehicleApi = () => {
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch all makes for a given year
   * @param {number|string} year - The vehicle year
   * @returns {Promise<Array>} - Array of makes
   */
  const getMakes = async (year) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/make/list/${year}?resptype=json`)

      if (!response.ok) {
        throw new Error(`Failed to fetch makes: ${response.statusText}`)
      }

      const data = await response.json()
      // Extract just the make names from the response
      const makes = data.map(item => item.make)

      // Sort with priority makes first, then alphabetically
      return makes.sort((a, b) => {
        const aIndex = PRIORITY_MAKES.indexOf(a.toUpperCase())
        const bIndex = PRIORITY_MAKES.indexOf(b.toUpperCase())

        // Both are priority makes - sort by priority order
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
        // Only a is priority - a comes first
        if (aIndex !== -1) return -1
        // Only b is priority - b comes first
        if (bIndex !== -1) return 1
        // Neither is priority - sort alphabetically
        return a.localeCompare(b)
      })
    } catch (err) {
      error.value = err.message
      console.error('Error fetching makes:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch all models for a given year and make
   * @param {number|string} year - The vehicle year
   * @param {string} make - The vehicle make
   * @returns {Promise<Array>} - Array of models
   */
  const getModels = async (year, make) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/model/list/${year}/${encodeURIComponent(make)}?resptype=json`)

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`)
      }

      const data = await response.json()
      // Extract just the model names from the response
      return data.map(item => item.model)
    } catch (err) {
      error.value = err.message
      console.error('Error fetching models:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Generate array of years (current year down to 40 years ago)
   * @returns {Array<number>} - Array of years
   */
  const getYears = () => {
    const currentYear = new Date().getFullYear() + 1 // Include next year for new models
    const startYear = currentYear - 40
    const years = []
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  /**
   * Sanitize user input for make/model
   * - Removes special characters except spaces, hyphens, and ampersands
   * - Trims whitespace
   * - Converts to title case
   * @param {string} input - User input string
   * @returns {string} - Sanitized string
   */
  const sanitizeInput = (input) => {
    if (!input) return ''
    return input
      .trim()
      .replace(/[^a-zA-Z0-9\s\-&]/g, '') // Remove special chars except space, hyphen, ampersand
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  /**
   * Find closest match from a list (case-insensitive)
   * @param {string} input - User input
   * @param {Array<string>} list - List to search
   * @returns {string|null} - Matching item or null
   */
  const findMatch = (input, list) => {
    if (!input || !list.length) return null
    const normalized = input.trim().toUpperCase()
    return list.find(item => item.toUpperCase() === normalized) || null
  }

  return {
    getMakes,
    getModels,
    getYears,
    sanitizeInput,
    findMatch,
    loading,
    error
  }
}

export default useVehicleApi
