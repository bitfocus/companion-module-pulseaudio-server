export type PulseAudioSource = {
    name: string
    index: number
    description: string
    mute: boolean
    volume: {
        current: number[]
        base: number
        steps: number
    }
};

export type PulseAudioSink = PulseAudioSource;
