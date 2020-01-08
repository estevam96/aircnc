import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storeTechs => {
      const techsArray = storeTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Image style={style.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
});