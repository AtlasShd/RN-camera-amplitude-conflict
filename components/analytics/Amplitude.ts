import { add, init } from '@amplitude/analytics-react-native';
import { SessionReplayPlugin } from '@amplitude/plugin-session-replay-react-native';
import type { SessionReplayConfig } from '@amplitude/plugin-session-replay-react-native';

export class Amplitude {
  static async init() {
    if (!process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY) {
      console.error(
        'Amplitude API key not set. Skipping Amplitude initalization. Current value:',
        process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY,
      );
      return;
    }

    await init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY).promise;
    const config: SessionReplayConfig = {
      enableRemoteConfig: true,
      sampleRate: 1,
    };
    await add(new SessionReplayPlugin(config)).promise;

    console.debug('Amplitude is inited');
  }
}
