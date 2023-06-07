import type {
    SomeCompanionConfigField,
} from '@companion-module/base';

export type ModuleConfig = {
    cookie?: string
    sockPath?: string
};

export const configFields: SomeCompanionConfigField[] = [{
    id: 'sockPath',
    type: 'textinput',
    label: 'Sock Path',
    width: 12,
    tooltip: 'Usually of the form "/run/user/{uid}/pulse/native"',
    default: '',
}, {
    id: 'cookie',
    type: 'textinput',
    label: 'Authentication Cookie Path',
    tooltip: 'Usually of the form "/home/{user}/.config/pulse/cookie"',
    width: 12,
    default: '',
}];
