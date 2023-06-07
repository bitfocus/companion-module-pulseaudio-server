import type { PulseAudio } from 'pulseaudio.js';
import type { CompanionActionDefinitions } from '@companion-module/base';

import setMuteSources from './setMuteSources';
import setMuteSinks from './setMuteSinks';
import setMuteSinkInputs from './setMuteSinkInputs';
import toggleMuteSinkInputs from './toggleMuteSinkInputs';
import toggleMuteSources from './toggleMuteSources';
import toggleMuteSinks from './toggleMuteSinks';
import volumeAdjustSinkInputs from './volumeAdjustSinkInputs';

import type {
    PulseAudioSink,
    PulseAudioSource,
    PulseAudioSinkInput,
} from '../models';

export const ACTION_ID_SET_MUTE_SOURCES = 'setMuteSources';
export const ACTION_ID_TOGGLE_MUTE_SOURCES = 'toggleMuteSources';
export const ACTION_ID_SET_MUTE_SINKS = 'setMuteSinks';
export const ACTION_ID_TOGGLE_MUTE_SINKS = 'toggleMuteSinks';
export const ACTION_ID_SET_MUTE_SINK_INPUTS = 'setMuteSinkInputs';
export const ACTION_ID_TOGGLE_MUTE_SINK_INPUTS = 'toggleMuteSinkInputs';
export const ACTION_ID_VOLUME_ADJUST_SINK_INPUTS = 'volumeAdjustSinkInputs';

const generateActions = (
    client: PulseAudio,
    sources: PulseAudioSource[],
    sinks: PulseAudioSink[],
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinitions => ({
    [ACTION_ID_SET_MUTE_SOURCES]: setMuteSources(client, sources),
    [ACTION_ID_TOGGLE_MUTE_SOURCES]: toggleMuteSources(client, sources),
    [ACTION_ID_SET_MUTE_SINKS]: setMuteSinks(client, sinks),
    [ACTION_ID_TOGGLE_MUTE_SINKS]: toggleMuteSinks(client, sinks),
    [ACTION_ID_SET_MUTE_SINK_INPUTS]: setMuteSinkInputs(client, sinkInputs),
    [ACTION_ID_TOGGLE_MUTE_SINK_INPUTS]: toggleMuteSinkInputs(client, sinkInputs),
    [ACTION_ID_VOLUME_ADJUST_SINK_INPUTS]: volumeAdjustSinkInputs(client, sinkInputs),
});

export default generateActions;
