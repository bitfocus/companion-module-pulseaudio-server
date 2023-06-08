import { percentToVolume, volumeToPercent, PulseAudio } from 'pulseaudio.js';
import type { CompanionActionDefinition } from '@companion-module/base';

import type { PulseAudioSinkInput, SinkInputParams, VolumeAdjustParams } from '../models';
import { adjustmentPercentageOption, generateSinkInputDropdown } from '../options';
import { applyToMatches, standardAction } from './standardAction';

// Pulse Audio True Maximum (+11 dB)
const MAX_VOLUME = 153;
const MIN_VOLUME = 0;

const adjustedVolume = (adjustmentPercentagePoints: number) => (startingVolume: number) => {
    const currentPercentage = volumeToPercent(startingVolume);
    const percentageRatio = adjustmentPercentagePoints;
    const adjustedPercentage = Math.max(
        MIN_VOLUME,
        Math.min(
            MAX_VOLUME,
            currentPercentage + percentageRatio
        ),
    );
    const adjustedVolume = percentToVolume(adjustedPercentage);
    return adjustedVolume;
};

const volumeAdjustSinkInputs = (
    client: PulseAudio,
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinition => standardAction<SinkInputParams & VolumeAdjustParams>({
    name: 'Adjust Volume for Sink Inputs',
    options: [
        adjustmentPercentageOption,
        generateSinkInputDropdown(sinkInputs),
    ],
    onEvent: async ({ adjustmentPercentage, sinkInputApplicationNames }) => applyToMatches(
        sinkInputs,
        ({ properties: { application } }) => application.name,
        sinkInputApplicationNames,
        ({ volume, index }: PulseAudioSinkInput) => {
            const newVolume = volume.map(adjustedVolume(adjustmentPercentage));
            return client.setSinkInputVolume(index, newVolume);
        },
    ),
});

export default volumeAdjustSinkInputs;
