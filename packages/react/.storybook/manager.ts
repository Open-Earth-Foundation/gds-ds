import { addons } from 'storybook/manager-api';
import { CURRENT_STORY_WAS_SET, STORY_CHANGED } from 'storybook/internal/core-events';
import { create } from 'storybook/theming';

// The published Storybook is the design system's public site: name it and link it to the repository.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'GDS design system',
    brandUrl: 'https://github.com/Open-Earth-Foundation/gds-ds',
    brandTarget: '_blank',
  }),
});

// The Overview and Tokens pages have no controls: give them the whole pane. Components keep the panel.
const isPage = (storyId?: string) => /^(overview|tokens)--/.test(storyId ?? '');
addons.register('gds/showcase', (api) => {
  const sync = () => api.togglePanel(!isPage(api.getUrlState().storyId));
  api.on(CURRENT_STORY_WAS_SET, sync);
  api.on(STORY_CHANGED, sync);
});
