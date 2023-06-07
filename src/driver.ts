import { PulseAudio } from 'pulseaudio.js';

import type {
    ModuleConfig,
    PulseAudioSink,
    PulseAudioSinkInput,
    PulseAudioSource,
} from './models';

export const clientForConfig = ({
    cookie,
    sockPath,
}: ModuleConfig): PulseAudio => new PulseAudio(
    undefined,
    cookie ? Buffer.from(cookie) : undefined,
    sockPath,
);

export const getSources = async (client: PulseAudio): Promise<PulseAudioSource[]> => {
    const sources = await client.getAllSources();
    const simplifiedSources: PulseAudioSource[] = sources.map((record) => ({
        name: record.name as string,
        index: record.index as number,
        description: record.description as string,
        mute: record.mute as boolean,
        volume: record.volume as { current: number[], base: number, steps: number },
    }));
    return simplifiedSources;
};

export const getSinks = async (client: PulseAudio): Promise<PulseAudioSink[]> => {
    const sinks = await client.getAllSinks();
    const simplifiedSinks: PulseAudioSink[] = sinks.map((record) => ({
        name: record.name as string,
        index: record.index as number,
        description: record.description as string,
        mute: record.mute as boolean,
        volume: record.volume as { current: number[], base: number, steps: number },
    }));
    return simplifiedSinks;
};

export const getSinkInputs = async (client: PulseAudio): Promise<PulseAudioSinkInput[]> => {
    const list = await client.getSinkInputList();
    const sinkInputs = list.map((sinkInput) => ({
        ...sinkInput,
    }) as PulseAudioSinkInput);
    return sinkInputs;
};
