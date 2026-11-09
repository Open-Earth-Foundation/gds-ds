# @open-earth-foundation/stylelint-plugin-gds

One rule, `gds/no-raw-values`. In a component stylesheet, every color, length and duration must come from a token, and every `var()` must name a `--gds-*` property. It is how "nobody can create a value" is enforced where values are used.

```js
// stylelint.config.mjs
export default {
  plugins: ['@open-earth-foundation/stylelint-plugin-gds'],
  rules: {
    'gds/no-raw-values': [
      true,
      {
        ignoreProperties: [],
        // Variables a behavior library sets at runtime. Base UI's are listed in packages/react.
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
```

Allowed without a token: `0`, unitless numbers (`line-height: 1`, `flex: 1`, `opacity: 0.5`), percentages, `currentColor`, `transparent`, `inherit`, keywords, and the operands of `calc()` as long as each one follows the same rules. `content`, `grid-template-areas` and a few similar properties are ignored.

If the rule blocks something real, the answer is usually a missing semantic role: add it in `packages/tokens/tokens/semantic/` with a reason, not an exception here.
