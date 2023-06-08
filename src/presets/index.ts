import type { CompanionPresetDefinitions } from '@companion-module/base';
import sourceMute from './sourceMute';
import sinkMute from './sinkMute';
import sinkInputMute from './sinkInputMute';
import sinkInputVolumeAdjust from './sinkInputVolumeAdjust';

const presets: CompanionPresetDefinitions = {
    sourceMute,
    sinkMute,
    sinkInputMute,
    sinkInputVolumeAdjust,
};

export default presets;
