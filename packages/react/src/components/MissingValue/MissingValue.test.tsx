import { render, screen } from '@testing-library/react';
import { MissingValue } from './MissingValue';

describe('MissingValue', () => {
  it('defaults to "not estimated", with the GPC notation key in the title', () => {
    const { container } = render(<MissingValue />);
    const root = container.firstElementChild!;
    expect(screen.getByText('not estimated')).toBeInTheDocument();
    expect(root).toHaveAttribute('data-reason', 'not-estimated');
    expect(root).toHaveAttribute('title', 'not estimated (NE)');
  });

  it('hides the dash from assistive technology so only the word is read', () => {
    const { container } = render(<MissingValue reason="pending" />);
    expect(container.querySelector('[aria-hidden]')).toHaveTextContent('—');
    expect(container.firstElementChild).toHaveTextContent('—pending');
    expect(container.firstElementChild).not.toHaveAttribute('title');
  });

  it.each([
    ['not-occurring', 'not occurring', 'NO'],
    ['included-elsewhere', 'included elsewhere', 'IE'],
    ['confidential', 'confidential', 'C'],
  ] as const)('maps %s to its word and notation key', (reason, word, key) => {
    const { container } = render(<MissingValue reason={reason} />);
    expect(screen.getByText(word)).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute('title', `${word} (${key})`);
  });

  it('accepts a translated label in place of the default word', () => {
    render(<MissingValue reason="not-estimated">no estimado</MissingValue>);
    expect(screen.getByText('no estimado')).toBeInTheDocument();
    expect(screen.queryByText('not estimated')).not.toBeInTheDocument();
  });
});
