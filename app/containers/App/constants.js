/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// loading actions
export const LOAD_DATA_IF_NEEDED = 'hrmi/App/LOAD_DATA_IF_NEEDED';
export const LOAD_DATA_SUCCESS = 'hrmi/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'hrmi/App/LOAD_DATA_ERROR';
export const DATA_REQUESTED = 'hrmi/App/DATA_REQUESTED';
export const DATA_READY = 'hrmi/App/DATA_READY';

// URLs for external resources loaded on request
export const DATA_URL = '//app.dumpark.com/covdp-charts-data/data';

export const PATHS = {
  DOSES_DELIVERED: 'doses-delivered',
  // cumulative doses delivered over time by income group: line-chart
  // indicator: del_dose_add_pc
  VAX_SUPPLY: 'vaccine-supply',
  // vaccine supply by income group for each country: beeswarm plots
  // indicators (select one):
  // - secured: secured_vaccines_pc
  // - delivered: del_dose_add_pc
  // - administered: adm_td_add_pc
  UHC_COVERAGE: 'uhc-coverage',
  // % at least one dose vs UHC service coverage index for each country: scatter plot
  // indicators:
  // - uhc_sci
  // - cov_total_a1d
  DOSES_ADMIN: 'doses-administered',
  // daily doses administered over time for each country: line-chart
  // indicators:
  // - dvr_4wk_td_per
  POP_GROUPS: 'population-groups',
  // % fully vaccinated by population group and by income group for each country: beeswarm plots
  // indicators:
  // - all people: cov_total_fv
  // - older people: cov_old_fv
  // - health care workers: cov_hcw_fv
};

export const DATA_RESOURCES = [
  {
    key: 'countries',
    file: 'countries.csv',
  },
  {
    key: 'country-data-snapshot',
    file: 'country-data-snapshot.csv',
  },
  {
    key: 'country-data-overtime',
    file: 'country-data-overtime.csv',
  },
  // {
  //   key: 'income-group-data-overtime',
  //   file: 'income-group-data-overtime.csv',
  // },
];

export const COLUMNS = {
  COUNTRIES: {
    NAME: 'name_short',
    ISO: 'iso',
    REGION: 'who_region',
    INCOME: 'income_group',
    COVAX: 'covax_status',
    CSC: 'csc_status',
  },
  INDICATORS: {
    DOSES_DELIVERED_ADD: 'del_dose_add_pc',
    VAX_SECURED_ADD: 'secured_vaccines_pc',
    DOSES_ADMIN_ADD: 'adm_td_add_pc',
    UHC: 'uhc_sci',
  },
};

export const CATEGORIES = {
  REGION: {
    AFR: 'African Region',
    AMR: 'Region of the Americas',
    EMR: 'Eastern Mediterranean Region',
    EUR: 'European Region',
    SEAR: 'South-East Asian Region',
    WPR: 'Western Pacific Region',
  },
  INCOME: {
    HIC: 'High Income Group',
    UMIC: 'Upper Middle Income Group',
    LMIC: 'Lower Middle Income Group',
    LIC: 'Low Income Group',
    other: 'Other Income Group',
  },
  COVAX: {
    AMC: 'AMC (Advance Market Commitment)',
    SF: 'Self-fincancing',
    No: 'None',
  },
  CSC: {
    CSC: 'Concerted Support Country',
  },
};
