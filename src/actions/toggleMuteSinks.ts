import type { PulseAudio } from 'pulseaudio.js';

import type { CompanionActionDefinition } from '@companion-module/base';

import type { PulseAudioSink, SinkParams } from '../models';
import { generateSinkDropdown } from '../options';

import { standardAction, applyToMatches } from './standardAction';

const toggleMuteSinks = (
    client: PulseAudio,
    sinks: PulseAudioSink[],
): CompanionActionDefinition => standardAction<SinkParams>({
    name: 'Toggle Mute State for Sinks',
    options: [generateSinkDropdown(sinks)],
    onEvent: async ({ sinkIDs }) => applyToMatches(
        sinks,
        ({ name }) => name,
        sinkIDs,
        ({ name, mute }) => client.setSinkMute(!mute, name),
    ),
});

export default toggleMuteSinks;
