// The class convention: .root -> gds-<component>, .part -> gds-<component>__part.
import { scopedName } from '../vite.config';

describe('CSS Modules class convention', () => {
  it('maps root and parts to the gds- names', () => {
    expect(scopedName('root', '/x/Button.module.css')).toBe('gds-button');
    expect(scopedName('icon', '/x/Button.module.css')).toBe('gds-button__icon');
    expect(scopedName('root', '/x/TextField.module.css')).toBe('gds-text-field');
    expect(scopedName('headerCell', '/x/Table.module.css')).toBe('gds-table__header-cell');
  });
});
