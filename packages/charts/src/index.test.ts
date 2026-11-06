import { seriesColor, estimatedSeriesOptions, referenceLine, highchartsTheme } from './index';

describe('@oef/gds-charts', () => {
  it('wraps series colours after the eighth', () => {
    expect(seriesColor(1)).toBe(highchartsTheme('light').colors[0]);
    expect(seriesColor(9)).toBe(seriesColor(1));
  });
  it('labels estimated series in words', () => {
    expect(estimatedSeriesOptions().name('Transport')).toBe('Transport (estimated)');
  });
  it('builds a reference line from the reference token', () => {
    expect(referenceLine(100, 'Target').color).toBe(highchartsTheme('light').gds.reference);
  });
});
