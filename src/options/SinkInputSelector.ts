import type { PulseAudioSinkInput } from '../models';

export const generateSinkInputChoices = (
    sinkInputs: PulseAudioSinkInput[],
) => sinkInputs.map(({ properties: { media, application } }) => ({
    id: application.name,
    label: `${media.name} (${application.name})`,
}));

export const generateSinkInputDropdown = (
    sinkInputs: PulseAudioSinkInput[],
    id = 'sinkInputApplicationNames',
    label = 'Sink Inputs',
    minimumSelection = 1,
) => ({
    id,
    type: 'multidropdown' as const,
    label,
    default: [],
    minSelection: minimumSelection,
    choices: generateSinkInputChoices(sinkInputs),
});
