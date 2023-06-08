import type { PulseAudio } from 'pulseaudio.js';

import type { CompanionActionDefinition } from '@companion-module/base';

import type { PulseAudioSinkInput, SinkInputParams, MuteParams } from '../models';
import { generateSinkInputDropdown, muteStateOption } from '../options';

import { applyToMatches, standardAction } from './standardAction';

const setMuteSinkInputs = (
    client: PulseAudio,
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinition => standardAction<SinkInputParams & MuteParams>({
    name: 'Set Mute State for Sink Input',
    options: [
        muteStateOption,
        generateSinkInputDropdown(sinkInputs),
    ],
    onEvent: async ({ sinkInputApplicationNames, muteState }) => applyToMatches(
        sinkInputs,
        ({ properties: { application } }) => application.name,
        sinkInputApplicationNames,
        ({ index }) => client.setSinkInputMute(index, muteState),
    ),
});

export default setMuteSinkInputs;
