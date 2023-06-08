import type { PulseAudio } from 'pulseaudio.js';

import type { CompanionActionDefinition } from '@companion-module/base';

import type { PulseAudioSink, SinkParams, MuteParams } from '../models';
import { generateSinkDropdown, muteStateOption } from '../options';
import { standardAction, applyToMatches } from './standardAction';

const setMuteSinks = (
    client: PulseAudio,
    sinks: PulseAudioSink[],
): CompanionActionDefinition => standardAction<SinkParams & MuteParams>({
    name: 'Set Mute State for Sinks',
    options: [
        muteStateOption,
        generateSinkDropdown(sinks),
    ],
    onEvent: async ({ sinkIDs, muteState }) => applyToMatches(
        sinks,
        ({ name }) => name,
        sinkIDs,
        ({ name }) => client.setSourceMute(muteState, name),
    ),
});

export default setMuteSinks;
