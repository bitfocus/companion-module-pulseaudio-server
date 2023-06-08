import { combineRgb, CompanionButtonPresetDefinition } from '@companion-module/base';

import { ACTION_ID_TOGGLE_MUTE_SINK_INPUTS, } from '../actions';
import {
    FEEDBACK_ID_SINK_INPUTS_MUTED,
    FEEDBACK_ID_SINK_INPUTS_ACTIVE,
} from '../feedbacks';

const sinkInputMutePreset: CompanionButtonPresetDefinition = {
    type: 'button',
    category: 'Muting',
    name: 'Sink Input Mute',
    style: {
        text: 'App Mute',
        size: 'auto',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
    },
    steps: [{
        down: [{
            actionId: ACTION_ID_TOGGLE_MUTE_SINK_INPUTS,
            options: {
                sinkInputApplicationNames: [],
            },
        }],
        up: [],
    }],
    feedbacks: [
        // If Input is Active
        {
            feedbackId: FEEDBACK_ID_SINK_INPUTS_ACTIVE,
            options: {
                sinkInputApplicationNames: [],
                activeState: true,
            },
            style: {
                text: '',
                bgcolor: combineRgb(0, 0, 0),
            },
        },
        // If Input is Muted
        {
            feedbackId: FEEDBACK_ID_SINK_INPUTS_MUTED,
            options: {
                sinkInputApplicationNames: [],
                muteState: true,
            },
            style: {
                bgcolor: combineRgb(255, 0, 0),
                color: combineRgb(255, 255, 255),
                text: 'App Muted',
                size: '18',
            }
        },
        // If input is not active
        {
            feedbackId: FEEDBACK_ID_SINK_INPUTS_ACTIVE,
            options: {
                sinkInputApplicationNames: [],
                activeState: false,
            },
            style: {
                text: '',
                bgcolor: combineRgb(0, 0, 0),
            },
        }],
};

export default sinkInputMutePreset;
