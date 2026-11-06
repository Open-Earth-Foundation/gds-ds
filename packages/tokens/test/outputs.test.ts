// Runs against dist/: `pnpm build` first. CI does.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { light, dark, cssVar, paths } from '../dist/tokens.js';
import { highchartsTheme } from '../dist/highcharts.js';

const css = readFileSync(new URL('../dist/variables.css', import.meta.url), 'utf8');

const flatten = (o: object, p: string[] = []): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' && !('fontFamily' in v)
      ? flatten(v, [...p, k])
      : [[...p, k].join('.')],
  );

describe('generated outputs', () => {
  it('light and dark have the same paths', () => {
    expect(flatten(light)).toEqual(flatten(dark));
    expect(paths.length).toBe(flatten(light).length);
  });

  it('every custom property carries the gds prefix', () => {
    const names = css.match(/^\s*--[\w-]+(?=:)/gm) ?? [];
    expect(names.length).toBeGreaterThan(400);
    for (const n of names) expect(n.trim().startsWith('--gds-')).toBe(true);
  });

  it('dark mode only overrides what changes', () => {
    const darkBlock = css.split(':root[data-theme="dark"]')[1]!.split('}')[0]!;
    expect(darkBlock).toContain('--gds-color-surface-base: #111111');
    expect(darkBlock).not.toContain('--gds-space-');
    expect(darkBlock).not.toContain('--gds-radius-');
  });

  it('cssVar derives the property name from the path', () => {
    expect(cssVar('color.surface.base')).toBe('var(--gds-color-surface-base)');
    expect(cssVar('button.primary.bg-hover')).toBe('var(--gds-button-primary-bg-hover)');
  });

  it('highcharts theme reads the categorical ramp', () => {
    expect(highchartsTheme('light').colors).toHaveLength(8);
    expect(highchartsTheme('dark').chart.backgroundColor).toBe(dark.color.surface.base);
  });
});
