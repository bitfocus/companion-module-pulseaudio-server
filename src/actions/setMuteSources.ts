import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
    DropdownChoiceId,
} from '@companion-module/base';

import type { PulseAudioSource } from '../models';
import { generateSourceDropdown } from '../options';

const setMuteSources = (
    client: PulseAudio,
    sources: PulseAudioSource[],
): CompanionActionDefinition => ({
    name: 'Set Mute State for Sources',
    options: [
        {
            id: 'muteState',
            type: 'checkbox',
            label: 'Set Muted',
            default: true,
        },
        generateSourceDropdown(sources),
    ],
    callback: async ({ options }) => {
        const sourceIDs = options.sourceIDs as DropdownChoiceId[]
        const muteState = options.muteState as boolean;
        await Promise.all(
            sourceIDs.map((
                sourceID: DropdownChoiceId,
            ) => client.setSourceMute(muteState, sourceID))
        );
    }
});

export default setMuteSources;
