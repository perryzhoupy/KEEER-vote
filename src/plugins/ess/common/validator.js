import { parsePhoneNumberFromString } from '@keeer/libphonenumber/min'
import { validate as validateEmail } from 'email-validator'
import genUrlRegex from 'url-regex'

const urlRegex = genUrlRegex({ exact: true, strict: false })
const urlSchemeRegex = /^(http:|https:|ws:|wss:|ftp:|mailto:|tel:|file:|about:|chrome:|chrome-extension:|data:|irc:|magnet:|git:|git\+(ssh|http|https):|bitcoin:|rsync:|ssh:)/i

const textValidators = {
  text: {
    startsWith: (r, v) => v.startsWith(r.textContent),
    notStartsWith: (r, v) => !v.startsWith(r.textContent),
    endsWith: (r, v) => v.endsWith(r.textContent),
    notEndsWith: (r, v) => !v.endsWith(r.textContent),
    includes: (r, v) => v.indexOf(r.textContent) > -1,
    notIncludes: (r, v) => v.indexOf(r.textContent) < 0,
    is: (r, v) => r.textContent === v,
    isNot: (r, v) => r.textContent !== v,
  },
  numeric: {
    isNumber: v => !isNaN(v),
    isInt: v => !isNaN(v) && isFinite(v) && Math.floor(Number(v)) === Number(v),
    gt: (r, v) => Number(v) > Number(r.numericContent),
    ge: (r, v) => Number(v) >= Number(r.numericContent),
    lt: (r, v) => Number(v) < Number(r.numericContent),
    le: (r, v) => Number(v) <= Number(r.numericContent),
    eq: (r, v) => Number(v) - Number(r.numericContent) < Number.EPSILON,
    ne: (r, v) => Number(v) - Number(r.numericContent) > Number.EPSILON,
  },
  length: {
    maxlen: (r, v) => v.length <= r.lengthContent,
    minlen: (r, v) => v.length >= r.lengthContent,
  },
  phone: v => {
    const res = parsePhoneNumberFromString(v, 'CN')
    if (res && res.isValid()) return true
    // libphonenumber does not recognize number like `62511111` by default
    const resBJ = parsePhoneNumberFromString('010' + v, 'CN')
    return resBJ && resBJ.isValid()
  },
  mobile: v => {
    const res = parsePhoneNumberFromString(v, 'CN')
    return res && res.isValid() && res.getType() === 'MOBILE' && res.country === 'CN'
  },
  email: validateEmail,
  url: v => urlRegex.test(v) && urlSchemeRegex.test(v),
}

/**
 * Validates a question's value.
 * @param {object} options question options
 * @param {*} value question response value
 * @returns {string|null} null is valid, string is invalid reason
 */
export function validator (options, value) {
  if ([ 'VText', 'VTextarea', 'VRadio' ].indexOf(options.type) > -1 && typeof value !== 'string') value = ''
  if (options.required) {
    if (options.type === 'VCheckbox' && Object.values(value || {}).every(v => !v)) return 'required'
    else if (!value) return 'required'
  }
  if (options.config && options.config.validation && options.config.validation.useValidation) {
    const validation = options.config.validation
    switch (options.type) {
    case 'VText':
    case 'VTextarea': {
      if (!Array.isArray(validation.type) || validation.type.length === 0) break
      let fn = textValidators
      for (let i of validation.type) if (fn[i]) fn = fn[i]
      if (typeof fn !== 'function') break
      const res = fn.length > 1 ? fn(validation, value) : fn(value)
      if (!res) return 'text-unsatisfied'
      break
    }

    case 'VCheckbox': {
      let selectionCount = Object.values(value || {}).filter(v => !!v).length
      if (typeof validation.minSelection !== 'undefined' && selectionCount < validation.minSelection) return 'checkbox-under-min'
      if (typeof validation.maxSelection !== 'undefined' && selectionCount > validation.maxSelection) return 'checkbox-over-max'
      break
    }
    }
  }
  return null
}
