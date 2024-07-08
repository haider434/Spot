import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; 
import NumberInputScreen from './NumberInputScreen'
import DebitcardScreen from './DebitcardScreen';
import AdressScreen from './AdressScreen';
import EmailScreen from './EmailScreen';
import PrivacyScreen from './PrivacyScreen';
import OTPScreen from './OTPScreen';
const Stack = createStackNavigator();
import AppLoading from './AppLoading';
import ThankyouScreen from './ThankyouScreen';
const Routes = () => {
  return (
    <AppLoading>
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false, }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="NumberInputScreen" component={NumberInputScreen}  options={{ title: 'NumberInputScreen' }} />
      <Stack.Screen name='DebitcardScreen' component={DebitcardScreen} />
      <Stack.Screen name='OTPScreen' component={OTPScreen} />
      <Stack.Screen name='AddressScreen' component={AdressScreen} />
      <Stack.Screen name='EmailScreen' component={EmailScreen} />
      <Stack.Screen name='PrivacyScreen' component={PrivacyScreen} />
      <Stack.Screen name='AppLoading' component={AppLoading} />
      <Stack.Screen name='ThankyouScreen' component={ThankyouScreen} />

    </Stack.Navigator>
    </AppLoading>
)};

export default Routes;
