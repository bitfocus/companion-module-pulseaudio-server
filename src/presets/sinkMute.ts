import { combineRgb, CompanionButtonPresetDefinition } from '@companion-module/base';

import { ACTION_ID_TOGGLE_MUTE_SINKS, } from '../actions';
import { FEEDBACK_ID_SINKS_MUTED } from '../feedbacks';

const sinkMutePreset: CompanionButtonPresetDefinition = {
    type: 'button',
    category: 'Muting',
    name: 'Sink Mute',
    style: {
        text: 'Output Mute',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
    },
    steps: [{
        down: [{
            actionId: ACTION_ID_TOGGLE_MUTE_SINKS,
            options: {},
        }],
        up: [],
    }],
    feedbacks: [{
        feedbackId: FEEDBACK_ID_SINKS_MUTED,
        options: {},
    }],
};

export default sinkMutePreset;
