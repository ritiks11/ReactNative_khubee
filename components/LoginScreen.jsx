import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ backgroundColor: "#508D4E", width: "100%", height: "100%" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 150,
          //   borderWidth: 3,
          //   borderColor: "#000",
        }}
      >
        <Image
          source={require("./../assets/images/khubee01.png")}
          style={{
            width: 500,
            height: 250,
          }}
        />
      </View>

      <View style={styles.TagLineContainer}>
        <Text
          style={{
            color: "#D6EFD8",
            fontSize: 20,
            textAlign: "center",
            fontFamily: "montserrat-medium",
            marginTop: -40,
          }}
        >
          Your ultimate destination for{" "}
          <Text
            style={{
              color: "#F4CE14",
            }}
          >
            premium stationery!{" "}
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: "montserrat",
            fontSize: 16,
            textAlign: "center",
            color: "#1A5319",
            marginTop: 50,
            color: "#D6EFD8",
          }}
        >
          Get your favourite stationery now!
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "montserrat-medium",
              fontSize: 18,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TagLineContainer: {
    padding: 10,
    fontFamily: "roboto-medium",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#1A5319",
    padding: 15,
    borderRadius: 99,
    marginTop: 30,
    width: 200,
  },
});

export default LoginScreen;
