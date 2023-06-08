import type {
    CompanionActionDefinition,
    CompanionActionEvent,
    SomeCompanionActionInputField,
} from '@companion-module/base';

const filterByField = <I, O>(
    items: I[],
    getter: (item: I) => O,
    values: O[],
): I[] => items.filter((item: I) => values.includes(getter(item)));

export const applyToMatches = async <I, O>(
    items: I[],
    getter: (item: I) => O,
    values: O[],
    func: (matchingItem: I) => (void | Promise<void>)
): Promise<void> => {
    const itemsToApply: I[] = filterByField(
        items,
        getter,
        values,
    );
    await Promise.all(itemsToApply.map(func));
};

export type StandardActionParams<T> = {
    name: string
    options: SomeCompanionActionInputField[]
    onEvent: (options: T) => (void | Promise<void>)
};

export const standardAction = <T>({
    name,
    options,
    onEvent,
}: StandardActionParams<T>): CompanionActionDefinition => ({
    name,
    options,
    callback: ({ options }: CompanionActionEvent) => onEvent(options as T),
});
