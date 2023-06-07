import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput } from '../models';
import { generateSinkInputDropdown } from '../options';

const setMuteSinkInputs = (
    client: PulseAudio,
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinition => ({
    name: 'Set Mute State for Sink Input',
    options: [
        {
            id: 'muteState',
            type: 'checkbox',
            label: 'Set Muted',
            default: true,
        },
        generateSinkInputDropdown(sinkInputs),
    ],
    callback: async ({ options }) => {
        const indices = options.sinkInputIndices as number[]
        const muteState = options.muteState as boolean;
        console.log(indices);
        await Promise.all(
            indices.map((
                index: number,
            ) => client.setSinkInputMute(index, muteState))
        );
    }
});

export default setMuteSinkInputs;
