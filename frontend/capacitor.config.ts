import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studybuddy.app',
  appName: 'Study Buddy',
  webDir: 'dist',
  android: {
    // This spoofs the User Agent so Google doesn't block the WebView for OAuth
    overrideUserAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "84101386844-13n5f21bdbkprti941bgtbgtq680t406.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  },
  server: {
    cleartext: true
  }
};

export default config;
