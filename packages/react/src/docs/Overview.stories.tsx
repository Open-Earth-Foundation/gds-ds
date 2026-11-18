import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import pkg from '../../package.json';
import { Badge } from '../components/Badge/Badge';
import { Card } from '../components/Card/Card';
import { Table } from '../components/Table/Table';
import { REPO, chain } from './data';
import styles from './Docs.module.css';

const meta = {
  title: 'Overview',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Code = ({ children }: { children: ReactNode }) => (
  <code className={styles.code}>{children}</code>
);
const Out = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className={styles.link} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

interface Step {
  name: string;
  text: ReactNode;
}
const Flow = ({ steps }: { steps: Step[] }) => (
  <div className={styles.flow}>
    {steps.flatMap((step, i) => [
      i > 0 && (
        <span key={`arrow-${step.name}`} className={styles.arrow} aria-hidden>
          →
        </span>
      ),
      <div key={step.name} className={styles.step}>
        <p className={styles.stepName}>{step.name}</p>
        <p className={styles.stepText}>{step.text}</p>
      </div>,
    ])}
  </div>
);

const PACKAGES = [
  {
    eyebrow: 'Tokens',
    title: 'gds-tokens',
    text: 'The token source files, the rules and the checker, and what the build generates from them: CSS variables, TypeScript constants, Figma variables and a Highcharts theme.',
  },
  {
    eyebrow: 'Components',
    title: 'gds-react',
    text: 'Button, TextField, Checkbox, RadioGroup, Switch, Tabs, Card, Badge, Alert, Dialog, Table, Tooltip, KeyFigure and AppShell. Behavior from Base UI, every visual value from a token.',
  },
  {
    eyebrow: 'Charts',
    title: 'gds-charts',
    text: 'The Highcharts theme and the conventions every chart follows: series order, estimated values, reference lines.',
  },
];

export const Welcome: Story = {
  render: () => (
    <main className={styles.root}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>GCoM Digital Service</p>
        <h1 className={styles.title}>GDS design system</h1>
        <p className={styles.lede}>
          One token source and one set of components, built so that every module of the Digital
          Service reads as one service, and so that the GCoM brand lands as a change of values, not
          a redesign.
        </p>
        <div className={styles.badges}>
          <Badge kind="info">Version {pkg.version}</Badge>
          <Badge kind="warning">Placeholder brand</Badge>
          <Badge kind="neutral">MIT</Badge>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.heading}>What is in it</h2>
        <div className={styles.grid}>
          {PACKAGES.map((p) => (
            <Card key={p.title} eyebrow={p.eyebrow} title={p.title}>
              <p className={styles.stepText}>{p.text}</p>
            </Card>
          ))}
        </div>
        <p className={styles.text}>
          Every component, with each variant and state, is in the sidebar under Core, Data and
          Shell. The Theme switch in the toolbar shows any page in light or dark.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Use it in an app</h2>
        <pre className={styles.pre}>
          {[
            "import '@open-earth-foundation/gds-tokens/css'; // --gds-* variables, light and dark",
            "import '@open-earth-foundation/gds-react/styles.css'; // component styles",
            "import { Button, TextField } from '@open-earth-foundation/gds-react';",
          ].join('\n')}
        </pre>
        <p className={styles.text}>
          The packages are on GitHub Packages. Dark mode follows the reader&apos;s system setting;{' '}
          <Code>data-theme</Code> on the root element forces one. Installing is described in{' '}
          <Out href={`${REPO}/blob/main/docs/releasing.md`}>docs/releasing.md</Out>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Where it stands</h2>
        <p className={styles.text}>
          The colours and typefaces shown here are placeholders (Radix Colors, Okabe-Ito, system
          fonts). The GCoM brand replaces the primitive values only: the roles, the components and
          every screen built on them stay as they are.
        </p>
        <p className={styles.text}>
          <Out href={REPO}>The repository</Out> ·{' '}
          <Out href={`${REPO}/blob/main/packages/tokens/TOKENS.md`}>Token rules</Out> ·{' '}
          <Out href={`${REPO}/blob/main/docs/component-conventions.md`}>Component conventions</Out>{' '}
          · <Out href={`${REPO}/blob/main/CONTRIBUTING.md`}>Contributing</Out>
        </p>
      </section>
    </main>
  ),
};

const CHAINS = ['button.primary.bg', 'input.radius', 'card.padding', 'badge.good.fg'];

