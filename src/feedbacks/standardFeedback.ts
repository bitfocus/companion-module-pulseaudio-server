import {
    CompanionFeedbackDefinition,
    CompanionFeedbackBooleanEvent,
    CompanionButtonStyleProps,
    SomeCompanionFeedbackInputField,
} from '@companion-module/base';

type StandardFeedbackParams<T> = {
    name: string
    defaultStyle: Partial<CompanionButtonStyleProps>
    options: SomeCompanionFeedbackInputField[]
    onEvent: (options: T) => (boolean | Promise<boolean>)
};

const standardFeedback = <T>({
    name,
    defaultStyle,
    options,
    onEvent,
}: StandardFeedbackParams<T>): CompanionFeedbackDefinition => ({
    name,
    type: 'boolean',
    defaultStyle,
    options,
    callback: ({ options }: CompanionFeedbackBooleanEvent) => onEvent(options as T),
});

export default standardFeedback;
