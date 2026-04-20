/**
 * Jornaya LeadiD composable for loading the LeadiD script and retrieving the universal lead token
 *
 * Usage:
 *   const { loadJornaya, getLeadToken } = useJornaya()
 *
 *   onMounted(() => {
 *     loadJornaya()
 *   })
 *
 *   // Later, when submitting the form:
 *   const token = getLeadToken()
 */

const CAMPAIGN_ID = '1c4d36be-d8ff-4b45-50c3-fecf1e700170'

export const useJornaya = () => {
  /**
   * Load the Jornaya LeadiD script
   * Injects a hidden input[id="leadid_token"] into the DOM
   */
  const loadJornaya = () => {
    if (typeof document === 'undefined') return
    if (document.getElementById('LeadiDscript')) return

    // LeadiD requires a hidden input to exist before the script loads
    if (!document.getElementById('leadid_token')) {
      const input = document.createElement('input')
      input.id = 'leadid_token'
      input.name = 'leadid_token'
      input.type = 'hidden'
      input.value = ''
      document.body.appendChild(input)
    }

    const script = document.createElement('script')
    script.id = 'LeadiDscript'
    script.type = 'text/javascript'
    script.async = true
    script.src = `https://create.lidstatic.com/campaign/${CAMPAIGN_ID}.js?snippet_version=2`
    document.body.appendChild(script)
  }

  /**
   * Get the Jornaya universal lead token
   * @returns {string} - The lead token or empty string if not available
   */
  const getLeadToken = () => {
    if (typeof document === 'undefined') return ''
    const input = document.getElementById('leadid_token')
    return input?.value || ''
  }

  return {
    loadJornaya,
    getLeadToken
  }
}

export default useJornaya
