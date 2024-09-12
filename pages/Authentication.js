import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-paper';
import {useState} from 'react';
import supabase from '../database/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Authentication({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/logoMarca_SISGEPS.png')}
            resizeMode="contain"/>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.instrution}>Faça o login na sua conta e tenha acesso ao estoque e a todas as ferramentas do SisGeps</Text>
        <View style={styles.form}>
          <Text style={styles.titleTop}>Acesse</Text>
          
          {result ? <Text style={styles.resultText}>{result}</Text> : null}

            <View style={styles.inputContainer}>
              <TextInput
                label='Email'
                placeholder='Informe o seu email'
                mode='outlined'
                style={styles.textInput}
                inputStyle={{backgroundColor: '#f3f3f3'}}
                onChangeText={setEmail}
                theme={{
                  colors: {
                    background: '#f3f3f3',
                    primary: '#1877F2',
                    placeholder: '#888',
                  }
                }}
              />
            
              <TextInput
                label='Senha'
                placeholder='Informe a sua Senha'
                mode='outlined'
                style={styles.textInput}
                inputStyle={{backgroundColor: '#f3f3f3'}}
                onChangeText={setPassword}
                secureTextEntry={true}
                theme={{
                  colors: {
                    background: '#f3f3f3',
                    primary: '#1877F2',
                    placeholder: '#888',
                  }
                }}
              />
              <Text
                style={styles.forgotPassword}
                onPress={()=>{navigation.navigate('RecoverAccount', )}}
              >Esqueci minha senha</Text>
            </View>
          <View style={styles.buttonEnter}>
            <TouchableOpacity
            style={styles.customButton}
            onPress={ async () =>{
              setResult('')
              let {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
              });
              if (error===null) {
                await AsyncStorage.setItem('user', email)
                navigation.navigate('Stock', {username: email})
              }
              else {
                setResult('Usuário/Senha incorretos!')
              }
            }}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

          </View>
          <Text>Não tem conta? <Text
            style={{color: '#0000FF'}}
            onPress={()=>{navigation.navigate('CreateAccount')}}
          >Criar conta</Text></Text>
        </View>
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
  instrution: {
    fontSize: RFValue(18),
    paddingBottom: 10,
    width: '80%',
    textAlign: 'center',
    color: '#495057',
  },
  form: {
    width: '90%',
    height: 380,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3
  },
  titleTop: {
    fontWeight: 'bold',
    fontSize: RFValue(18)
  },
  resultText: {
    color: 'red',
    textAlign: 'center',
  },
  inputContainer: {
    width: '95%',
    alignItems: 'flex-start',
    paddingHorizontal: 10
  },
  textInput: {
    width: '100%',
    marginBottom: 18,
    height: 50,
    
  },
  forgotPassword: {
    fontStyle: 'italic',
    color: '#0000FF'
  },
  buttonEnter: {
    width: '88%',
    height:'12%',
    alignItems: 'flex-end'
  },
  customButton: {
    width: 74,
    height: 37.5,
    backgroundColor: '#1877F2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 500,
    color: 'white'
  },
})