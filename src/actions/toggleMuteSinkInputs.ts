import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput } from '../models';
import { generateSinkInputDropdown } from '../options';

const toggleMuteSinkInputs = (
    client: PulseAudio,
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinition => ({
    name: 'Toggle Mute State for Sink Inputs',
    options: [generateSinkInputDropdown(sinkInputs)],
    callback: async ({ options }) => {
        const indices = options.sinkInputIndices as number[]
        await Promise.all(
            indices.map((
                sinkInputIndex: number,
            ) => {
                const sinkInput = sinkInputs.find(({ index }) => index === sinkInputIndex);
                if (sinkInput) {
                    return client.setSinkInputMute(sinkInputIndex, !sinkInput.muted);
                }
                return undefined;
            })
        );
    }
});

export default toggleMuteSinkInputs;
