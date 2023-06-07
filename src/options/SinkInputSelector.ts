import type { PulseAudioSinkInput } from '../models';

export const generateSinkInputChoices = (
    sinkInputs: PulseAudioSinkInput[],
) => sinkInputs.map(({ index, properties }) => ({
    id: index,
    label: properties.media.name,
}));

export const generateSinkInputDropdown = (
    sinkInputs: PulseAudioSinkInput[],
    id = 'sinkInputIndices',
    label = 'Sink Inputs',
) => ({
    id,
    type: 'multidropdown' as const,
    label,
    default: [],
    choices: generateSinkInputChoices(sinkInputs),
});
