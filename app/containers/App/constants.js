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
  // - received: del_dose_add_pc
  // - administered: adm_td_add_pc
  UHC_COVERAGE: 'uhc-coverage',
  // % at least one dose vs UHC service coverage index for each country: scatter plot
  // indicators:
  // - uhc_sci
  // - cov_tot_a1d
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
    file: 'countries-20230927.csv',
    pk: 'iso',
    name: 'name',
    categories: {
      region: 'region_who',
      income: 'income_group',
      covax: 'status_covax',
      csc: 'status_csc',
    },
    metrics: {
      pop: 'pop',
      pop_hcw: 'pop_hcw',
      pop_old: 'pop_old',
    },
  },
  {
    key: 'doses-delivered',
    file: 'doses-delivered-20230929.csv',
    xAxisLabel: 'Time',
    yAxisLabel: 'Doses received',
    yAxisLabelAdditional: '(per capita)',
    group_fk: 'income_group',
    metrics: {
      mean: 'del_dose_add_pc',
    },
    keyCategories: 'INCOME',
  },
  {
    key: 'doses-administered',
    file: 'doses-administered-weekly-20230927.csv',
    country_fk: 'iso',
    metrics: {
      doses: 'dvr_4wk_td_per',
    },
    keyCategories: 'INCOME',
    hint: [
      {
        label: 'Peak daily vaccination rate',
        labelAdditional: '% of population',
        column: 'dvr_4wk_td_per',
        unit: '%',
        roundDigits: 2,
      },
      {
        label: 'Peak daily doses administered',
        labelAdditional: '4-week average',
        column: 'dvr_4wk_td',
        roundDigits: 0,
      },
    ],
    dateLabel: 'Peak date',
    includePopulation: true,
    xAxisLabel: 'Date',
    yAxisLabel: 'Daily vaccination rate',
    yAxisLabelAdditional: '(% of population)',
    yMax: 3.5,
  },
  {
    key: 'uhc-coverage',
    file: 'uhc-coverage-20230927.csv',
    country_fk: 'iso',
    type: 'scatter',
    metrics: {
      uhc: 'uhc_sci',
      one_dose_2021: 'cov_tot_a1d_2021',
      one_dose_2022: 'cov_tot_a1d_2022',
    },
    xDefault: 'uhc',
    yDefault: 'one_dose_2021',
    metricOptions: ['one_dose_2021', 'one_dose_2022'],
    metricOptionLabel: 'Select time',
    hintMetricOptionLabel:
      'Individuals with at least one dose (% of population)',
    keyCategories: 'INCOME',
    meta: {
      uhc: {
        updated: '01/05/2023',
        sourceURL: 'https://data.who.int/indicators/i/9A706FD',
        source: 'UHC service coverage index',
        label: 'UHC Index (2021)',
      },
      one_dose_2021: {
        label: 'June 2021',
      },
      one_dose_2022: {
        label: 'June 2022',
      },
    },
    xAxisLabel: 'Universal Health Coverage index (2021)',
    yAxisLabel: 'Individuals with at least one dose',
    yAxisLabelAdditional: '(% of population)',
  },
  {
    key: 'vaccine-supply',
    file: 'vaccine-supply-20230929.csv',
    country_fk: 'iso',
    metrics: {
      secured: 'secured_vaccines_pc',
      received: 'del_dose_add_pc',
      administered: 'adm_tot_td_add_pc',
    },
    maxValue: 10,
    maxSize: 1500000000,
    minDiameter: 2.6, // 2.2 - 10million
    minDiameterSmall: 2, // 2.2 - 10million
    yDefault: 'secured',
    keyCategories: 'INCOME',
    groupByColumn: 'income_group',
    metricOptions: ['secured', 'received', 'administered'],
    metricOptionLabel: 'Select indicator',
    metricType: 'indicator',
    meta: {
      secured: {
        label: 'Doses secured',
        axisLabel: 'Doses secured',
        axisLabelAdditional: '(per capita)',
        hintLabel: 'Doses secured (per capita)',
        hintLabelAdditional: 'August 2022',
        updated: '08/31/2022',
        sourceURL:
          'https://docs.google.com/spreadsheets/d/1aR4L0VStsBrY37aRKTjlUwjQuPS3hDwdRyTwGInkRyE/edit?usp=sharing',
        source: 'IMF/WHO vaccine supply tracker',
      },
      received: {
        label: 'Doses received',
        axisLabel: 'Doses received',
        axisLabelAdditional: '(per capita)',
        hintLabel: 'Doses received (per capita)',
        hintLabelAdditional: 'September 2023',
      },
      administered: {
        label: 'Doses administered',
        axisLabel: 'Doses administered',
        axisLabelAdditional: '(per capita)',
        hintLabel: 'Doses administered (per capita)',
        hintLabelAdditional: 'September 2023',
      },
    },
    xAxisLabel: 'Country Income Groups',
  },
  {
    key: 'population-groups',
    file: 'population-groups-20230927.csv',
    country_fk: 'iso',
    metrics: {
      all: 'cov_tot_cps',
      old: 'cov_old_cps',
      hcw: 'cov_hcw_cps',
    },
    groupByColumn: 'income_group',
    maxValue: 105,
    maxSize: 1500000000,
    minDiameter: 2.6, // 2.2 - 10million
    minDiameterSmall: 2, // 2.2 - 10million
    isPercentage: true,
    yDefault: 'all',
    keyCategories: 'INCOME',
    metricOptions: ['all', 'old', 'hcw'],
    metricOptionLabel: 'Select population group',
    metricType: 'group',
    meta: {
      all: {
        axisLabel: 'Complete primary series',
        axisLabelAdditional: '(% of group)',
        hintLabel: 'Complete primary series',
        hintLabelAdditional: '% of total population',
        label: 'Total population',
        popupLabel: 'Total population',
        popColumn: 'pop',
      },
      old: {
        axisLabel: 'Complete primary series',
        axisLabelAdditional: '(% of group)',
        hintLabel: 'Complete primary series',
        hintLabelAdditional: '% of older people',
        label: 'Older people',
        popupLabel: 'Population',
        popupLabelAdditional: 'Older people',
        popColumn: 'pop_old',
      },
      hcw: {
        axisLabel: 'Complete primary series',
        axisLabelAdditional: '(% of group)',
        hintLabel: 'Complete primary series',
        hintLabelAdditional: '% of health and care workers',
        label: 'Health and care workers',
        popupLabel: 'Population',
        popupLabelAdditional: 'Health and care workers',
        popColumn: 'pop_hcw',
      },
    },
    xAxisLabel: 'Country Income Groups',
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
  INCOME_SHORT: {
    HIC: 'High Income',
    UMIC: 'Upper Middle Income',
    LMIC: 'Lower Middle Income',
    LIC: 'Low Income',
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
