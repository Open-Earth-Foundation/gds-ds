// GDS token build. Reads the DTCG files in ../tokens, resolves references with Style Dictionary,
// and writes every output the rest of the system consumes:
//
//   dist/variables.css        CSS custom properties, light in :root, dark under [data-theme="dark"]
//                             and prefers-color-scheme. Prefix --gds- is added here, never in the files.
//   dist/tokens.ts (-> .js)   Resolved values for light and dark, plus cssVar('color.surface.base').
//   dist/highcharts.ts        Highcharts theme objects for light and dark, built from chart.* tokens.
//   dist/figma.variables.json Variable collections for the Figma import: Primitives (light/dark modes),
//                             Semantic (aliases into Primitives), Component (aliases into Semantic).
//
// `node build/build.mjs --dry-run` resolves everything and writes nothing (used as the lint step).

import StyleDictionary from 'style-dictionary';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = path.resolve(here, '..');
const tokensDir = path.join(pkg, 'tokens');
const dist = path.join(pkg, 'dist');
const dryRun = process.argv.includes('--dry-run');

const PREFIX = 'gds';
const REM_PX = 16;

// ---------- load and resolve ----------

async function dictionary(mode) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent', warnings: 'error' },
    // File-level $schema and $description are valid DTCG but Style Dictionary would merge them
    // as colliding root keys; drop them before the merge.
    parsers: ['dtcg-file-metadata'],
    hooks: {
      parsers: {
        'dtcg-file-metadata': {
          pattern: /\.tokens\.json$/,
          parser: ({ contents }) => {
            const json = JSON.parse(contents);
            delete json.$schema;
            delete json.$description;
            return json;
          },
        },
      },
    },
    source: [
      path.join(tokensDir, 'primitives.tokens.json'),
      path.join(tokensDir, 'semantic/base.tokens.json'),
      path.join(tokensDir, `semantic/color.${mode}.tokens.json`),
      path.join(tokensDir, 'components.tokens.json'),
    ],
    platforms: { resolved: { transforms: [] } },
  });
  await sd.hasInitialized;
  const { allTokens } = await sd.getPlatformTokens('resolved');
  return allTokens.map((t) => ({
    path: t.path,
    dotted: t.path.join('.'),
    type: t.$type ?? t.type,
    value: t.$value ?? t.value,
    original: t.original?.$value ?? t.original?.value,
    description: t.$description ?? t.original?.$description,
    tier: tierOf(t.filePath),
  }));
}

function tierOf(filePath) {
  if (filePath.endsWith('primitives.tokens.json')) return 1;
  if (filePath.endsWith('components.tokens.json')) return 3;
  return 2;
}

// ---------- value serialisation ----------

const dim = (v) => (typeof v === 'object' && v !== null ? `${v.value}${v.unit}` : String(v));
const px = (v) =>
  typeof v === 'object' && v !== null ? (v.unit === 'rem' ? v.value * REM_PX : v.value) : Number(v);
const fontFamily = (v) =>
  (Array.isArray(v) ? v : [v]).map((f) => (/[^a-z0-9-]/i.test(f) ? `"${f}"` : f)).join(', ');
const bezier = (v) => `cubic-bezier(${v.join(', ')})`;
const shadow = (v) =>
  (Array.isArray(v) ? v : [v])
    .map(
      (s) =>
        `${s.inset ? 'inset ' : ''}${dim(s.offsetX)} ${dim(s.offsetY)} ${dim(s.blur)} ${dim(
          s.spread ?? { value: 0, unit: 'px' },
        )} ${s.color}`,
    )
    .join(', ');

// One token can become several CSS declarations (typography) or exactly one.
function cssDeclarations(t) {
  const name = `--${PREFIX}-${t.path.join('-')}`;
  const v = t.value;
  switch (t.type) {
    case 'color':
      return [[name, v]];
    case 'dimension':
      return [[name, dim(v)]];
    case 'duration':
      return [[name, dim(v)]];
    case 'cubicBezier':
      return [[name, bezier(v)]];
    case 'fontFamily':
      return [[name, fontFamily(v)]];
    case 'fontWeight':
    case 'number':
      return [[name, String(v)]];
    case 'shadow':
      return [[name, shadow(v)]];
    case 'typography': {
      const family = fontFamily(v.fontFamily);
      const size = dim(v.fontSize);
      const lh = typeof v.lineHeight === 'object' ? dim(v.lineHeight) : String(v.lineHeight);
      return [
        [name, `${v.fontWeight} ${size}/${lh} ${family}`],
        [`${name}-font-family`, family],
        [`${name}-font-size`, size],
        [`${name}-font-weight`, String(v.fontWeight)],
        [`${name}-line-height`, lh],
        [`${name}-letter-spacing`, dim(v.letterSpacing ?? { value: 0, unit: 'rem' })],
      ];
    }
    default:
      throw new Error(`No CSS serialisation for $type "${t.type}" at ${t.dotted}`);
  }
}

// ---------- outputs ----------

