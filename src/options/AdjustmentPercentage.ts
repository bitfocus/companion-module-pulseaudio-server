import { CompanionInputFieldNumber } from '@companion-module/base';

const adjustmentPercentageOption: CompanionInputFieldNumber = {
    id: 'adjustmentPercentage',
    type: 'number',
    label: 'Adjustment %',
    tooltip: 'Percentage points to change volume by for each invocation. May be negative.',
    default: -10,
    min: -100,
    max: 100,
};

export default adjustmentPercentageOption;
