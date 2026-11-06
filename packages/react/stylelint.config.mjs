export default {
  plugins: ['@oef/stylelint-plugin-gds'],
  rules: {
    'gds/no-raw-values': [
      true,
      {
        // Variables Base UI sets at runtime on positioners, tabs and dialogs.
        allowVariables: [
          '--active-tab-*',
          '--anchor-*',
          '--available-*',
          '--positioner-*',
          '--transform-origin',
          '--nested-dialogs',
        ],
      },
    ],
  },
};
