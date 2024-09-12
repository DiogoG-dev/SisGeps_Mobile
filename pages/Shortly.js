import {View, Text, StyleSheet, Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Shortly(){
    useEffect(() => {
    const fetchUser = async () => {
      const value = await AsyncStorage.getItem('user');
      if (value != null) setUser(value);
      else setUser('ERRO!');
    };

    fetchUser();
  }, []);
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logoMarca_SISGEPS.png')} resizeMode="contain"/>
      </View>
      <View style={styles.body}>
        <Text style={styles.shortly}>Em Breve!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DCE9E2',
    flex: 1,
  },
  header: {
    flex: 2.3,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '55%'
  },
  body: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shortly: {
    color:  '#1877F2',
    fontSize: RFValue(50),
    fontWeight: 600
    
  }
})