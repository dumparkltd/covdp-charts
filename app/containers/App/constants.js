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
  VAX_SUPPLY_MEDIAN: 'vaccine-supply-median',
  // vaccine supply by income group for each country: beeswarm plots
  // indicators (select one):
  // - secured: secured_vaccines_pc
  // - received: del_dose_add_pc
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
  POP_GROUPS_MEDIAN: 'population-groups-median',
  POP_GROUPS_ALT: 'population-groups-alt',
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
    key: 'doses-delivered',
    file: 'doses-delivered.csv',
    xAxisLabel: 'Time',
    yAxisLabel: 'Doses received',
    yAxisLabelAdditional: '(per capita)',
    group_fk: 'income_group',
    metrics: {
      mean: 'del_dose_add_pc',
    },
    keyCategories: 'INCOME_GROUP',
  },
  {
    key: 'doses-delivered-median',
    file: 'doses-delivered.csv',
    xAxisLabel: 'Time',
    yAxisLabel: 'Doses received',
    yAxisLabelAdditional: '(per capita)',
    group_fk: 'income_group',
    metrics: {
      mean: 'del_dose_add_pc',
      median: 'del_dose_add_pc_0.5',
      lower: 'del_dose_add_pc_0.25',
      upper: 'del_dose_add_pc_0.75',
    },
    keyCategories: 'INCOME_GROUP',
    labelPositions: {
      HIC: 'center',
      UMIC: 'top',
      LMIC: 'bottom',
      LIC: 'center',
    },
    metricOptions: ['mean', 'median'],
    metricOptionLabel: 'Select country group average',
    meta: {
      mean: {
        label: 'Weighted (by population)',
      },
      median: {
        label: 'Median (middle value)',
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
    hint: [
      {
        label: 'Peak daily vaccination rate (% of population)',
        column: 'dvr_4wk_td_per',
        unit: '%',
        roundDigits: 2,
      },
      {
        label: 'Peak daily doses administered (4-week average)',
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
    file: 'uhc-coverage.csv',
    country_fk: 'iso',
    type: 'scatter',
    metrics: {
      uhc: 'uhc_sci',
      one_dose_2021: 'cov_total_a1d_2021',
      one_dose_2022: 'cov_total_a1d_2022',
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
        date: '06/2021',
        label: 'June 2021',
      },
      one_dose_2022: {
        date: '06/2022',
        label: 'June 2022',
      },
    },
    xAxisLabel: 'Universal Health Coverage index (2021)',
    yAxisLabel: 'Individuals with at least one dose',
    yAxisLabelAdditional: '(% of population)',
  },
  {
    key: 'vaccine-supply',
    file: 'vaccine-supply.csv',
    country_fk: 'iso',
    metrics: {
      secured: 'secured_vaccines_pc',
      received: 'del_dose_add_pc',
      administered: 'adm_td_add_pc',
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
        axisLabel: 'Doses secured',
        axisLabelAdditional: '(per capita)',
        label: 'Doses secured',
        updated: '08/31/2022',
        sourceURL:
          'https://docs.google.com/spreadsheets/d/1aR4L0VStsBrY37aRKTjlUwjQuPS3hDwdRyTwGInkRyE/edit?usp=sharing',
        source: 'IMF/WHO vaccine supply tracker',
      },
      received: {
        axisLabel: 'Doses received',
        axisLabelAdditional: '(per capita)',
        label: 'Doses received',
      },
      administered: {
        axisLabel: 'Doses administered',
        axisLabelAdditional: '(per capita)',
        label: 'Doses administered',
      },
    },
    xAxisLabel: 'Country Income Groups',
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
    groupByColumn: 'income_group',
    maxValue: 105,
    maxSize: 1500000000,
    minDiameter: 2.6, // 2.2 - 10million
    minDiameterSmall: 2, // 2.2 - 10million
    isPercentage: true,
    yDefault: 'all',
    keyCategories: 'INCOME',
    metricOptions: ['all', 'old', 'hcw'],
    metricOptionLabel: 'Select group',
    metricType: 'group',
    medianPosition: {
      UMIC: 'end',
      LMIC: 'end',
      LIC: 'end',
    },
    meta: {
      all: {
        axisLabel: 'Complete primary series',
        axisLabelAdditional: '(% of group)',
        hintLabel: 'Complete primary series (% of all people)',
        label: 'All people',
        popColumn: 'pop',
      },
      old: {
        axisLabel: 'Complete primary series',
        axisLabelAdditional: '(% of group)',
        hintLabel: 'Complete primary series (% of older adults)',
        label: 'Older adults',
        popColumn: 'pop_older',
      },
      hcw: {
        axisLabel: 'Complete primary series',
        axisLabelAdditional: '(% of group)',
        hintLabel: 'Complete primary series (% of healthcare workers)',
        label: 'Healthcare workers',
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
  INCOME_GROUP: {
    HIC: 'High Income Country Group',
    UMIC: 'Upper Middle Income Country Group',
    LMIC: 'Lower Middle Income Country Group',
    LIC: 'Low Income Country Group',
  },
  INCOME_GROUP_SHORT: {
    HIC: 'High Income Group',
    UMIC: 'Upper Middle Income Group',
    LMIC: 'Lower Middle Income Group',
    LIC: 'Low Income Group',
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
