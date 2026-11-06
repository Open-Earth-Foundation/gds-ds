// @oef/gds-charts. The Highcharts theme is generated in @oef/gds-tokens; this package adds the
// conventions every chart in the service follows (principle 6: absence of data is visible).
import { highchartsTheme, highchartsLight } from '@oef/gds-tokens/highcharts';

export { highchartsTheme };
export type GdsHighchartsTheme = typeof highchartsLight;

export type ChartMode = 'light' | 'dark';

/** Series colour n (1-based) from the categorical ramp, wrapping after eight. */
export function seriesColor(n: number, mode: ChartMode = 'light'): string {
  const colors = highchartsTheme(mode).colors;
  return colors[(n - 1) % colors.length] as string;
}

/** Style for a value that is estimated rather than reported: same hue, hatched, labelled. */
export function estimatedSeriesOptions(mode: ChartMode = 'light') {
  const t = highchartsTheme(mode);
  return {
    dashStyle: 'ShortDash' as const,
    color: t.gds.estimated,
    marker: { symbol: 'diamond' as const },
    // A reader must be able to tell the series is estimated without colour (principle 5).
    name: (name: string) => `${name} (estimated)`,
  };
}

/** A reference line (a target, a baseline year) in the reference colour. */
export function referenceLine(value: number, label: string, mode: ChartMode = 'light') {
  const t = highchartsTheme(mode);
  return {
    value,
    color: t.gds.reference,
    width: 1,
    dashStyle: 'Dash' as const,
    zIndex: 3,
    label: { text: label, style: { color: t.chart.style.color } },
  };
}
