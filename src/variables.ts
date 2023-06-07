import { PulseAudio, volumeToPercent } from 'pulseaudio.js';
import type {
    CompanionVariableDefinition,
    CompanionVariableValues,
} from '@companion-module/base';

import type {
    PulseAudioSink,
    PulseAudioSource,
} from './models';

const VARIABLE_ID_SERVER_NAME = 'SERVER_NAME';
const VARIABLE_ID_SERVER_VERSION = 'SERVER_VERSION';
const VARIABLE_ID_SERVER_USERNAME = 'SERVER_USERNAME';
const VARIABLE_ID_SERVER_HOSTNAME = 'SERVER_HOSTNAME';
const VARIABLE_ID_DEFAULT_SINK_NAME = 'DEFAULT_SINK_NAME';
const VARIABLE_ID_DEFAULT_SINK_DESCRIPTION = 'DEFAULT_SINK_DESCRIPTION';
const VARIABLE_ID_DEFAULT_SINK_VOLUME = 'DEFAULT_SINK_VOLUME';
const VARIABLE_ID_DEFAULT_SINK_MUTE = 'DEFAULT_SINK_MUTE';
const VARIABLE_ID_DEFAULT_SOURCE_NAME = 'DEFAULT_SOURCE_NAME';
const VARIABLE_ID_DEFAULT_SOURCE_DESCRIPTION = 'DEFAULT_SOURCE_DESCRIPTION';
const VARIABLE_ID_DEFAULT_SOURCE_VOLUME = 'DEFAULT_SOURCE_VOLUME';
const VARIABLE_ID_DEFAULT_SOURCE_MUTE = 'DEFAULT_SOURCE_MUTE';

export const variableDefinitions: CompanionVariableDefinition[] = [{
    variableId: VARIABLE_ID_SERVER_NAME,
    name: 'Server Name',
}, {
    variableId: VARIABLE_ID_SERVER_VERSION,
    name: 'Server Version',
}, {
    variableId: VARIABLE_ID_SERVER_USERNAME,
    name: 'Server Username',
}, {
    variableId: VARIABLE_ID_SERVER_HOSTNAME,
    name: 'Server Hostname',
}, {
    variableId: VARIABLE_ID_DEFAULT_SINK_NAME,
    name: 'Default Sink Name',
}, {
    variableId: VARIABLE_ID_DEFAULT_SINK_DESCRIPTION,
    name: 'Default Sink Description',
}, {
    variableId: VARIABLE_ID_DEFAULT_SINK_VOLUME,
    name: 'Default Sink Volume Percentage',
}, {
    variableId: VARIABLE_ID_DEFAULT_SINK_MUTE,
    name: 'Default Sink Muted',
}, {
    variableId: VARIABLE_ID_DEFAULT_SOURCE_NAME,
    name: 'Default Source Name',
}, {
    variableId: VARIABLE_ID_DEFAULT_SOURCE_DESCRIPTION,
    name: 'Default Source Description',
}, {
    variableId: VARIABLE_ID_DEFAULT_SOURCE_VOLUME,
    name: 'Default Source Volume Percentage',
}, {
    variableId: VARIABLE_ID_DEFAULT_SOURCE_MUTE,
    name: 'Default Source Muted',
}];

export const getVariableValues = async (
    paClient: PulseAudio,
): Promise<CompanionVariableValues> => {
    const [
        serverInfo,
        defaultSource,
        defaultSink,
    ] = await Promise.all([
        paClient.getServerInfo(),
        paClient.getSourceInfo() as Promise<PulseAudioSource>,
        paClient.getSinkInfo() as Promise<PulseAudioSink>,
    ]);
    return {
        [VARIABLE_ID_SERVER_NAME]: serverInfo.name,
        [VARIABLE_ID_SERVER_VERSION]: serverInfo.version,
        [VARIABLE_ID_SERVER_USERNAME]: serverInfo.username,
        [VARIABLE_ID_SERVER_HOSTNAME]: serverInfo.hostname,
        [VARIABLE_ID_DEFAULT_SOURCE_NAME]: defaultSource.name,
        [VARIABLE_ID_DEFAULT_SOURCE_DESCRIPTION]: defaultSource.description,
        [VARIABLE_ID_DEFAULT_SOURCE_VOLUME]: volumeToPercent(defaultSource.volume.current[0]),
        [VARIABLE_ID_DEFAULT_SOURCE_MUTE]: defaultSource.mute,
        [VARIABLE_ID_DEFAULT_SINK_NAME]: defaultSink.name,
        [VARIABLE_ID_DEFAULT_SINK_DESCRIPTION]: defaultSink.description,
        [VARIABLE_ID_DEFAULT_SINK_VOLUME]: volumeToPercent(defaultSink.volume.current[0]),
        [VARIABLE_ID_DEFAULT_SINK_MUTE]: defaultSink.mute,
    };
};
