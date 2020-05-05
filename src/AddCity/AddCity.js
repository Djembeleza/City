import React, { useState, useContext, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'
import { colors } from '../theme'
import { CityContext } from '../context/CityContext';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddCity({ navigation }) {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useContext(CityContext);
    // Functions
    const addCity = (city) => {
        const c = cities;
        setCities([...c, city]);
        addItemToStorage([...c, city]);

    }

    const addItemToStorage = async (val) => {
        try {
            await AsyncStorage.setItem('@saved_cities', JSON.stringify(val));
        } catch (e) {
            Alert.alert("Error", "Failed to saved data to the storage.");
        }
    }


    const handleCity = (v) => {
        setCity(v);
    }

    const handleCountry = (v) => {
        setCountry(v);
    }

    const handleSubmit = () => {
        if (city === '' || country === '') {
            Alert.alert('Incomplete Form', 'Please complete the form.')
            return
        }
        const chosenCity = {
            city: city,
            country: country,
            id: uuidv4(),
            locations: []
        }
        addCity(chosenCity);
        setCity('');
        setCountry('');
        navigation.navigate('Cities');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Cities</Text>
            <TextInput
                placeholder='City name....'
                onChangeText={val => handleCity(val)}
                value={city}
                style={styles.input}
            />
            <TextInput
                placeholder='Country name...'
                onChangeText={val => handleCountry(val)}
                style={styles.input}
                value={country}
            />

            <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add City</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: colors.other,
        fontSize: 18
    },
    heading: {
        color: colors.default,
        fontSize: 40,
        marginBottom: 10,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: 'center'
    },
    input: {
        margin: 10,
        backgroundColor: colors.tertiary,
        paddingHorizontal: 8,
        height: 50
    }
})
