import {
    PulseAudio,
    percentToVolume,
    volumeToPercent,
} from 'pulseaudio.js';

import type {
    CompanionActionDefinition,
} from '@companion-module/base';

import type { PulseAudioSinkInput } from '../models';
import { generateSinkInputDropdown } from '../options';

const volumeAdjustSinkInputs = (
    client: PulseAudio,
    sinkInputs: PulseAudioSinkInput[],
): CompanionActionDefinition => ({
    name: 'Adjust Volume for Sink Inputs',
    options: [
        {
            id: 'adjustmentPercentage',
            type: 'number',
            label: 'Adjustment %',
            tooltip: 'Percentage points to change volume by for each invocation. May be negative.',
            default: -10,
            min: -100,
            max: 100,
        },
        generateSinkInputDropdown(sinkInputs),
    ],
    callback: async ({ options }) => {
        const indices = options.sinkInputIndices as number[];
        const adjustmentPercentage = options.adjustmentPercentage as number;
        await Promise.all(
            indices.map((
                sinkInputIndex: number,
            ) => {
                const sinkInput = sinkInputs.find(({ index }) => index === sinkInputIndex);
                if (sinkInput) {
                    const { volume } = sinkInput;
                    const newVolume = volume.map((vol) => (
                        Math.max(0,
                            Math.min(100,
                                percentToVolume(
                                    volumeToPercent(vol) + adjustmentPercentage
                                )
                            )
                        )
                    ));
                    return client.setSinkInputVolume(sinkInputIndex, newVolume);
                }
                return undefined;
            })
        );
    }
});

export default volumeAdjustSinkInputs;
