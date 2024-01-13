import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'ev.ai.englishspanish.assistant',
  appName: 'ai-assistant',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Native,
    },
  },
};

export default config;
