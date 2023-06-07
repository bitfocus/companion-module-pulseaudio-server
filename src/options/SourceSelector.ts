import type { PulseAudioSource } from '../models';

export const generateSourceChoices = (
    availableSources: PulseAudioSource[],
) => availableSources.map(({ name, description }) => ({
    id: name,
    label: description,
}));

export const generateSourceDropdown = (
    availableSources: PulseAudioSource[],
    id = 'sourceIDs',
    label = 'Sources',
) => ({
    id,
    type: 'multidropdown' as const,
    label,
    default: [],
    choices: generateSourceChoices(availableSources),
});
