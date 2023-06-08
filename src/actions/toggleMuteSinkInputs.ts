import type { PulseAudio } from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput, SinkInputParams } from '../models';
import { generateSinkInputDropdown } from '../options';
import { standardAction, applyToMatches } from './standardAction';

const toggleMuteSinkInputs = (
    client: PulseAudio,
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinition => standardAction<SinkInputParams>({
    name: 'Toggle Mute State for Sink Inputs',
    options: [generateSinkInputDropdown(sinkInputs)],
    onEvent: async ({ sinkInputApplicationNames }) => applyToMatches(
        sinkInputs,
        ({ properties: { application } }) => application.name,
        sinkInputApplicationNames,
        ({ index, muted }) => client.setSinkInputMute(index, !muted),
    ),
});

export default toggleMuteSinkInputs;
