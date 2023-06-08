import {
    CompanionFeedbackDefinitions,
} from '@companion-module/base';

import type { PulseAudioSource, PulseAudioSink, PulseAudioSinkInput } from '../models';
import sinksMuted from './sinksMuted';
import sourcesMuted from './sourcesMuted';
import sinkInputsMuted from './sinkInputsMuted';
import sinkInputsActive from './sinkInputsActive';

export const FEEDBACK_ID_SINKS_MUTED = 'sinksMuted';
export const FEEDBACK_ID_SOURCES_MUTED = 'sourcesMuted';
export const FEEDBACK_ID_SINK_INPUTS_MUTED = 'sinkInputsMuted';
export const FEEDBACK_ID_SINK_INPUTS_ACTIVE = 'sinkInputsActive';

const generateFeedbacks = (
    sources: PulseAudioSource[],
    sinks: PulseAudioSink[],
    sinkInputs: PulseAudioSinkInput[],
): CompanionFeedbackDefinitions => ({
    [FEEDBACK_ID_SINKS_MUTED]: sinksMuted(sinks),
    [FEEDBACK_ID_SOURCES_MUTED]: sourcesMuted(sources),
    [FEEDBACK_ID_SINK_INPUTS_MUTED]: sinkInputsMuted(sinkInputs),
    [FEEDBACK_ID_SINK_INPUTS_ACTIVE]: sinkInputsActive(sinkInputs),
});

export default generateFeedbacks;
