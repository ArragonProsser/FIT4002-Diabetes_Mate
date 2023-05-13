import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function History() {
    const styles = StyleSheet.create({
        addButtonContainer: {
            position: 'absolute',
            bottom: 30,
            right: 30,
            backgroundColor: '#5398FF',
            borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                History
            </Text>
            <TouchableOpacity style={styles.addButtonContainer}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
        </View>
    )
}