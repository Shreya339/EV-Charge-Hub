import { View, Text, StyleSheet, Button} from 'react-native'
import React from 'react'
import colors from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function GoogleOAuth() {
    useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      // ({
      //   redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      // })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

    return (
        <View>
            <TouchableOpacity style={styles.loginButton} onPress={onPress}>
                <Text style={{
                    color: colors.white,
                    textAlign: 'center',
                    fontFamily: 'outfit',
                    fontSize: 17
                }}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: colors.primary,
        padding: 16,
        display: 'flex',
        borderRadius: 99,
        marginTop: 40
      }
})