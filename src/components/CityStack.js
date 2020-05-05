import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Cities from '../Cities/Cities'
import City from '../Cities/City'


const Stack = createStackNavigator();

const CityStack = () => {
    return (
        <Stack.Navigator initialRouteName='Cities'>
            <Stack.Screen name='Cities' component={Cities} />
            <Stack.Screen name='City' component={City} options={({ route }) => ({ title: route.params.city })} />
        </Stack.Navigator>
    )
}

export default CityStack