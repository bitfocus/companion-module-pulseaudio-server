import { combineRgb, CompanionPresetDefinitions } from '@companion-module/base';
import {
    FEEDBACK_ID_SINK_INPUTS_MUTED,
    FEEDBACK_ID_SINKS_MUTED,
    FEEDBACK_ID_SOURCES_MUTED,
} from './feedbacks';

import {
    ACTION_ID_TOGGLE_MUTE_SOURCES,
    ACTION_ID_TOGGLE_MUTE_SINKS,
    ACTION_ID_TOGGLE_MUTE_SINK_INPUTS,
} from './actions';

const presets: CompanionPresetDefinitions = {
    sourceMute: {
        type: 'button',
        category: 'Volume',
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
    },
    sinkMute: {
        type: 'button',
        category: 'Volume',
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
    },
    sinkInputMute: {
        type: 'button',
        category: 'Volume',
        name: 'Sink Input Mute',
        style: {
            text: 'App Mute',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [{
            down: [{
                actionId: ACTION_ID_TOGGLE_MUTE_SINK_INPUTS,
                options: {
                    sinkInputIndices: [],
                },
            }],
            up: [],
        }],
        feedbacks: [{
            feedbackId: FEEDBACK_ID_SINK_INPUTS_MUTED,
            options: {
                sinkInputIndices: [],
            },
            style: {
                bgcolor: combineRgb(255, 0, 0),
                color: combineRgb(255, 255, 255),
                text: 'App Muted',
            }
        }],
    },
};

export default presets;
