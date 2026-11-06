import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';

const lint = async (code) => {
  const { results } = await stylelint.lint({
    code,
    config: { plugins: ['./index.mjs'], rules: { 'gds/no-raw-values': true } },
  });
  return results[0].warnings.map((w) => w.text);
};

describe('gds/no-raw-values', () => {
  it('accepts token-only declarations', async () => {
    const out = await lint(`.root {
      background: var(--gds-button-primary-bg);
      padding: 0 var(--gds-space-inset-md);
      border: var(--gds-border-default) solid var(--gds-color-border-default);
      height: calc(var(--gds-size-icon-md) * 2);
      width: 100%; line-height: 1; opacity: 0; flex: 1 1 auto; transform: translateY(-50%);
      transition: background var(--gds-motion-duration-state) var(--gds-motion-easing-standard);
      color: currentColor; outline-color: transparent;
    }`);
    expect(out).toEqual([]);
  });

  it('rejects raw colors, lengths, durations and foreign variables', async () => {
    const out = await lint(`.root {
      background: #fff; color: rgb(0 0 0); border-color: red;
      padding: 12px; margin: 0.5rem 0; transition: all 200ms;
      gap: var(--space-4);
    }`);
    expect(out.join('\n')).toMatch(/Raw color "#fff"/);
    expect(out.join('\n')).toMatch(/Raw color "rgb\(0 0 0\)"/);
    expect(out.join('\n')).toMatch(/Raw color "red"/);
    expect(out.join('\n')).toMatch(/Raw length "12px"/);
    expect(out.join('\n')).toMatch(/Raw length "0.5rem"/);
    expect(out.join('\n')).toMatch(/Raw duration "200ms"/);
    expect(out.join('\n')).toMatch(/"--space-4" is not a GDS variable/);
    expect(out).toHaveLength(7);
  });

  it('allows runtime variables listed in allowVariables', async () => {
    const { results } = await stylelint.lint({
      code: `.i { left: var(--active-tab-left); width: var(--other); }`,
      config: {
        plugins: ['./index.mjs'],
        rules: { 'gds/no-raw-values': [true, { allowVariables: ['--active-tab-*'] }] },
      },
    });
    expect(results[0].warnings.map((w) => w.text).join()).toMatch(/"--other" is not/);
    expect(results[0].warnings).toHaveLength(1);
  });

  it('ignores properties where a value is not a design decision', async () => {
    expect(await lint(`.a::after { content: "12px"; }`)).toEqual([]);
  });
});
