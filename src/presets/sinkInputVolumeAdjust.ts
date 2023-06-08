import { combineRgb, CompanionButtonPresetDefinition } from '@companion-module/base';

import { ACTION_ID_VOLUME_ADJUST_SINK_INPUTS, } from '../actions';
import {
    FEEDBACK_ID_SINK_INPUTS_ACTIVE,
} from '../feedbacks';

const sinkInputVolumeAdjustPreset: CompanionButtonPresetDefinition = {
    type: 'button',
    category: 'Volume',
    name: 'Sink Input Volume Adjust',
    style: {
        text: '-10%',
        size: 'auto',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
    },
    steps: [{
        down: [{
            actionId: ACTION_ID_VOLUME_ADJUST_SINK_INPUTS,
            options: {
                sinkInputApplicationNames: [],
                adjustmentPercentage: -10,
            },
        }],
        up: [],
    }],
    feedbacks: [{
        feedbackId: FEEDBACK_ID_SINK_INPUTS_ACTIVE,
        options: {
            sinkInputApplicationNames: [],
        },
        style: {
            text: '-',
        },
    }],
};

export default sinkInputVolumeAdjustPreset;
