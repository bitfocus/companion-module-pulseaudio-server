import {
    combineRgb,
    DropdownChoiceId,
    CompanionFeedbackDefinition,
} from '@companion-module/base';

import { generateSourceDropdown } from '../options';
import type { PulseAudioSource } from '../models';

const sourcesMuted = (availableSources: PulseAudioSource[]): CompanionFeedbackDefinition => {
    const sourcesSelector = generateSourceDropdown(availableSources);
    return ({
        type: 'boolean',
        name: 'Sources Muted',
        defaultStyle: {
            bgcolor: combineRgb(255, 0, 0),
            color: combineRgb(255, 255, 255),
            text: 'Input Muted',
        },
        options: [sourcesSelector],
        callback: ({ options }) => {
            const sourceIDs = options.sourceIDs as DropdownChoiceId[];
            const sources = availableSources.filter(({ name }) => sourceIDs.includes(name));
            return sources.every(({ mute }) => mute);
        }
    });
};

export default sourcesMuted;
