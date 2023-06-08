import {
    combineRgb,
    CompanionFeedbackDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput } from '../models';
import { generateSinkInputDropdown } from '../options';

const sinkInputsMuted = (sinkInputs: PulseAudioSinkInput[]): CompanionFeedbackDefinition => {
    const sinksSelector = generateSinkInputDropdown(sinkInputs);
    return ({
        type: 'boolean',
        name: 'Sink Inputs Muted',
        defaultStyle: {
            bgcolor: combineRgb(255, 0, 0),
            color: combineRgb(255, 255, 255),
            text: 'App Muted',
        },
        options: [sinksSelector],
        callback: ({ options }) => {
            const applicationNames = options.sinkInputApplicationNames as string[];
            const sinks = sinkInputs.filter(({
                properties: { application },
            }) => applicationNames.includes(application.name));
            return sinks.length > 0 && sinks.every(({ muted }) => muted);
        }
    });
};

export default sinkInputsMuted;
