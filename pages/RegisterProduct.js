import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../database/Database';

export default function Autentication({ route, navigation }) {
  //const {username} = route.params;
  //const [data, setData] = useState([]);
  const [result, setResult] = useState();
  const [product_name, setProduct_name] = useState();
  const [category, setCategory] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [amount, setAmount] = useState();
  const [value_per_unit, setValue_per_unit] = useState();
  
  useEffect(() => {
    async function teste() {
      const value = await AsyncStorage.getItem('user');
      if (value != null) setUser(value);
      else setUser('ERRO!');
    }
    teste();
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/logoMarca_SISGEPS.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.body}>
        <Text h2>Cadastrar Produto</Text>
        <Input
          label="Nome do Produto"
          inputStyle={{ backgroundColor: '#f3f3f3' }}
          onChangeText={setProduct_name}
        />
        <Input
          label="Categoria"
          inputStyle={{ backgroundColor: '#f3f3f3' }}
          onChangeText={setCategory}
        />
        <Input
          label="Fabricante"
          inputStyle={{ backgroundColor: '#f3f3f3' }}
          onChangeText={setManufacturer}
        />
        <Input
          label="Quantidade"
          inputStyle={{ backgroundColor: '#f3f3f3' }}
          onChangeText={setAmount}
        />
        <Input
          label="Valor por Unidade"
          inputStyle={{ backgroundColor: '#f3f3f3' }}
          onChangeText={setValue_per_unit}
        />
        <TouchableOpacity
          style={styles.customButton}
          onPress={async () => {
            const { data, error } = await supabase
              .from('products')
              .insert([
                {
                  product_name: product_name,
                  category: category,
                  manufacturer: manufacturer,
                  amount: amount,
                  value_per_unit: value_per_unit,
                },
              ]);
            if (error === null) {
              setResult('Cadastro realizado com sucesso!');
              console.log(data);
            } else {
              setResult(error);
            }
          }}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
        <Text>{result}</Text>
      </View>
    </View>
  );
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
    width: '55%',
  },
  body: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'top',
  },
  customButton: {
    width: '30%',
    height: '7%',
    backgroundColor: '#1877F2',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
