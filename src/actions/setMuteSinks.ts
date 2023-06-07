import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
    DropdownChoiceId,
} from '@companion-module/base';

import type { PulseAudioSink } from '../models';
import { generateSinkDropdown } from '../options';

const setMuteSinks = (
    client: PulseAudio,
    sinks: PulseAudioSink[],
): CompanionActionDefinition => ({
    name: 'Set Mute State for Sinks',
    options: [{
        id: 'muteState',
        type: 'checkbox',
        label: 'Set Muted',
        default: true,
    },
    generateSinkDropdown(sinks),
    ],
    callback: async ({ options }) => {
        const sinkIDs = options.sinkIDs as DropdownChoiceId[]
        const muteState = options.muteState as boolean;
        await Promise.all(
            sinkIDs.map((
                sinkID: DropdownChoiceId,
            ) => client.setSourceMute(muteState, sinkID))
        );
    }
});

export default setMuteSinks;
