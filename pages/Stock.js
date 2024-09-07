import {View, Text, StyleSheet, Image, TouchableOpacity,} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../database/Database';

export default function Autentication({route, navigation}){
  const {username} = route.params;
  const [data, setData] = useState([]);
    useEffect(() => {
      async function teste() {
        const value = await AsyncStorage.getItem('user');
        if (value!=null) setUser(value);
        else setUser('ERRO!')
      }
      teste();
    })
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logoMarca_SISGEPS.png')} resizeMode="contain"/>
      </View>
      <View style={styles.body}>
        <Text>Bem vindo: {JSON.stringify(username)}</Text>
        <TouchableOpacity
          style={styles.customButton}
          onPress={async ()=>{
            let { data: products, error } = await supabase.from('products').select('*');
            if (error===null) {
              setData(products)
            }
          }}>
          <Text>Mostrar</Text>
        </TouchableOpacity>
        <View>
          <Text>| Produto | Categoria | Fabricante | Quantidade | Valor |</Text>
          {data.map(line=>{
            return(<Text key={line.key}>| {line.product_name} | {line.category} | {line.manufacturer} | {line.amount} | {line.value_per_unit} |</Text>);
          })}
        </View>
        <TouchableOpacity
          style={styles.customButton2}
          onPress={()=>{navigation.navigate('RegisterProduct')}}>
          <Text>Cadastrar Novo Produto</Text>
        </TouchableOpacity>
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
  customButton: {
    width: '30%',
    height:'7%',
    backgroundColor: '#1877F2',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  customButton2: {
    width: '50%',
    height:'7%',
    backgroundColor: '#1877F2',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
})