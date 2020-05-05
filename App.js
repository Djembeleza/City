import 'react-native-gesture-handler';
import * as React from 'react';
import { Component, useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Cities from './src/Cities/Cities';
import City from './src/Cities/City';
import AddCity from './src/AddCity/AddCity';
import CityStack from './src/components/CityStack'
import { colors } from './src/theme';
import { CityProvider } from './src/context/CityContext';

const Tab = createBottomTabNavigator();
function App() {

  return (

    <CityProvider>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
          activeBackgroundColor: colors.random,
          inactiveBackgroundColor: colors.another,
        }}>
          <Tab.Screen name='CityStack' component={CityStack} options={{ title: 'Cities' }} />
          <Tab.Screen name='Add City' component={AddCity} />
        </Tab.Navigator>
      </NavigationContainer>
    </CityProvider>
  );
}

export default App;