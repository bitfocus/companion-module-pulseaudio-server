import {
    combineRgb,
    CompanionFeedbackDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput, SinkInputParams, MuteParams } from '../models';
import { generateSinkInputDropdown, muteStateOption } from '../options';
import standardFeedback from './standardFeedback';

const sinkInputsMuted = (
    sinkInputs: PulseAudioSinkInput[],
): CompanionFeedbackDefinition => standardFeedback<SinkInputParams & MuteParams>({
    name: 'Sink Inputs Muted',
    defaultStyle: {
        bgcolor: combineRgb(255, 0, 0),
        color: combineRgb(255, 255, 255),
        text: 'App Muted',
    },
    options: [
        generateSinkInputDropdown(sinkInputs),
        muteStateOption,
    ],
    onEvent: ({ sinkInputApplicationNames, muteState }) => sinkInputs
        .filter(({ properties: { application } }) => (
            sinkInputApplicationNames.includes(application.name)
        ))
        .every(({ muted }) => muted === muteState),
});

export default sinkInputsMuted;
