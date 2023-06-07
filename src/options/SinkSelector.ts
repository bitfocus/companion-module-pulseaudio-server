import { CompanionInputFieldMultiDropdown } from '@companion-module/base';
import type { PulseAudioSink } from '../models';

export const generateSinkChoices = (
    availableSources: PulseAudioSink[],
) => availableSources.map(({ name, description }) => ({
    id: name,
    label: description,
}));

export const generateSinkDropdown = (
    availableSources: PulseAudioSink[],
    id = 'sinkIDs',
    label = 'Sinks',
): CompanionInputFieldMultiDropdown => ({
    id,
    type: 'multidropdown',
    label,
    default: [],
    choices: generateSinkChoices(availableSources),
});
