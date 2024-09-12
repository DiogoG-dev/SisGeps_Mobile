import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from '@expo/vector-icons/Feather';

export default function Home({navigation}){
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
        <Image
          style={styles.imgEstoque}
          source={require('../assets/gerenciamentoEstoque.png')}
          resizeMode="contain"/>
        <Text style={styles.staff}>
          A melhor ferramenta para gerenciar o seu estoque de forma inteligente!
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Authentication')}} style={styles.customButton}>
          <Text style={styles.buttonText}>Entrar na conta <Text style={styles.boldText}>SisGeps</Text></Text>
        </TouchableOpacity>
        <Text style={styles.information}>
          Clique para <Text style={styles.boldText}>acessar</Text> ou <Text style={styles.boldText}>criar</Text> sua conta SisGeps
        </Text>
        <View style={styles.socialMedia}>
          <Feather name="instagram" size={23} color="#1877F2" />
          <Feather name="facebook" size={23} color="#1877F2" />
          <Feather name="youtube" size={23} color="#1877F2" />
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
    flex: 1
  },
  header: {
    flex: 2,
    width: '100%',
    alignItems: 'center'
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
    flex: 7,
    width: '100%',
    alignItems: 'center'
  },
  imgEstoque: {
    height: '60%'
  },
  staff: {
    width: '70%',
    marginTop : '5%',
    fontSize: RFValue(20),
    textAlign: 'center',
    color: '#495057'
  },
  footer: {
    flex: 2.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  customButton: {
    width: '73%',
    height:'23%',
    backgroundColor: '#1877F2',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: RFValue(16),
    color: 'white'
  },
  information: {
    fontSize: RFValue(10),
    bottom: '10%'
  },
  socialMedia: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  boldText: {
    fontWeight: 'bold'
  }
})