function cssFile(light, dark) {
  const lightDecl = light.flatMap(cssDeclarations);
  const lightMap = new Map(lightDecl);
  const darkDiff = dark.flatMap(cssDeclarations).filter(([k, v]) => lightMap.get(k) !== v);
  const block = (decls, indent = '  ') => decls.map(([k, v]) => `${indent}${k}: ${v};`).join('\n');
  return `/* Generated by @open-earth-foundation/gds-tokens from tokens/*.tokens.json. Do not edit; change the source and rebuild. */

:root {
${block(lightDecl)}
}

:root[data-theme="dark"] {
${block(darkDiff)}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${block(darkDiff, '    ')}
  }
}
`;
}

function jsValue(t) {
  const v = t.value;
  switch (t.type) {
    case 'color':
    case 'fontWeight':
    case 'number':
      return v;
    case 'dimension':
    case 'duration':
      return dim(v);
    case 'cubicBezier':
      return bezier(v);
    case 'fontFamily':
      return fontFamily(v);
    case 'shadow':
      return shadow(v);
    case 'typography':
      return {
        fontFamily: fontFamily(v.fontFamily),
        fontSize: dim(v.fontSize),
        fontWeight: v.fontWeight,
        lineHeight: typeof v.lineHeight === 'object' ? dim(v.lineHeight) : v.lineHeight,
        letterSpacing: dim(v.letterSpacing ?? { value: 0, unit: 'rem' }),
      };
    default:
      throw new Error(`No JS value for $type "${t.type}" at ${t.dotted}`);
  }
}

function nest(tokens) {
  const out = {};
  for (const t of tokens) {
    let node = out;
    t.path.forEach((seg, i) => {
      if (i === t.path.length - 1) node[seg] = jsValue(t);
      else node = node[seg] ??= {};
    });
  }
  return out;
}

function tsFile(light, dark) {
  const paths = light.map((t) => t.dotted);
  return `// Generated by @open-earth-foundation/gds-tokens. Do not edit.

export type TokenPath =
${paths.map((p) => `  | '${p}'`).join('\n')};

/** Resolved values, light mode. */
export const light = ${JSON.stringify(nest(light), null, 2)} as const;

/** Resolved values, dark mode. Same shape as light. */
export const dark = ${JSON.stringify(nest(dark), null, 2)} as const;

export const tokens = { light, dark } as const;

/** The CSS custom property for a token path: cssVar('color.surface.base') === 'var(--${PREFIX}-color-surface-base)'. */
export function cssVar(path: TokenPath): string {
  return \`var(--${PREFIX}-\${path.replace(/\\./g, '-')})\`;
}

/** Every token path, in source order. */
export const paths: readonly TokenPath[] = ${JSON.stringify(paths)};
`;
}

function highchartsFile(light, dark) {
  const theme = (tokens) => {
    const get = (p) => {
      const t = tokens.find((x) => x.dotted === p);
      if (!t) throw new Error(`Highcharts theme needs token ${p}`);
      return jsValue(t);
    };
    const label = get('chart.label-type');
    return {
      colors: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => get(`chart.series.${i}`)),
      chart: {
        backgroundColor: get('color.surface.base'),
        style: { fontFamily: get('type.text.md').fontFamily, color: get('color.text.primary') },
      },
      title: { style: { color: get('color.text.primary') } },
      subtitle: { style: { color: get('color.text.secondary') } },
      xAxis: {
        lineColor: get('chart.axis'),
        tickColor: get('chart.axis'),
        gridLineColor: get('chart.grid'),
        labels: { style: { color: get('chart.label'), fontSize: label.fontSize } },
        title: { style: { color: get('color.text.secondary') } },
      },
      yAxis: {
        lineColor: get('chart.axis'),
        tickColor: get('chart.axis'),
        gridLineColor: get('chart.grid'),
        labels: { style: { color: get('chart.label'), fontSize: label.fontSize } },
        title: { style: { color: get('color.text.secondary') } },
      },
      legend: {
        itemStyle: { color: get('color.text.secondary'), fontWeight: 'normal' },
        itemHoverStyle: { color: get('color.text.primary') },
        itemHiddenStyle: { color: get('color.text.disabled') },
      },
      tooltip: {
        backgroundColor: get('chart.tooltip-bg'),
        borderWidth: 0,
        style: { color: get('chart.tooltip-fg') },
      },
      plotOptions: {
        series: {
          borderColor: get('color.surface.base'),
          dataLabels: { style: { color: get('color.text.primary') } },
        },
      },
      credits: { enabled: false },
      // Non-Highcharts extras components read from the same object.
      gds: { reference: get('chart.reference'), estimated: get('chart.estimated') },
    };
  };
  return `// Generated by @open-earth-foundation/gds-tokens. Do not edit. Pass to Highcharts.setOptions() or merge per chart.

export const highchartsLight = ${JSON.stringify(theme(light), null, 2)} as const;

export const highchartsDark = ${JSON.stringify(theme(dark), null, 2)} as const;

export function highchartsTheme(mode: 'light' | 'dark' = 'light') {
  return mode === 'dark' ? highchartsDark : highchartsLight;
}
`;
}

