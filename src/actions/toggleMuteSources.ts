import type { PulseAudio } from 'pulseaudio.js';

import type { CompanionActionDefinition } from '@companion-module/base';

import type { PulseAudioSource, SourceParams } from '../models';
import { generateSourceDropdown } from '../options';
import { standardAction, applyToMatches } from './standardAction';

const toggleMuteSources = (
    client: PulseAudio,
    sources: PulseAudioSource[],
): CompanionActionDefinition => standardAction<SourceParams>({
    name: 'Toggle Mute State for Sources',
    options: [generateSourceDropdown(sources)],
    onEvent: async ({ sourceIDs }) => applyToMatches(
        sources,
        ({ name }) => name,
        sourceIDs,
        ({ name, mute }) => client.setSourceMute(!mute, name),
    ),
});

export default toggleMuteSources;
