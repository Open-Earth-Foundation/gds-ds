import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { under, v, valueOf } from './data';
import styles from './Docs.module.css';

const meta = {
  title: 'Tokens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Page = ({ title, lede, children }: { title: string; lede: string; children: ReactNode }) => (
  <main className={styles.root}>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>Tokens</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
    </header>
    {children}
  </main>
);

const Section = ({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) => (
  <section className={styles.section}>
    <h2 className={styles.heading}>{title}</h2>
    {note && <p className={styles.text}>{note}</p>}
    {children}
  </section>
);

const COLOR_ROLES: [string, string][] = [
  ['surface', 'Backgrounds, from the page up to an emphasised panel.'],
  ['text', 'Reading colours, from primary down to disabled.'],
  ['icon', 'Icons follow text, one step quieter.'],
  ['border', 'Lines, from a hairline divider to the focus ring.'],
  ['interactive', 'Anything a person can press, and its states.'],
  [
    'status',
    'Good, warning, critical, info and neutral, each as background, border, text and solid.',
  ],
  ['data', 'Charts: categorical, sequential and diverging series, axes and grid.'],
  ['ai', 'Marks content a model proposed and a person has not confirmed.'],
];

const Swatch = ({ path }: { path: string }) => {
  const light = valueOf(path, 'light');
  const dark = valueOf(path, 'dark');
  return (
    <div className={styles.swatch}>
      <span className={styles.chip} style={{ background: v(path) }} />
      <span className={styles.meta}>
        <span className={styles.name}>{path.replace(/^color\./, '')}</span>
        <span className={styles.value}>{light === dark ? light : `${light} · ${dark}`}</span>
      </span>
    </div>
  );
};

const RAMPS = ['neutral', 'blue', 'green', 'amber', 'red'];

export const Colour: Story = {
  render: () => (
    <Page
      title="Colour"
      lede="Components use roles, never a ramp step. Each role has a light and a dark value; the Theme switch in the toolbar shows both."
    >
      {COLOR_ROLES.map(([group, note]) => (
        <Section key={group} title={group[0]!.toUpperCase() + group.slice(1)} note={note}>
          <div className={styles.swatches}>
            {under(`color.${group}`).map((path) => (
              <Swatch key={path} path={path} />
            ))}
          </div>
        </Section>
      ))}
      <Section
        title="Primitive ramps"
        note="The raw steps the roles point at, 1 to 12, light above dark. These are what the GCoM brand replaces."
      >
        <div className={styles.rows}>
          {RAMPS.map((hue) => (
            <div key={hue} className={styles.row}>
              <span className={styles.name}>{hue}</span>
              <div className={styles.section}>
                {(['light', 'dark'] as const).map((mode) => (
                  <div key={mode} className={styles.ramp}>
                    {under(`color.${hue}.${mode}`).map((path) => (
                      <span
                        key={path}
                        className={styles.rampCell}
                        style={{ background: v(path) }}
                        title={`${path} ${valueOf(path)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  ),
};

const TYPE_GROUPS: [string, string][] = [
  ['display', 'Titles and labels read at a glance.'],
  ['text', 'Bodies, legends and descriptions read slowly.'],
  ['label', 'Controls: buttons, fields, badges, tabs.'],
  ['numeric', 'Figures in tables and tiles, with tabular digits.'],
  ['code', 'Token names, identifiers, counts.'],
];

const typeStyle = (path: string): CSSProperties => ({
  font: v(path),
  letterSpacing: v(`${path}.letter-spacing`),
});

export const Type: Story = {
  render: () => (
    <Page
      title="Type"
      lede="Each role sets family, size, weight, line height and letter spacing together, so a component names one role instead of five values."
    >
      {TYPE_GROUPS.map(([group, note]) => (
        <Section key={group} title={group[0]!.toUpperCase() + group.slice(1)} note={note}>
          <div className={styles.rows}>
            {under(`type.${group}`).map((path) => (
              <div key={path} className={styles.row}>
                <span className={styles.meta}>
                  <span className={styles.name}>{path}</span>
                  <span className={styles.value}>{valueOf(path)}</span>
                </span>
                <span className={styles.sample} style={typeStyle(path)}>
                  {group === 'numeric' ? '1,204,000 tCO2e' : 'Greenhouse gas inventory'}
                </span>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </Page>
  ),
};

const Rows = ({ prefix, sample }: { prefix: string; sample: (path: string) => ReactNode }) => (
  <div className={styles.rows}>
    {roles(prefix).map((path) => (
      <div key={path} className={styles.row}>
        <span className={styles.meta}>
          <span className={styles.name}>{path}</span>
          <span className={styles.value}>{valueOf(path)}</span>
        </span>
        {sample(path)}
      </div>
    ))}
  </div>
);

/** Roles only: the numbered primitive steps under the same prefix are left out. */
const roles = (prefix: string) =>
  under(prefix).filter((path) => !/\.(\d+|full)$/.test(path.slice(prefix.length)));

const bar = (path: string) => <span className={styles.bar} style={{ width: v(path) }} />;

export const SpaceAndShape: Story = {
  name: 'Space and shape',
  render: () => (
    <Page
      title="Space and shape"
      lede="Spacing, sizes, corners and elevation come in short ladders with a named job for each step."
    >
      <Section title="Inset" note="Padding inside a container.">
        <Rows prefix="space.inset" sample={bar} />
      </Section>
      <Section title="Gap" note="Distance between siblings.">
        <Rows prefix="space.gap" sample={bar} />
      </Section>
      <Section title="Control and icon sizes" note="Heights of controls and the icons inside them.">
        <Rows prefix="size.control" sample={bar} />
        <Rows prefix="size.icon" sample={bar} />
      </Section>
      <Section
        title="Radius"
        note="Buttons and badges are pills; fields and menu items use control; cards and dialogs use container."
      >
        <Rows
          prefix="radius"
          sample={(path) => <span className={styles.box} style={{ borderRadius: v(path) }} />}
        />
      </Section>
      <Section title="Elevation" note="Raised surfaces, overlays and dialogs.">
        <Rows
          prefix="elevation"
          sample={(path) => <span className={styles.box} style={{ boxShadow: v(path) }} />}
        />
      </Section>
    </Page>
  ),
};
