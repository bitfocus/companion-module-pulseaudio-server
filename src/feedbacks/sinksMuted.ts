import {
    combineRgb,
    CompanionFeedbackDefinition,
    DropdownChoiceId,
} from '@companion-module/base';

import type { PulseAudioSink } from '../models';
import { generateSinkDropdown } from '../options';

const sinksMuted = (availableSinks: PulseAudioSink[]): CompanionFeedbackDefinition => {
    const sinksSelector = generateSinkDropdown(availableSinks);
    return ({
        type: 'boolean',
        name: 'Sinks Muted',
        defaultStyle: {
            bgcolor: combineRgb(255, 0, 0),
            color: combineRgb(255, 255, 255),
            text: 'Output Muted',
        },
        options: [sinksSelector],
        callback: ({ options }) => {
            const sinkIDs = options.sinkIDs as DropdownChoiceId[];
            const sinks = availableSinks.filter(({ name }) => sinkIDs.includes(name));
            return sinks.every(({ mute }) => mute);
        }
    });
};

export default sinksMuted;
