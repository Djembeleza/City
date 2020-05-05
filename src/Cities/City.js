import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme'
import { CityContext } from '../context/CityContext';

export default function City({ route }) {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [cities, setCities] = useContext(CityContext);

    // Event functions
    const handleName = (val) => {
        setName(val);
    }

    const handleInfo = val => {
        setInfo(val);
    }


    const addItemToStorage = async (val) => {
        try {
            await AsyncStorage.setItem('@saved_cities', JSON.stringify(val));

        } catch (e) {
            console.log(e);
            Alert.alert("Error", "Failed to saved data to the storage.");
        }
    }

    const addLocation = () => {
        if (name === '' || info === '') {
            Alert.alert("Incomplete Input", 'Please enter the required fields.');
            return
        }

        const { city } = route.params;

        const location = {
            name: name,
            info: info
        }

        const index = cities.findIndex(item => {
            return item.city === city;
        })

        if (index === -1) {
            Alert.alert("City Not Found", 'City does not exist');
            return
        }

        const chosenCity = cities[index];
        const oldLocations = [...chosenCity.locations];
        chosenCity.locations = [...oldLocations, location];


        const newCities = [...cities.slice(0, index), chosenCity, ...cities.slice(index + 1)];

        addItemToStorage(newCities);
        setCities(newCities);
        setName('');
        setInfo('');
    }

    const removeLocation = () => {

    }

    const city = cities.find(item => {
        return item.city === route.params.city;
    });

    console.log(city);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView contentContainerStyle={[!city.locations.length && { flex: 1 }]}>
                <View style={[styles.locationsContainer, !city.locations.length && { flex: 1, justifyContent: 'center' }]}>
                    {!city.locations.length && <CenterMessage message='No locations for this city' />}
                    {city.locations.map((loca, index) => (
                        <View key={index} style={styles.locationContainer}>
                            <Text style={styles.locationName}>{loca.name}</Text>
                            <Text style={styles.locationInfo}>{loca.info}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TextInput onChangeText={val => handleName(val)}
                placeholder='Location name....'
                value={name} placeholderTextColor='black'
                style={[styles.input]}
            />
            <TextInput
                onChangeText={val => handleInfo(val)}
                placeholder='Location info...'
                value={info}
                placeholderTextColor='black'
                style={[styles.input, styles.input2]}
            />
            <TouchableOpacity onPress={addLocation}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add Location</Text>
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
        margin: 10,
    },
    buttonText: {
        color: colors.other,
        fontSize: 18
    },
    locationContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        paddingVertical: 10,
        paddingLeft: 5,

    },
    locationsContainer: {
        flexDirection: 'column',
        marginBottom: 30,
        flex: 1
    },
    locationName: {
        fontWeight: '800',
        fontSize: 20,
        textAlign: 'left'
    },
    locationInfo: {
        fontSize: 12,
        textAlign: 'left'

    },
    input: {
        backgroundColor: colors.tertiary,
        height: 60,
        marginBottom: 15
    },
    input2: {

    }
})