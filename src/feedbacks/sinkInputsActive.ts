import type { CompanionFeedbackDefinition, } from '@companion-module/base';

import type { PulseAudioSinkInput } from '../models';
import { generateSinkInputDropdown } from '../options';

const sinkInputsActive = (sinkInputs: PulseAudioSinkInput[]): CompanionFeedbackDefinition => {
    const sinkInputsSelector = generateSinkInputDropdown(sinkInputs);
    return ({
        type: 'boolean',
        name: 'Sink Inputs Active',
        defaultStyle: {
        },
        options: [sinkInputsSelector],
        callback: ({ options }) => {
            const applicationNames = options.sinkInputApplicationNames as string[];
            const inputs = sinkInputs.filter(({
                properties: { application },
            }) => applicationNames.includes(application.name));
            return inputs.length > 0;
        }
    });
};

export default sinkInputsActive;
