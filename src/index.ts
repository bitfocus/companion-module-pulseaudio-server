import { PulseAudio } from 'pulseaudio.js';
import {
    InstanceBase,
    runEntrypoint,
    InstanceStatus,
    LogLevel,
    SomeCompanionConfigField,
} from '@companion-module/base';

import {
    ModuleConfig,
    configFields,
} from './models';
import {
    variableDefinitions,
} from './variables';
import generateActions from './actions';
import generateFeedbacks from './feedbacks';
import presets from './presets';
import { clientForConfig, getSinks, getSources, getSinkInputs } from './driver';

type Logger = {
    debug: (...messages: unknown[]) => void
    info: (...messages: unknown[]) => void
    warn: (...messages: unknown[]) => void
    error: (...messages: unknown[]) => void
};

class PulseAudioModuleInstance extends InstanceBase<ModuleConfig> {
    private client?: PulseAudio;

    getLogger(): Logger {
        const formatMessages = (messages: unknown[]) => messages.join('\n');
        const logMessage = (
            logLevel: LogLevel,
        ) => (
            ...messages: unknown[]
        ) => this.log(logLevel, formatMessages(messages));
        return ({
            debug: logMessage('debug'),
            info: logMessage('info'),
            warn: logMessage('warn'),
            error: logMessage('error'),
        });
    }
    async reloadState() {
        const log = this.getLogger();
        if (this.client) {
            log.info('Reloading state from client');
            // Get Sources, add to instance state
            const [
                sources,
                sinks,
                sinkInputs,
            ] = await Promise.all([
                getSources(this.client),
                getSinks(this.client),
                getSinkInputs(this.client),
            ]);

            log.debug('Adding custom variables to companion');
            this.setVariableDefinitions(variableDefinitions);

            log.debug('Adding custom actions to companion');
            const actions = generateActions(
                this.client,
                sources,
                sinks,
                sinkInputs,
            );
            this.setActionDefinitions(actions);

            log.debug('Adding custom feedbackcs to companion');
            const feedbacks = generateFeedbacks(sources, sinks, sinkInputs);
            this.setFeedbackDefinitions(feedbacks);

            log.debug('Adding custom presets to companion');
            this.setPresetDefinitions(presets);
            log.debug('Checking feedbacks');
            this.checkFeedbacks();
        }
    }

    async init(config: ModuleConfig) {
        const log = this.getLogger();
        try {
            log.info('Starting PulseAudio module');
            await this.configUpdated(config);
            log.info('PulseAudio Module Started');
        } catch (err: unknown) {
            log.error('Error in PulseAudio init', JSON.stringify(err, null, 2));
        }
    }

    // When module gets deleted
    async destroy() {
        const log = this.getLogger();
        log.info('Disconnecting from PulseAudio');
        try {
            await this.client?.disconnect();
        } catch (err: unknown) {
            log.warn('Error while disconnecting from PulseAudio', JSON.stringify(err, null, 2));
        }
    }

    async configUpdated(config: ModuleConfig) {
        const log = this.getLogger();
        log.info('Config Change Detected');
        try {
            log.debug('Setting Instance Status to Disconnected');
            this.updateStatus(InstanceStatus.Disconnected);
            log.debug('Generating client for config');
            this.client = clientForConfig(config);
            this.client.on(
                'error',
                (err: unknown) => log.error('Error from PulseAudio.js', JSON.stringify(err, null, 2))
            );
            log.debug('Setting Instance Status to Connecting');
            this.updateStatus(InstanceStatus.Connecting);
            log.debug('Attempting to connect');
            await this.client.connect();
            log.info('Connect Successful!');
            log.debug('Registering event handlers');
            this.client.on('event.source', () => {
                log.info('Reloading for Source Event');
                this.reloadState()
                    .catch((err: unknown) => log.error('Error in source event handler', err));
            });
            this.client.on('event.sink', () => {
                log.info('Reloading for Sink Event');
                this.reloadState()
                    .catch((err: unknown) => log.error('Error in sink event handler', err));
            });
            this.client.on('event.sink_input', () => {
                log.info('Reloading for Sink Input Event');
                this.reloadState()
                    .catch((err: unknown) => log.error('Error in sink input event handler', err));
            });
            await this.reloadState();
            log.debug('Setting Instance Status to OK');
            this.updateStatus(InstanceStatus.Ok);
        } catch (err: unknown) {
            log.error('Unable to connect to PulseAudio', JSON.stringify(err, null, 2));
            this.updateStatus(InstanceStatus.BadConfig);
        }
    }

    // Return config fields for web config
    getConfigFields(): SomeCompanionConfigField[] {
        return configFields;
    }
}

runEntrypoint(PulseAudioModuleInstance, [])
