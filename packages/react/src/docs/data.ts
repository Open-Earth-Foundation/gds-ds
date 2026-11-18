// What the showcase pages read: the built token values and the token source files, so every page follows
// the tokens instead of repeating them.
import { cssVar, dark, light, paths } from '@open-earth-foundation/gds-tokens';
import type { TokenPath } from '@open-earth-foundation/gds-tokens';
import components from '@open-earth-foundation/gds-tokens/tokens/components.tokens.json';
import primitives from '@open-earth-foundation/gds-tokens/tokens/primitives.tokens.json';
import base from '@open-earth-foundation/gds-tokens/tokens/semantic/base.tokens.json';
import colorLight from '@open-earth-foundation/gds-tokens/tokens/semantic/color.light.tokens.json';

export const REPO = 'https://github.com/Open-Earth-Foundation/gds-ds';

type Tree = { [key: string]: unknown };

const at = (tree: unknown, path: string): unknown =>
  path
    .split('.')
    .reduce<unknown>(
      (node, key) => (node && typeof node === 'object' ? (node as Tree)[key] : undefined),
      tree,
    );

const show = (value: unknown): string => {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'object') return String(value);
  const v = value as Tree;
  if ('fontSize' in v)
    return `${String(v.fontWeight)} ${String(v.fontSize)}/${String(v.lineHeight)}`;
  return JSON.stringify(value);
};

/** Token paths under a prefix, in source order. */
export const under = (prefix: string): TokenPath[] =>
  paths.filter((p) => p === prefix || p.startsWith(`${prefix}.`));

/** A token's resolved value in one mode, as text. */
export const valueOf = (path: string, mode: 'light' | 'dark' = 'light'): string =>
  show(at(mode === 'light' ? light : dark, path));

/** `var(--gds-…)` for a path built at runtime. */
export const v = (path: string): string => cssVar(path as TokenPath);

export interface Link {
  tier: 'Component' | 'Semantic' | 'Primitive';
  path: string;
}

const SOURCES: [Link['tier'], unknown][] = [
  ['Component', components],
  ['Semantic', colorLight],
  ['Semantic', base],
  ['Primitive', primitives],
];

/** A token's references from the source files, tier by tier, down to the value (light mode). */
export function chain(path: string): { links: Link[]; value: string } {
  const links: Link[] = [];
  let current: string | undefined = path;
  while (current && links.length < 6) {
    const here: string = current;
    const found = SOURCES.map(([tier, tree]) => [tier, at(tree, here)] as const).find(
      ([, node]) => node && typeof node === 'object' && '$value' in (node as Tree),
    );
    if (!found) break;
    links.push({ tier: found[0], path: here });
    const raw = (found[1] as Tree).$value;
    current = typeof raw === 'string' ? /^\{(.+)\}$/.exec(raw)?.[1] : undefined;
  }
  return { links, value: valueOf(path) };
}
