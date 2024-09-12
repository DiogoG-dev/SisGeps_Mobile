import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text } from '@rneui/themed';
import { useState, useEffect } from 'react';
import supabase from '../database/Database';

export default function Authentication({ route, navigation }) {
  const { username } = route.params;
  const { id_product } = route.params;
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [result, setResult] = useState('');
  const [textButton, setTextButton] = useState('Cadastrar');
  const [product_name, setProduct_name] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [amount, setAmount] = useState('');
  const [value_per_unit, setValue_per_unit] = useState('');

  useEffect(() => {
    async function getDataProduct() {
      if (id_product !== 0) {
        let { data: products, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id_product);

        if (error === null) {
          const product = products[0];
          setProduct_name(product.product_name);
          setCategory(product.category);
          setManufacturer(product.manufacturer);
          setAmount(product.amount.toString());
          setValue_per_unit(product.value_per_unit.toString());
          setTextButton('Atualizar');
        } else {
          console.error('Erro ao buscar produto:', error);
        }
      }
    }
    getDataProduct();
  }, [id_product]);

  const handleAmountChange = (value) => {
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleValuePerUnitChange = (value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setValue_per_unit(value);
    }
  };

  const handleSubmit = async () => {
    if (isNaN(amount) || isNaN(value_per_unit)) {
      setResult('Por favor, insira apenas números em "Quantidade" e "Valor"!');
      return;
    }

    if (!product_name || !category || !manufacturer || !amount || !value_per_unit) {
      setResult('Por favor, preencha todos os campos!');
      return;
    }

    if (id_product === 0) {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          product_name,
          category,
          manufacturer,
          amount: parseInt(amount),
          value_per_unit: parseFloat(value_per_unit),
        }])
        .select();

      if (error) {
        setResult('Erro ao cadastrar produto.');
        console.error(error);
      } else {
        setResult('Cadastro realizado com sucesso!');
        setData(data);
        setTimeout(() => navigation.navigate('Stock', { username }), 1000);
      }

    } else {
      const { data, error } = await supabase
        .from('products')
        .update({
          product_name,
          category,
          manufacturer,
          amount: parseInt(amount),
          value_per_unit: parseFloat(value_per_unit),
        })
        .eq('id', id_product)
        .select();

      if (error) {
        setResult('Erro ao atualizar produto.');
        console.error(error);
      } else {
        setResult('Atualização realizada com sucesso!');
        setData(data);
        setTimeout(() => navigation.navigate('Stock', { username }), 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text h3>{textButton} Produto</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Produto"
            placeholder="Informe o nome do Produto"
            mode="outlined"
            style={styles.input}
            theme={styles.textInputTheme}
            onChangeText={setProduct_name}
            value={product_name}
          />
          <TextInput
            label="Categoria"
            placeholder="Informe a Categoria"
            mode="outlined"
            style={styles.input}
            theme={styles.textInputTheme}
            onChangeText={setCategory}
            value={category}
          />
          <TextInput
            label="Fabricante"
            placeholder="Informe o Fabricante"
            mode="outlined"
            style={styles.input}
            theme={styles.textInputTheme}
            onChangeText={setManufacturer}
            value={manufacturer}
          />
          <TextInput
            label="Quantidade"
            placeholder="Informe a Quantidade"
            mode="outlined"
            style={styles.input}
            theme={styles.textInputTheme}
            onChangeText={handleAmountChange}
            value={amount}
            keyboardType="numeric"
          />
          <TextInput
            label="Valor(R$)"
            placeholder="Informe o Valor por Unidade"
            mode="outlined"
            style={styles.input}
            theme={styles.textInputTheme}
            onChangeText={handleValuePerUnitChange}
            value={value_per_unit}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>{textButton}</Text>
        </TouchableOpacity>
        {result ? <Text style={styles.resultText}>{result}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE9E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f3f3f3',
    marginBottom: 15,
  },
  textInputTheme: {
    colors: {
      primary: '#1877F2',
      placeholder: '#888',
    },
  },
  customButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
