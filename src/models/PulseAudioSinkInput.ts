type PulseAudioSinkInput = {
    index: number
    name: string
    module: number
    client: number
    sink: number
    sampleSpec: {
        format: number
        channels: number
        rate: number
    }
    volume: number[]
    latency: {
        minimum: number
        maximum: number
    }
    resampleMethod: string
    driver: string
    muted: boolean
    properties: {
        media: {
            role: string
            name: string
        },
        application: {
            name: string
            process: unknown
            language: string
        }
        'native-protocol': {
            peer: string
            version: string
        }
        window: {
            x11: unknown
        }
        'module-stream-restore': {
            id: string
        }
    }
    corked: boolean
    hasVolume: boolean
    writableVolume: boolean
    formatInfo: {
        encoding: number
        properties: unknown
    }
};

export default PulseAudioSinkInput;
