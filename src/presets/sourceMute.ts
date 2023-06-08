import { combineRgb, CompanionButtonPresetDefinition } from '@companion-module/base';

import { ACTION_ID_TOGGLE_MUTE_SOURCES, } from '../actions';
import { FEEDBACK_ID_SOURCES_MUTED } from '../feedbacks';

const sourceMutePreset: CompanionButtonPresetDefinition = {
    type: 'button',
    category: 'Muting',
    name: 'Source Mute',
    style: {
        text: 'Input Mute',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
    },
    steps: [{
        down: [{
            actionId: ACTION_ID_TOGGLE_MUTE_SOURCES,
            options: {},
        }],
        up: [],
    }],
    feedbacks: [{
        feedbackId: FEEDBACK_ID_SOURCES_MUTED,
        options: {},
    }],
};

export default sourceMutePreset;
