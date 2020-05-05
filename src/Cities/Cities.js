import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native'
import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme'
import { CityContext } from '../context/CityContext'
import AsyncStorage from '@react-native-community/async-storage'

export default function Cities({ navigation }) {

    const [cities, setCities] = useContext(CityContext);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@saved_cities');
            if (value !== null) {
                console.log('Fetching city data.......');
                console.log(value);
                setCities(JSON.parse(value));
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to fetch data from storage.');
        }
    }

    const navigate = (item) => {
        navigation.navigate('City', { city: item.city })
    }

    useEffect(() => {

        getData();
    }, [])

    return (
        <ScrollView contentContainerStyle={[!cities.length && { flex: 1 }]}>
            <View style={[!cities.length && { justifyContent: 'center', flex: 1 }]}>
                {!cities.length && <CenterMessage message="No saved cities!" />}
                {cities.map((item) => (
                    <TouchableWithoutFeedback onPress={() => navigate(item)} key={item.id}>
                        <View style={styles.cityContainer}>
                            <Text style={styles.city}>{item.city}</Text>
                            <Text style={styles.country}>{item.country}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    cityContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary
    },
    city: {
        fontSize: 20,
    },
    country: {
        color: 'rgba(0, 0, 0, .5)'
    }
})