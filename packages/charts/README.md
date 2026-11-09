# @open-earth-foundation/gds-charts

The chart layer of GDS: the Highcharts theme generated from the `chart.*` tokens, plus the few conventions every chart in the service follows.

```ts
import Highcharts from 'highcharts';
import {
  highchartsTheme,
  seriesColor,
  estimatedSeriesOptions,
  referenceLine,
} from '@open-earth-foundation/gds-charts';

Highcharts.setOptions(highchartsTheme('light'));
```

- `highchartsTheme(mode)`: colours, fonts, axes, legend, tooltip from tokens. Re-apply on theme change.
- `seriesColor(n, mode)`: the nth categorical colour (eight, colour-vision safe, then wraps).
- `estimatedSeriesOptions(mode)`: dashed line, diamond markers and a "(estimated)" suffix, so an estimate never looks like a measurement.
- `referenceLine(value, label, mode)`: a target or baseline as a plot line in the reference colour.

Highcharts is a peer dependency; this package never imports it, so it stays usable with any wrapper. Chart wrappers (a bar, a line, a key-figure sparkline) are the next step once the first module needs them.
