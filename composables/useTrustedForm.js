/**
 * TrustedForm composable for loading the TrustedForm script and retrieving the certificate URL
 *
 * Usage:
 *   const { loadTrustedForm, getCertificateUrl } = useTrustedForm()
 *
 *   onMounted(() => {
 *     loadTrustedForm()
 *   })
 *
 *   // Later, when submitting the form:
 *   const certUrl = getCertificateUrl()
 */

import { ref } from 'vue'

export const useTrustedForm = () => {
  const isLoaded = ref(false)
  const fieldName = 'xx_trusted_form_cert_url'

  /**
   * Load the TrustedForm script
   * @param {string} customFieldName - Optional custom field name for the hidden input
   */
  const loadTrustedForm = (customFieldName) => {
    if (typeof document === 'undefined') return

    const field = customFieldName || fieldName
    const provideReferrer = false

    // Create a hidden form for TrustedForm to inject its hidden input into
    if (!document.getElementById('trustedform-container')) {
      const form = document.createElement('form')
      form.id = 'trustedform-container'
      form.style.display = 'none'
      document.body.appendChild(form)
    }

    const tf = document.createElement('script')
    tf.type = 'text/javascript'
    tf.async = true

    let src = 'http' + (document.location.protocol === 'https:' ? 's' : '')
    src += '://api.trustedform.com/trustedform.js?provide_referrer=' + encodeURIComponent(provideReferrer)
    src += '&field=' + encodeURIComponent(field) + '&l=' + new Date().getTime() + Math.random()

    tf.src = src
    tf.onload = () => {
      isLoaded.value = true
    }

    const s = document.getElementsByTagName('script')[0]
    if (s && s.parentNode) {
      s.parentNode.insertBefore(tf, s)
    } else {
      document.head.appendChild(tf)
    }
  }

  /**
   * Get the TrustedForm certificate URL
   * @returns {string} - The certificate URL or empty string if not available
   */
  const getCertificateUrl = () => {
    if (typeof document === 'undefined') return ''

    // Try getting from the hidden input field by id
    const inputById = document.getElementById(fieldName)
    if (inputById && inputById.value) {
      return inputById.value
    }

    // Try getting by name attribute (TrustedForm may use name instead of id)
    const inputByName = document.querySelector(`input[name="${fieldName}"]`)
    if (inputByName && inputByName.value) {
      return inputByName.value
    }

    // Try common TrustedForm field names
    const commonNames = ['xxTrustedFormCertUrl', 'xxTrustedFormToken', 'trusted_form_cert_url']
    for (const name of commonNames) {
      const input = document.getElementById(name) || document.querySelector(`input[name="${name}"]`)
      if (input && input.value) {
        return input.value
      }
    }

    // Fallback: try the global TrustedForm object
    if (typeof window !== 'undefined' && window.TrustedForm && window.TrustedForm.certificateUrl) {
      return window.TrustedForm.certificateUrl
    }

    return ''
  }

  /**
   * Get just the TrustedForm certificate ID (without the URL prefix)
   * @returns {string} - The certificate ID or empty string if not available
   */
  const getCertificateId = () => {
    const url = getCertificateUrl()
    if (!url) return ''

    // Extract ID from URL like "https://cert.trustedform.com/190c604de02f1b1e240499ad62f122ab9117c7ed"
    const match = url.match(/\/([a-f0-9]+)$/)
    return match ? match[1] : url
  }

  return {
    loadTrustedForm,
    getCertificateUrl,
    getCertificateId,
    isLoaded
  }
}

export default useTrustedForm
