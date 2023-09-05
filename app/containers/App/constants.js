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
  DOSES_DELIVERED_MEDIAN: 'doses-delivered-median',
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
    chartTitle: 'Vaccine supply by income group (March 2023)',
    country_fk: 'iso',
    metrics: {
      secured: 'secured_vaccines_pc',
      delivered: 'del_dose_add_pc',
      administered: 'adm_td_add_pc',
    },
    maxValue: 10,
    maxSize: 1500000000,
    yDefault: 'secured',
    keyCategories: 'INCOME',
    metricOptions: ['secured', 'delivered', 'administered'],
    metricOptionLabel: 'Select indicator',
    groupByColumn: 'income_group',
    meta: {
      secured: {
        axisLabel: 'Doses secured (per capita)',
        label: 'Doses secured',
        updated: '08/31/2022',
        sourceURL:
          'https://docs.google.com/spreadsheets/d/1aR4L0VStsBrY37aRKTjlUwjQuPS3hDwdRyTwGInkRyE/edit?usp=sharing',
        source: 'IMF/WHO vaccine supply tracker',
      },
      delivered: {
        axisLabel: 'Doses delivered (per capita)',
        label: 'Doses delivered',
      },
      administered: {
        axisLabel: 'Doses administered (per capita)',
        label: 'Doses administered',
      },
    },
    xAxisLabel: 'Income Groups',
  },
  {
    key: 'uhc-coverage',
    file: 'uhc-coverage.csv',
    country_fk: 'iso',
    type: 'scatter',
    chartTitle:
      'Impact of health system capacities on vaccine administration progress',
    metrics: {
      uhc: 'uhc_sci',
      one_dose_2021: 'cov_total_a1d_2021',
      one_dose_2022: 'cov_total_a1d_2022',
    },
    xDefault: 'uhc',
    yDefault: 'one_dose_2021',
    metricOptions: ['one_dose_2021', 'one_dose_2022'],
    metricOptionLabel: 'Select time',
    hintMetricOptionLabel: 'At least 1 dose (% of population)',
    keyCategories: 'INCOME',
    meta: {
      uhc: {
        updated: '01/05/2023',
        sourceURL: 'https://data.who.int/indicators/i/9A706FD',
        source: 'UHC service coverage index',
        label: 'UHC service coverage (score)',
      },
      one_dose_2021: {
        date: '06/2021',
        label: 'June 2021',
      },
      one_dose_2022: {
        date: '06/2022',
        label: 'June 2022',
      },
    },
  },
  {
    key: 'doses-administered',
    file: 'doses-administered-weekly.csv',
    country_fk: 'iso',
    metrics: {
      doses: 'dvr_4wk_td_per',
    },
    keyCategories: 'INCOME',
    chartTitle: 'Vaccination rates over time',
    hint: [
      {
        label: 'Peak daily vaccination rate (% of population)',
        column: 'dvr_4wk_td_per',
        unit: '%',
        roundDigits: 2,
      },
      {
        label: 'Peak daily vaccines administered',
        column: 'dvr_4wk_td',
        roundDigits: 0,
      },
    ],
    dateLabel: 'Peak date',
    includePopulation: true,
  },
  {
    key: 'population-groups',
    file: 'population-groups.csv',
    chartTitle: 'Population groups fully vaccinated (March 2023)',
    country_fk: 'iso',
    metrics: {
      all: 'cov_total_fv',
      old: 'cov_old_fv',
      hcw: 'cov_hcw_fv',
    },
    groupByColumn: 'income_group',
    maxValue: 108,
    maxSize: 1500000000,
    isPercentage: true,
    yDefault: 'all',
    keyCategories: 'INCOME',
    metricOptions: ['all', 'old', 'hcw'],
    metricOptionLabel: 'Select group',
    meta: {
      all: {
        axisLabel: '% fully vaccinated',
        hintLabel: 'Fully vaccinated (all people)',
        label: 'All people',
        popColumn: 'pop',
      },
      old: {
        axisLabel: '% fully vaccinated',
        hintLabel: 'Fully vaccinated (older adults)',
        label: 'Older adults',
        popColumn: 'pop_older',
      },
      hcw: {
        axisLabel: '% fully vaccinated',
        hintLabel: 'Fully vaccinated (healthcare workers)',
        label: 'Healthcare workers',
        popColumn: 'pop_hcw',
      },
    },
    xAxisLabel: 'Income Groups',
  },
  {
    key: 'doses-delivered',
    file: 'doses-delivered.csv',
    group_fk: 'income_group',
    metrics: {
      delivered: 'del_dose_add_pc',
    },
    keyCategories: 'INCOME',
    chartTitle: 'Vaccine supply by income group',
  },
  {
    key: 'doses-delivered-median',
    file: 'doses-delivered.csv',
    group_fk: 'income_group',
    metrics: {
      median: 'del_dose_add_pc_0.5',
      lower: 'del_dose_add_pc_0.25',
      upper: 'del_dose_add_pc_0.75',
    },
    keyCategories: 'INCOME',
    chartTitle: 'Vaccine supply by country income group',
    labelPositions: {
      HIC: 'top',
      UMIC: 'top',
      LMIC: 'bottom',
      LIC: 'top',
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
    HIC: 'High Income Countries',
    UMIC: 'Upper Middle Income Countries',
    LMIC: 'Lower Middle Income Countries',
    LIC: 'Low Income Countries',
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

export const DATACOLORS = {
  LIC: '#2F739B',
  LMIC: '#7E9F6E',
  UMIC: '#D67732',
  HIC: '#9B3436',
};