function figmaFile(light, dark) {
  const figmaType = (t) =>
    t.type === 'color'
      ? 'COLOR'
      : ['dimension', 'duration', 'number', 'fontWeight'].includes(t.type)
        ? 'FLOAT'
        : t.type === 'fontFamily'
          ? 'STRING'
          : null;
  const figmaValue = (t) => {
    if (t.type === 'color') return t.value;
    if (t.type === 'dimension') return px(t.value);
    if (t.type === 'duration') return t.value.value;
    if (t.type === 'fontFamily') return (Array.isArray(t.value) ? t.value : [t.value])[0];
    return t.value;
  };
  const slash = (p) => p.join('/');
  const refOf = (original) =>
    typeof original === 'string' ? original.match(/^\{(.+)\}$/)?.[1] : null;
  const darkByPath = new Map(dark.map((t) => [t.dotted, t]));

  // Primitives: collapse the explicit mode segment (color.neutral.light.1 -> color/neutral/1).
  const primitives = new Map();
  for (const t of light.filter((x) => x.tier === 1)) {
    const type = figmaType(t);
    if (!type) continue;
    const modeIdx = t.path.findIndex((s) => s === 'light' || s === 'dark');
    const key = modeIdx === -1 ? slash(t.path) : slash(t.path.filter((_, i) => i !== modeIdx));
    const entry = primitives.get(key) ?? { name: key, type, values: {} };
    if (modeIdx === -1) {
      entry.values.light = figmaValue(t);
      entry.values.dark = figmaValue(t);
    } else {
      entry.values[t.path[modeIdx]] = figmaValue(t);
    }
    if (t.description) entry.description = t.description;
    primitives.set(key, entry);
  }
  const primitiveKey = (dotted) => {
    const parts = dotted.split('.');
    return slash(parts.filter((s) => s !== 'light' && s !== 'dark'));
  };

  const semantic = light
    .filter((x) => x.tier === 2 && figmaType(x))
    .map((t) => {
      const d = darkByPath.get(t.dotted);
      const lr = refOf(t.original);
      const dr = refOf(d?.original);
      const entry = { name: slash(t.path), type: figmaType(t) };
      if (lr && dr)
        entry.alias = {
          light: `Primitives:${primitiveKey(lr)}`,
          dark: `Primitives:${primitiveKey(dr)}`,
        };
      else entry.values = { light: figmaValue(t), dark: figmaValue(d ?? t) };
      if (t.description) entry.description = t.description;
      return entry;
    });

  const component = light
    .filter((x) => x.tier === 3 && figmaType(x))
    .map((t) => {
      const r = refOf(t.original);
      const entry = { name: slash(t.path), type: figmaType(t) };
      if (r) entry.alias = { default: `Semantic:${r.replace(/\./g, '/')}` };
      else entry.values = { default: figmaValue(t) };
      if (t.description) entry.description = t.description;
      return entry;
    });

  // Composite tokens are Figma styles, not variables.
  const styles = {
    typography: Object.fromEntries(
      light.filter((x) => x.type === 'typography').map((t) => [slash(t.path), jsValue(t)]),
    ),
    shadow: Object.fromEntries(
      light.filter((x) => x.type === 'shadow').map((t) => [slash(t.path), t.value]),
    ),
  };

  return JSON.stringify(
    {
      $comment:
        'Generated by @open-earth-foundation/gds-tokens. FLOAT dimensions are in px (rem x 16). Composite tokens are listed under styles.',
      collections: [
        { name: 'Primitives', modes: ['light', 'dark'], variables: [...primitives.values()] },
        { name: 'Semantic', modes: ['light', 'dark'], variables: semantic },
        { name: 'Component', modes: ['default'], variables: component },
      ],
      styles,
    },
    null,
    2,
  );
}

// ---------- run ----------

const [light, dark] = await Promise.all([dictionary('light'), dictionary('dark')]);

const lightPaths = new Set(light.map((t) => t.dotted));
for (const t of dark)
  if (!lightPaths.has(t.dotted)) throw new Error(`dark has ${t.dotted}, light does not`);
if (light.length !== dark.length)
  throw new Error('light and dark resolve to different token counts');

const outputs = {
  'variables.css': cssFile(light, dark),
  'tokens.ts': tsFile(light, dark),
  'highcharts.ts': highchartsFile(light, dark),
  'figma.variables.json': figmaFile(light, dark),
};

if (dryRun) {
  console.log(
    `ok: ${light.length} tokens resolve in both modes; ${Object.keys(outputs).length} outputs would be written`,
  );
} else {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  for (const [file, content] of Object.entries(outputs))
    await writeFile(path.join(dist, file), content);
  console.log(`wrote ${Object.keys(outputs).join(', ')} to dist/ (${light.length} tokens)`);
}
