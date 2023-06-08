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
    minimumSelection = 1,
) => ({
    id,
    type: 'multidropdown' as const,
    label,
    default: [],
    minSelection: minimumSelection,
    choices: generateSourceChoices(availableSources),
});
