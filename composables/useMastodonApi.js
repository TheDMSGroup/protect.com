/**
 * Mastodon API composable for submitting lead data and getting insurance bids
 *
 * Usage:
 *   const { submitLead, loading, error } = useMastodonApi()
 *
 *   const result = await submitLead(leadData)
 *   // result.bids contains array of insurance offers
 */

import { ref } from 'vue'
import { useStore } from '~/stores/store'

const MASTODON_API_URL = 'https://matching.platform.ue.co/ping'

export const useMastodonApi = () => {
  const store = useStore()
  const loading = ref(false)
  const error = ref(null)

  /**
   * Submit lead data to Mastodon API
   * @param {Object} leadData - The lead data object
   * @returns {Promise<Object>} - API response with bids
   */
  const submitLead = async (leadData) => {
    loading.value = true
    error.value = null

    // Push to dataLayer for analytics
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'portal_lead' })
    }

    try {
      const response = await fetch(MASTODON_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.mastodonApiKey}`
        },
        body: JSON.stringify(leadData)
      })

      if (!response.ok) {
        throw new Error(`Failed to submit lead: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      error.value = err.message
      console.error('Error submitting to Mastodon:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Build the lead payload from form data
   * @param {Object} formData - Form data from the chat
   * @param {Object} options - Additional options (utm params, etc)
   * @returns {Object} - Formatted payload for Mastodon API
   */
  const buildLeadPayload = (formData, options = {}) => {
    const now = new Date()
    const formSubmit = now.toISOString().replace('T', ' ').substring(0, 19)
    const visitorInfo = store.visitorInfo || {}

    return {
      source_token: options.sourceToken || 'r0TV0W_hUOqv_Uow4brhX-wkx5F9TQ',
      limit: options.limit || 3,
      data: {
        first_name: formData.drivers?.[0]?.firstName || '',
        last_name: formData.drivers?.[0]?.lastName || '',
        address: formData.contact?.address || '',
        phone: formData.contact?.phone || '',
        email: formData.contact?.email || '',
        zipcode: formData.contact?.zipcode || '',
        ip_address: options.ipAddress || visitorInfo.ip_address || '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        utm_source: options.utmSource || visitorInfo.utm_source || '',
        utm_medium: options.utmMedium || visitorInfo.utm_medium || '',
        utm_campaign: options.utmCampaign || visitorInfo.utm_campaign || '',
        utm_content: options.utmContent || visitorInfo.utm_content || '',
        utm_term: options.utmTerm || visitorInfo.utm_term || '',
        tcpa_call_consent: formData.tcpaConsent || false,
        tcpa_disclosure: options.tcpaDisclosure || '',
        sub_1: options.sub1 || '',
        sub_2: options.sub2 || '',
        sub_3: options.sub3 || '',
        source_url: typeof window !== 'undefined' ? window.location.href : '',
        universal_lead_id: options.universalLeadId || '',
        trusted_form_certificate_id: options.trustedFormCertId || '',
        current_company: formData.insurance?.currentCompany || '',
        currently_insured: !!formData.insurance?.currentCompany,
        home_ownership: formData.homeOwnership || false,
        military_affiliation: formData.drivers?.some(d => ['yes', 'y'].includes(d.military?.toLowerCase())) || false,
        bundle_insurance: formData.bundleInsurance || false,
        zipcode_fallback: formData.contact?.zipcode || visitorInfo.zip || '',
        form_submit: formSubmit,
        coverage_type: options.coverageType || 'Standard Protection',
        bi_per_incident: options.biPerIncident || 300000,
        bi_per_person: options.biPerPerson || 100000,
        current_customer: options.currentCustomer || 0,
        continuous_coverage: parseCoverageLength(formData.insurance?.coverageLength),
        current_policy_expires: options.currentPolicyExpires || '',
        custom: {
          pub: options.pub || '',
          cid: options.cid || '',
          gclid: options.gclid || visitorInfo.gclid || '',
          msclkid: options.msclkid || visitorInfo.msclkid || '',
          fbc: options.fbc || visitorInfo.fbc || '',
          fbp: options.fbp || visitorInfo.fbp || '',
          fbclid: options.fbclid || visitorInfo.fbclid || '',
          clickid: options.clickid || visitorInfo.clickid || '',
          campaignid: options.campaignid || visitorInfo.campaignid || '',
          ueid: options.ueid || visitorInfo.ueid || '',
          variant: options.variant || visitorInfo.variant || '',
          survey_name: options.surveyName || '',
          referrer: options.referrer || visitorInfo.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
          impressure_session_id: options.impressureSessionId || '',
          parent_user_session_id: options.parentUserSessionId || '',
          device_type: getDeviceType(),
          hostname: typeof window !== 'undefined' ? window.location.hostname : '',
          mastodon_auction_id: options.mastodonAuctionId || '',
          mastodon_click_id: options.mastodonClickId || '',
          publisher_click_id: options.publisherClickId || '',
          rtclid: options.rtclid || visitorInfo.rtclid || '',
          adgroupid: options.adgroupid || visitorInfo.adgroupid || '',
          accountid: options.accountid || visitorInfo.accountid || '',
          targetid: options.targetid || visitorInfo.targetid || '',
          gbraid: options.gbraid || visitorInfo.gbraid || '',
          wbraid: options.wbraid || visitorInfo.wbraid || '',
          segment: options.segment || visitorInfo.segment || '',
          impressure_user_id: options.impressureUserId || '',
          tcpa_auction: options.tcpaAuction || '',
          impressure_updated_date: new Date().toISOString()
        },
        drivers: formatDrivers(formData.drivers || []),
        vehicles: formatVehicles(formData.vehicles || [])
      }
    }
  }

  /**
   * Parse coverage length string to months
   */
  const parseCoverageLength = (coverageLength) => {
    if (!coverageLength) return 0
    if (coverageLength === 'Less than 1 year') return 6
    if (coverageLength === '1-2 years') return 18
    if (coverageLength === '3-5 years') return 48
    if (coverageLength === '5+ years') return 72
    return 0
  }

  /**
   * Parse gender input to M/F
   */
  const parseGender = (gender) => {
    if (!gender) return ''
    const g = gender.toLowerCase().trim()
    if (['male', 'm', 'man', 'boy'].includes(g)) return 'M'
    if (['female', 'f', 'woman', 'girl'].includes(g)) return 'F'
    return ''
  }

  /**
   * Get device type from user agent
   */
  const getDeviceType = () => {
    if (typeof navigator === 'undefined') return 'Unknown'
    const ua = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet'
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'Mobile'
    return 'Desktop'
  }

  /**
   * Format drivers array for API
   */
  const formatDrivers = (drivers) => {
    return drivers.map((driver, index) => ({
      gender: parseGender(driver.gender),
      marital_status: ['yes', 'y', 'married'].includes(driver.married?.toLowerCase()) ? 'Married' : 'Single',
      first_name: driver.firstName || '',
      last_name: driver.lastName || '',
      bankruptcy: false,
      credit_rating: 'Good',
      education: 'Associate',
      license_status: 'active',
      first_licensed: 17,
      occupation: 'other not listed',
      primary_vehicle: index + 1,
      relationship: index === 0 ? 'self' : 'spouse',
      sr_22: false,
      date_of_birth: formatDob(driver.dob)
    }))
  }

  /**
   * Format date of birth from MM/DD/YYYY to YYYY-MM-DD
   */
  const formatDob = (dob) => {
    if (!dob) return ''
    const parts = dob.split('/')
    if (parts.length !== 3) return dob
    return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`
  }

  /**
   * Format vehicles array for API
   */
  const formatVehicles = (vehicles) => {
    return vehicles.map(vehicle => ({
      year: vehicle.year || '',
      make: vehicle.make?.toUpperCase() || '',
      model: vehicle.model?.toUpperCase() || '',
      ownership: 'own',
      commute_days: 5,
      primary_use: 'commute work',
      alarm: false,
      annual_mileage: 12000,
      collision: 500,
      commute_mileage: 10,
      comprehensive: 500,
      trim: 'BASE'
    }))
  }

  return {
    submitLead,
    buildLeadPayload,
    loading,
    error
  }
}

export default useMastodonApi
