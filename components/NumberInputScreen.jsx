import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updatedUserInfo } from "@/store/slice/UserInfoSlice";
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const NumberInputScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loader

  const handleNumberChange = (formatted) => {
    const extracted = formatted.replace(/\D/g, "");
    let formattedPhoneNumber = "";
    for (let i = 0; i < extracted.length; i++) {
      if (i === 0) {
        formattedPhoneNumber += "(";
      } else if (i === 3) {
        formattedPhoneNumber += ") ";
      } else if (i === 6) {
        formattedPhoneNumber += "-";
      }
      formattedPhoneNumber += extracted[i];
    }
    setPhoneNumber(formattedPhoneNumber);
    dispatch(updatedUserInfo({ number: extracted }));
  };

  const isPhoneNumberValid = phoneNumber && phoneNumber.length === 14;

  const handleContinue = async () => {
    if (!isPhoneNumberValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setError("");
    setLoading(true); // Show loader

    // Dismiss keyboard before navigating
    Keyboard.dismiss();

    // Simulating async action, replace with actual API call
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigation.navigate("PrivacyScreen", { phoneNumber });
    }, 2000); // 2 seconds timeout, replace as needed with actual API call
  };

  const customTheme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      regular: { fontFamily: 'Poppins-Regular' },
      medium: { fontFamily: 'Poppins-Medium' },
    },
    colors: {
      ...DefaultTheme.colors,
      primary: 'grey',
      background: '#FFFFFF',
      placeholder: 'grey',
    },
  };

  return (
    <PaperProvider theme={customTheme}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter Mobile Phone Number</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.inputArea}>
            <PaperTextInput
              label={<Text style={styles.label}>Mobile Number</Text>}
              placeholder="(000) 000-0000"
              placeholderTextColor="grey"
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={handleNumberChange}
              keyboardType="numeric"
              mode="flat"
              maxLength={14}
              error={!!error}
              contentStyle={styles.inputContent}
              underlineColor="transparent"
              theme={customTheme}
              inputStyle={{ fontFamily: 'Poppins-Regular' }} // Apply Poppins font to input text
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.description}>
              You consent to receive automated texts to the mobile phone number provided
              for authentication and payment notifications from SPOT®. Text STOP to
              opt out and HELP for help. Message and data rates may apply.
            </Text>
            <TouchableOpacity
              style={[
                styles.continueButton,
                { backgroundColor: isPhoneNumberValid ? "#1E3B2F" : "#63927E" },
              ]}
              disabled={!isPhoneNumberValid || loading} // Disable button when loading
              onPress={handleContinue}
              activeOpacity={0.5}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text
                style={styles.footerText}
                onPress={() => navigation.navigate("PrivacyScreen")}
              >
                Terms of Use
              </Text>
              <Text style={styles.footerText}> • </Text>
              <Text
                style={styles.footerText}
                onPress={() => navigation.navigate("PrivacyScreen")}
              >
                Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Full-screen loader modal */}
        {loading && (
          <Modal transparent={true} visible={true} animationType="fade">
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          </Modal>
        )}

      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default NumberInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#1E3B2F",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 15,
    height: 95,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '650'
  },
  scrollViewContent: {
    flex: 1, // Use flex: 1 instead of flexGrow
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  textInput: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#7C7A7F",
    lineHeight: 40,
    fontFamily: 'Poppins-Regular'
  },
  inputContent:{
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: 20,
  },
  continueButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 10,
    color: "#5F5E61",
    paddingVertical: 8,
    fontFamily: 'Poppins-Regular',
    textAlign: "left",
    paddingHorizontal: 0
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    paddingLeft: 28,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#1E3B2F",
    fontSize: 13,
    fontWeight: "400",
    fontFamily: 'Poppins-Regular',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent grey background
    justifyContent: "center",
    alignItems: "center",
  },
});
