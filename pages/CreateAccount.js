import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Provider as PaperProvider, Dialog, Portal, DefaultTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1877F2',
    accent: '#1877F2',
  },
};

export default function CreateAccount({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState('');

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleCreateAccount = () => {
    setResult('');
    if (!validateEmail(email)) {
      setResult('O e-mail fornecido não é válido!');
      return;
    }
    if (password !== confirmPassword) {
      setResult('As senhas não coincidem!');
      return;
    }
    if ( !name || !email || !password || !confirmPassword || !city || !country) {
      setResult('Todos os campos são obrigatórios!');
      return;
    }

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Authentication');
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <Image
              style={styles.logo}
              source={require('../assets/logoMarca_SISGEPS.png')}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.instruction}>Preencha o formulário de cadastro de usuário SisGeps</Text>

          <View style={styles.form}>
            <Text style={styles.titleTop}>Criar Conta</Text>

            {result ? <Text style={styles.resultText}>{result}</Text> : null}

            <TextInput
              label="Nome"
              placeholder="Digite seu Nome"
              value={name}
              mode="outlined"
              style={styles.textInput}
              onChangeText={setName}
              theme={{
                colors: {
                  background: '#f3f3f3',
                  primary: '#1877F2',
                  placeholder: '#888',
                },
              }}
            />

            <TextInput
              label="E-mail"
              placeholder="Digite seu Email"
              value={email}
              mode="outlined"
              style={styles.textInput}
              onChangeText={setEmail}
              theme={{
                colors: {
                  background: '#f3f3f3',
                  primary: '#1877F2',
                  placeholder: '#888',
                },
              }}
            />

            <TextInput
              label="Senha"
              placeholder="Crie sua Senha"
              value={password}
              mode="outlined"
              secureTextEntry
              style={styles.textInput}
              onChangeText={setPassword}
              theme={{
                colors: {
                  background: '#f3f3f3',
                  primary: '#1877F2',
                  placeholder: '#888',
                },
              }}
            />

            <TextInput
              label="Confirmar Senha"
              placeholder="Repita sua Senha"
              value={confirmPassword}
              mode="outlined"
              secureTextEntry
              style={styles.textInput}
              onChangeText={setConfirmPassword}
              theme={{
                colors: {
                  background: '#f3f3f3',
                  primary: '#1877F2',
                  placeholder: '#888',
                },
              }}
            />

            <TextInput
              label="Cidade"
              placeholder="Digite sua Cidade"
              value={city}
              mode="outlined"
              style={styles.textInput}
              onChangeText={setCity}
              theme={{
                colors: {
                  background: '#f3f3f3',
                  primary: '#1877F2',
                  placeholder: '#888',
                },
              }}
            />

            <TextInput
              label="País"
              placeholder="Digite seu País"
              value={country}
              mode="outlined"
              style={styles.textInput}
              onChangeText={setCountry}
              theme={{
                colors: {
                  background: '#f3f3f3',
                  primary: '#1877F2',
                  placeholder: '#888',
                },
              }}
            />

            <TouchableOpacity style={styles.customButton} onPress={handleCreateAccount}>
              <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Portal>
          <Dialog visible={modalVisible} onDismiss={handleCloseModal}>
            <Dialog.Title>Sucesso</Dialog.Title>
            <Dialog.Content>
              <Text>Conta criada com sucesso!</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCloseModal}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </PaperProvider>
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
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  headerLogo: {
    width: '100%',
    height: '120%',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '55%'
  },
  body: {
    flex: 9.7,
    width: '100%',
    alignItems: 'center'
  },
  instruction: {
    fontSize: RFValue(18),
    paddingBottom: 10,
    width: '80%',
    textAlign: 'center',
    color: '#495057',
  },
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3
  },
  titleTop: {
    fontWeight: 'bold',
    fontSize: RFValue(18),
    marginBottom: 10,
  },
  resultText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    marginBottom: 16,
    height: 50
  },
  customButton: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#1877F2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});
