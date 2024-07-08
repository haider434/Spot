import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const ThankyouScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/spot.png")} />
      <View style={styles.buttonContainer}>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: '#fff', marginTop: -30}}>Your Account has been created</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3B2F",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 50,
  },
 

});

export default ThankyouScreen;
