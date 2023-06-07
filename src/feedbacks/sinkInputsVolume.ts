import {
    combineRgb,
    CompanionFeedbackDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput } from '../models';
import { generateSinkInputDropdown } from '../options';

const sinkInputsVolume = (sinkInputs: PulseAudioSinkInput[]): CompanionFeedbackDefinition => {
    const sinksSelector = generateSinkInputDropdown(sinkInputs);
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
            const indices = options.sinkInputIndices as number[];
            const sinks = sinkInputs.filter(({ index }) => indices.includes(index));
            return sinks.every(({ muted }) => muted);
        }
    });
};

export default sinkInputsVolume;
