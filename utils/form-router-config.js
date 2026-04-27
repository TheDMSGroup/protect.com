/**
 * Form routing rules and logic
 * Determines which form to show based on UTM params and A/B testing
 */

export const FORM_TYPES = {
  CHAT: 'chat-form',
  DIRECT_TO_CALL: 'directtocall',
  MINIMAL: 'forms-minimal',
  DETAILED: 'forms-detailed'
}

export const FORM_PATHS = {
  [FORM_TYPES.CHAT]: '/car-insurance/chat-form',
  [FORM_TYPES.DIRECT_TO_CALL]: '/car-insurance/directtocall',
  [FORM_TYPES.MINIMAL]: '/car-insurance/form/minimal',
  [FORM_TYPES.DETAILED]: '/car-insurance/form/detailed'
}

/**
 * Routing rules evaluated in order
 * First matching rule wins
 */
export const formRoutingRules = [
  {
    name: 'UTM Source - Paid Search',
    condition: (params) => {
      const source = params.utm_source?.toLowerCase() || ''
      return ['google', 'bing', 'yahoo'].includes(source) &&
             params.utm_medium?.toLowerCase() === 'cpc'
    },
    formType: FORM_TYPES.DIRECT_TO_CALL
  },
  {
    name: 'UTM Campaign - Phone Priority',
    condition: (params) => {
      const campaign = params.utm_campaign?.toLowerCase() || ''
      return campaign.includes('phone') || campaign.includes('call')
    },
    formType: FORM_TYPES.DIRECT_TO_CALL
  },
  {
    name: 'Has Phone Number',
    condition: (params) => {
      return !!params.c2cnumber
    },
    formType: FORM_TYPES.DIRECT_TO_CALL
  },
  {
    name: 'Default',
    condition: () => true,
    formType: FORM_TYPES.CHAT
  }
]

/**
 * A/B Test Variants
 * Assign users to test groups for comparison
 */
export const AB_TEST_VARIANTS = {
  A: 'chat-form',               // Control - full chat form
  B: 'directtocall',            // Variant B - minimal phone form
  C: 'forms-minimal',           // Variant C - minimal form under /form/
  D: 'forms-detailed',          // Variant D - detailed form under /form/
  'QUICKREDIRECT-1': 'forms-detailed'
}

/**
 * Get form type based on routing rules and variant parameter
 * @param {Object} params - URL query parameters
 * @returns {string} - Form type (FORM_TYPES constant)
 */
export function getFormType(params) {
  // 1. Check for explicit variant override in URL
  if (params.variant && AB_TEST_VARIANTS[params.variant.toUpperCase()]) {
    return AB_TEST_VARIANTS[params.variant.toUpperCase()]
  }

  // 2. Evaluate routing rules (UTM-based)
  for (const rule of formRoutingRules) {
    if (rule.condition(params)) {
      console.log(`Form Router: Matched rule "${rule.name}" -> ${rule.formType}`)
      return rule.formType
    }
  }

  // 3. Fallback (should never reach due to default rule)
  return FORM_TYPES.CHAT
}

/**
 * Assign A/B/C/D test variant randomly
 * Returns variant letter ('A', 'B', 'C', or 'D')
 */
export function assignABVariant() {
  const variants = ['D']
  const randomIndex = Math.floor(Math.random() * variants.length)
  return variants[randomIndex]
}
