import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Dialog, Portal, Button, TextInput, DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1877F2',
    accent: '#1877F2',
  },
};

export default function RecoverAccount() {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleButtonPress = async () => {
    if (!email.trim()) {
      setErrorMessage('O campo de email não pode estar vazio.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('O formato do email é inválido.');
      return;
    }

    setModalVisible(true);
    setErrorMessage('');
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
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
          <Text style={styles.instrution}>
            Recupere sua conta e redefina sua senha através do email que iremos enviar
          </Text>
          <View style={styles.form}>
            <Text style={styles.titleTop}>Recuperar conta</Text>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                label='Email'
                placeholder='Informe o seu email'
                mode='outlined'
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
            </View>

            <View style={styles.buttonEnter}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={handleButtonPress}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Portal>
          <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
            <Dialog.Title>Email enviado!</Dialog.Title>
            <Dialog.Content>
              <Text>
                Confira a caixa de entrada e de spam do seu email, se a conta existir você receberá instruções sobre como resgatá-la.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => navigation.navigate('Authentication')}>Voltar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
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
    width: '55%',
  },
  body: {
    flex: 9.7,
    width: '100%',
    alignItems: 'center',
  },
  instrution: {
    fontSize: RFValue(18),
    paddingBottom: 10,
    width: '80%',
    textAlign: 'center',
    color: '#495057',
  },
  form: {
    width: '90%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  titleTop: {
    fontWeight: 'bold',
    fontSize: RFValue(18),
  },
  inputContainer: {
    width: '95%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  textInput: {
    width: '100%',
    marginBottom: 18,
    height: 50,
  },
  buttonEnter: {
    width: '88%',
    height: '12%',
    alignItems: 'flex-end',
  },
  customButton: {
    width: 74,
    height: 37.5,
    backgroundColor: '#1877F2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    fontSize: RFValue(14),
    textAlign: 'center',
  },
});
