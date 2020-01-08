import React, { useState, useEffect } from 'react';
import { SafeAreaView, AsyncStorage, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('')
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert(`Solitação de reserva enviado`);

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }
  return (
    <SafeAreaView style={style.conatainer}>
      <Text style={style.label}>DATA DE INTERESSE *</Text>
        <TextInput
          style={style.input}
          placeholder='Seu e-mail'
          placeholderTextColor='#999'
          autoCapitalize='none'
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />
                <TouchableOpacity onPress={handleSubmit} style={style.button} >
          <Text style={style.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={[style.button, style.cancelButton]} >
          <Text style={style.buttonText}>Cancela</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  conatainer:{
    marginTop: Constants.statusBarHeight,
    margin:30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop:30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop:10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})