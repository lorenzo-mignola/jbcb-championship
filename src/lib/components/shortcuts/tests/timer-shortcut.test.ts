import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import PlayPauseButton from
  '$routes/categories/[category_id]/match/[match_id]/components/play-pause-button.svelte';

import { osaekomiState } from '../../../state/match/osaekomi-state.svelte';

describe('timer shortcut', () => {
  it('should play/stop the button', async () => {
    const user = userEvent.setup();
    render(PlayPauseButton);

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');

    // play
    await user.keyboard(' ');

    expect(playPauseButton.classList).toContain('stop');

    // stop
    await user.keyboard(' ');
    expect(playPauseButton.classList).toContain('play');
  });

  it('should not allow play/stop when disabled', async () => {
    const user = userEvent.setup();

    render(PlayPauseButton);
    osaekomiState.isExtraTime = true;

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');

    // play
    await user.keyboard(' ');

    expect(playPauseButton.classList).not.toContain('stop');
  });
});
