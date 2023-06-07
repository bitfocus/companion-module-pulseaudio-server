import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
    DropdownChoiceId,
} from '@companion-module/base';

import type { PulseAudioSource } from '../models';
import { generateSourceDropdown } from '../options';

const toggleMuteSources = (
    client: PulseAudio,
    sources: PulseAudioSource[],
): CompanionActionDefinition => ({
    name: 'Toggle Mute State for Sources',
    options: [generateSourceDropdown(sources)],
    callback: async ({ options }) => {
        const sourceIDs = options.sourceIDs as DropdownChoiceId[]
        await Promise.all(
            sourceIDs.map((
                sourceID: DropdownChoiceId,
            ) => {
                const source = sources.find(({ name }) => name === sourceID);
                if (source) {
                    return client.setSourceMute(!source.mute, sourceID);
                }
                return undefined;
            })
        );
    }
});

export default toggleMuteSources;
