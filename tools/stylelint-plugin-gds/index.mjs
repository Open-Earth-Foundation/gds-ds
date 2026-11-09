// @open-earth-foundation/stylelint-plugin-gds
//
// gds/no-raw-values: in component stylesheets every color and every length comes from a token.
// This is the enforcement of TOKENS.md section 8 ("anyone can create an alias, nobody can create a value")
// at the point where values are used, not only where they are defined.
//
// Reports:
//   - a color literal: #hex, rgb()/hsl()/oklch()/color(), or a named color (currentColor and transparent are fine)
//   - a length with a unit: 12px, 0.5rem, 1em, 2vw... (0 is fine, unitless numbers and percentages are fine)
//   - a duration: 200ms, .3s
//   - var() whose property does not start with --gds- (except names listed in allowVariables,
//     for the variables a behavior library sets at runtime)
//
// Allowed inside calc(): the same rules apply to each operand.

import stylelint from 'stylelint';
import valueParser from 'postcss-value-parser';

const ruleName = 'gds/no-raw-values';
const messages = stylelint.utils.ruleMessages(ruleName, {
  color: (v) => `Raw color "${v}". Use a token: var(--gds-color-…) or a component alias.`,
  length: (v) =>
    `Raw length "${v}". Use a token: var(--gds-space-…), var(--gds-size-…), var(--gds-radius-…).`,
  duration: (v) => `Raw duration "${v}". Use var(--gds-motion-duration-…).`,
  foreignVar: (v) => `"${v}" is not a GDS variable. Only --gds-* custom properties are allowed.`,
});
const meta = {
  url: 'https://github.com/Open-Earth-Foundation/gds-ds/tree/main/tools/stylelint-plugin-gds',
};

const NAMED_COLORS = new Set(
  'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen'.split(
    ' ',
  ),
);
const COLOR_FUNCTIONS = new Set([
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'color',
  'color-mix',
]);
const LENGTH =
  /^[+-]?(\d*\.)?\d+(px|rem|em|ch|ex|vw|vh|vmin|vmax|cm|mm|in|pt|pc|svh|lvh|dvh|svw|lvw|dvw)$/i;
const DURATION = /^[+-]?(\d*\.)?\d+(ms|s)$/i;
const ZERO = /^[+-]?0*(\.0+)?(px|rem|em|ch|ex|vw|vh|vmin|vmax|cm|mm|in|pt|pc|ms|s)?$/i;

// Properties where a raw value is not a design decision.
const IGNORED_PROPERTIES = new Set([
  'content',
  'quotes',
  'counter-reset',
  'counter-increment',
  'font-feature-settings',
  'grid-area',
  'grid-template-areas',
]);

const rule =
  (primary, secondaryOptions = {}) =>
  (root, result) => {
    const valid = stylelint.utils.validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });
    if (!valid || !primary) return;
    const ignoreProperties = new Set([
      ...IGNORED_PROPERTIES,
      ...(secondaryOptions.ignoreProperties ?? []),
    ]);
    // Variables a behavior library sets at runtime (Base UI: --active-tab-left, --anchor-width, ...).
    const allowedVariables = (secondaryOptions.allowVariables ?? []).map((p) =>
      p instanceof RegExp
        ? p
        : new RegExp(`^${p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`),
    );

    root.walkDecls((decl) => {
      if (ignoreProperties.has(decl.prop)) return;
      // Custom property definitions in a module are themselves values; only allow them to alias tokens.
      const report = (message) =>
        stylelint.utils.report({ ruleName, result, node: decl, message, word: decl.value });

      valueParser(decl.value).walk((node) => {
        if (node.type === 'function') {
          const fn = node.value.toLowerCase();
          if (fn === 'var') {
            const name = node.nodes[0]?.value ?? '';
            if (!name.startsWith('--gds-') && !allowedVariables.some((re) => re.test(name)))
              report(messages.foreignVar(name));
            return false; // do not descend into fallbacks; the token is the value
          }
          if (fn === 'url') return false;
          if (COLOR_FUNCTIONS.has(fn)) {
            report(messages.color(valueParser.stringify(node)));
            return false;
          }
          return true; // calc(), min(), clamp(): check each operand
        }
        if (node.type !== 'word') return;
        const w = node.value;
        const lower = w.toLowerCase();
        if (/^#[0-9a-f]{3,8}$/i.test(w) || NAMED_COLORS.has(lower))
          return report(messages.color(w));
        if (ZERO.test(w)) return;
        if (LENGTH.test(w)) return report(messages.length(w));
        if (DURATION.test(w)) return report(messages.duration(w));
      });
    });
  };

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default stylelint.createPlugin(ruleName, rule);
export { ruleName, messages };
