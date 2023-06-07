import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
    DropdownChoiceId,
} from '@companion-module/base';

import type { PulseAudioSink } from '../models';
import { generateSinkDropdown } from '../options';

const toggleMuteSinks = (
    client: PulseAudio,
    sinks: PulseAudioSink[],
): CompanionActionDefinition => ({
    name: 'Toggle Mute State for Sinks',
    options: [generateSinkDropdown(sinks)],
    callback: async ({ options }) => {
        const sinkIDs = options.sinkIDs as DropdownChoiceId[]
        await Promise.all(
            sinkIDs.map((
                sinkID: DropdownChoiceId,
            ) => {
                const sink = sinks.find(({ name }) => name === sinkID);
                if (sink) {
                    return client.setSinkMute(!sink.mute, sinkID);
                }
                return undefined;
            })
        );
    }
});

export default toggleMuteSinks;