export const Architecture: Story = {
  render: () => (
    <main className={styles.root}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Overview</p>
        <h1 className={styles.title}>Architecture</h1>
        <p className={styles.lede}>
          Three tiers of tokens, components that read only the upper two, and a build that fails
          when either rule is broken.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.heading}>Three tiers of tokens</h2>
        <Flow
          steps={[
            {
              name: '1 · Primitives',
              text: 'Raw values: colour ramps, sizes, font families. The only thing a brand replaces.',
            },
            {
              name: '2 · Semantic roles',
              text: 'A job, not a value: surface.base, text.secondary, space.inset.md. Roles come in ladders, so "a bit darker" has one answer everywhere. Light and dark live here.',
            },
            {
              name: '3 · Component aliases',
              text: 'button.primary.bg, input.radius. They point at roles, never at values.',
            },
            {
              name: 'Component styles',
              text: 'Read aliases first, roles when no alias exists, never a primitive and never a literal.',
            },
          ]}
        />
        <p className={styles.text}>
          The rule in one sentence:{' '}
          <strong>anyone can create an alias, nobody can create a value.</strong>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Follow a token</h2>
        <p className={styles.text}>
          Read from the token source files as they are now, in light mode.
        </p>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Component alias</Table.HeaderCell>
              <Table.HeaderCell>Semantic role</Table.HeaderCell>
              <Table.HeaderCell>Primitive</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {CHAINS.map((path) => {
              const { links, value } = chain(path);
              const of = (tier: string) =>
                links
                  .filter((l) => l.tier === tier)
                  .map((l) => l.path)
                  .join(' → ');
              return (
                <Table.Row key={path}>
                  <Table.Cell>
                    <Code>{of('Component')}</Code>
                  </Table.Cell>
                  <Table.Cell>
                    <Code>{of('Semantic')}</Code>
                  </Table.Cell>
                  <Table.Cell>
                    <Code>{of('Primitive')}</Code>
                  </Table.Cell>
                  <Table.Cell>
                    <Code>{value}</Code>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>From the token files to an app</h2>
        <Flow
          steps={[
            {
              name: 'Token files',
              text: 'W3C design-token JSON: primitives, semantic (base, light, dark), components.',
            },
            {
              name: 'Check and build',
              text: 'Tiers, light and dark parity, naming and contrast are checked, then the outputs are generated.',
            },
            {
              name: 'Outputs',
              text: 'variables.css, TypeScript constants, Figma variables, Highcharts theme.',
            },
            {
              name: 'Components and charts',
              text: 'gds-react on Base UI with CSS Modules; gds-charts on the Highcharts theme.',
            },
            {
              name: 'Apps',
              text: 'The Digital Service modules, and the Prototype Lab where ideas are tried first.',
            },
          ]}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>How a component is put together</h2>
        <p className={styles.text}>
          Behavior (keyboard, focus, ARIA, open and close) comes from a Base UI primitive and is
          never re-implemented. Looks come from tokens. The DOM, the stylesheet and the Figma file
          use the same names.
        </p>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Thing</Table.HeaderCell>
              <Table.HeaderCell>Convention</Table.HeaderCell>
              <Table.HeaderCell>Example</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {[
              ['Root', 'gds-<component>', 'gds-button, gds-text-field'],
              ['Part', 'gds-<component>__<part>', 'gds-button__icon, gds-card__footer'],
              ['Variant, size, kind', 'data attribute set by a prop', 'data-variant="secondary"'],
              ['State', "Base UI's own attribute", 'data-disabled, data-checked, data-open'],
              ['Focus', 'one global :focus-visible rule', 'the same ring on everything'],
            ].map(([thing, convention, example]) => (
              <Table.Row key={thing}>
                <Table.Cell>{thing}</Table.Cell>
                <Table.Cell>
                  <Code>{convention}</Code>
                </Table.Cell>
                <Table.Cell>
                  <Code>{example}</Code>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>What fails the build</h2>
        <ul className={styles.list}>
          <li>
            A raw value outside the primitives, a token that references the wrong tier, or a role
            that exists in light but not in dark.
          </li>
          <li>A raw colour, length or duration in a component stylesheet.</li>
          <li>A contrast ratio below the rule for its ramp step.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>How a change becomes a version</h2>
        <Flow
          steps={[
            { name: 'Pull request', text: 'The change, its reason, and a changeset.' },
            { name: 'Merge', text: 'Nothing is versioned yet.' },
            {
              name: 'Version packages',
              text: 'A pull request the release workflow keeps up to date: version bumps and changelogs for the three packages together.',
            },
            {
              name: 'Release',
              text: 'Merging it tags the commit and publishes the packages.',
            },
          ]}
        />
      </section>
    </main>
  ),
};
