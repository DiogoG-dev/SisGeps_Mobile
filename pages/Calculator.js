import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const storeValues = (value) => {
    setInput(prevInput => prevInput + value);
  }

  const calculate = () => {
    try {
      //setResult(eval(input));
      const result = eval(input);
      if (result === Infinity || result === -Infinity) {
        setResult('Error');
      } else {
        setResult(result.toString());
        }
    } catch (e) {
      setResult('Error');
    }
  };

  const clearValues = () => {
    setInput('');
    setResult('');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.buttonDelete} onPress={clearValues} testID="button-delete">
        <Image style={styles.deleteIcon} source={require('../assets/delete.png')}/>
      </TouchableOpacity>

      <View style={styles.result}>
        <Text style={styles.resultText} testID="result-text">{result || input || 0}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(1)} testID="button-1">
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(2)} testID="button-2">
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(3)} testID="button-3">
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues('/')} testID="button-divide">
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(4)} testID="button-4">
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(5)} testID="button-5">
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(6)} testID="button-6">
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues('*')} testID="button-multiply">
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(7)} testID="button-7">
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(8)} testID="button-8">
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(9)} testID="button-9">
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues('-')} testID="button-subtract">
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues(0)} testID="button-0">
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.equalButton} onPress={calculate} testID="button-equal">
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => storeValues('+')} testID="button-add">
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    width: '100%',
    alignItems: 'flex-end'
  },
  deleteIcon: {
    width: 30,
    height: 30,
    marginTop: 50,
    marginRight: 20
  },
  result: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  resultText: {
    color: 'white',
    fontSize: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
  button: {
    width: '22%',
    height: 80,
    margin: 5,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  equalButton: {
    width: '47%',
    height: 80,
    margin: 5,
    backgroundColor: '#6f95ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});
