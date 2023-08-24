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
export const DATA_URL = '//covdp-data.web.app/data';

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
    pk: 'iso',
    name: 'name_short',
    categories: {
      region: 'who_region',
      income: 'income_group',
      covax: 'covax_status',
      csc: 'csc_status',
    },
    metrics: {
      pop: 'pop',
      pop_hcw: 'pop_hcw',
      pop_old: 'pop_old',
    },
  },
  {
    key: 'vaccine-supply',
    file: 'vaccine-supply.csv',
    country_fk: 'iso',
    metrics: {
      secured: 'secured_vaccines_pc',
      delivered: 'del_dose_add_pc',
      administered: 'adm_td_add_pc',
    },
    meta: {
      secured: {
        updated: '08/31/2022',
        sourceURL:
          'https://docs.google.com/spreadsheets/d/1aR4L0VStsBrY37aRKTjlUwjQuPS3hDwdRyTwGInkRyE/edit?usp=sharing',
        source: 'IMF/WHO vaccine supply tracker',
      },
    },
  },
  {
    key: 'uhc-coverage',
    file: 'uhc-coverage.csv',
    country_fk: 'iso',
    metrics: {
      uhc: 'uhc_sci',
      one_dose_2021: 'cov_total_a1d_2021',
      one_dose_2022: 'cov_total_a1d_2022',
    },
    meta: {
      uhc: {
        updated: '01/05/2023',
        sourceURL: 'https://data.who.int/indicators/i/9A706FD',
        source: 'UHC service coverage index',
      },
      one_dose_2021: {
        date: '06/2021',
      },
      one_dose_2022: {
        date: '06/2022',
      },
    },
  },
  {
    key: 'doses-administered',
    file: 'doses-administered.csv',
    country_fk: 'iso',
    metrics: {
      doses: 'dvr_4wk_td_per',
    },
  },
  {
    key: 'population-groups',
    file: 'population-groups.csv',
    country_fk: 'iso',
    metrics: {
      all: 'cov_total_fv',
      old: 'cov_old_fv',
      hcw: 'cov_hcw_fv',
    },
  },
  {
    key: 'doses-delivered',
    file: 'doses-delivered.csv',
    group_fk: 'income_group',
    metrics: {
      delivered: 'del_dose_add_pc',
    },
  },
];

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
    Other: 'Other Income Group',
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
