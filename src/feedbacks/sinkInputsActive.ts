import type { CompanionFeedbackDefinition } from '@companion-module/base';

import standardFeedback from './standardFeedback';
import type { PulseAudioSinkInput, SinkInputParams, ActiveStateParams } from '../models';
import { generateSinkInputDropdown, activeStateOption } from '../options';

const sinkInputsActive = (
    sinkInputs: PulseAudioSinkInput[],
): CompanionFeedbackDefinition => standardFeedback<SinkInputParams & ActiveStateParams>({
    name: 'Sink Inputs Active',
    defaultStyle: {
    },
    options: [
        generateSinkInputDropdown(sinkInputs),
        activeStateOption,
    ],
    onEvent: ({ sinkInputApplicationNames, activeState }) => {
        const matches = sinkInputs.filter(({
            properties: { application },
        }) => sinkInputApplicationNames
            .includes(application.name))
            .length;
        return activeState ? matches > 0 : matches <= 0;
    }
});

export default sinkInputsActive;
