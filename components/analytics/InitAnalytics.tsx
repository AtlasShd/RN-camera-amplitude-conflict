import { useEffect, useState } from 'react';
import { AmpMaskView } from '@amplitude/plugin-session-replay-react-native';
import { Amplitude } from './Amplitude';

export function InitAnalytics() {
  const [isInited, setIsInited] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Amplitude.init();

        setIsInited(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return isInited && <AmpMaskView mask='amp-mask' />;
}
