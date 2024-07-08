import i18n from "i18next";

export const STATUS_COLORS = Object.freeze({
  1: 'secondary',
  2: 'primary',
  3: 'error',
  4: 'warning',
  5: 'success',
  6: 'error',
  7: 'secondary',
})

export const DREAM_STATUS = Object.freeze({
  1: i18n.t('pending'),
  2: i18n.t('accepted'),
  3: i18n.t('rejected'),
  4: i18n.t('in_progress'),
  5: i18n.t('done'),
  6: i18n.t('cancelled'),
  7: i18n.t('draft'),
})

export const GENDER = Object.freeze({
  1: i18n.t('male'),
  2: i18n.t('female'),
})

export const EMPLOYMENT_STATUS = Object.freeze({
  1: i18n.t('student'),
  2: i18n.t('employee'),
  3: i18n.t('unemployed'),
})

export const MARITAL_STATUS = Object.freeze({
  1: i18n.t('single'),
  2: i18n.t('married'),
  3: i18n.t('widow'),
  4: i18n.t('divorced'),
})
