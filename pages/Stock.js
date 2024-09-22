import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Button, Provider as PaperProvider, Dialog, Portal, DefaultTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../database/Database';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1877F2',
    accent: '#1877F2',
  },
};

export default function Authentication({ route, navigation }) {
  const { username } = route.params;
  const [user, setUser] = useState('INDEFINIDO');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const value = await AsyncStorage.getItem('user');
      if (value != null) setUser(value);
      else setUser('ERRO!');
    };

    fetchUser();
  }, []);

  const fetchProducts = async () => {
    const { data: products, error } = await supabase
    .from('products')
    .select('*');
    
    if (error === null) {
      setData(products);
    } else {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (selectedProductId) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProductId);

      if (error) {
        console.error('Error deleting product:', error);
      } else {
        setData(data.filter(item => item.id !== selectedProductId));
        setModalVisible(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode='tail'>
        {item.product_name}
      </Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode='tail'>
        {item.category}
      </Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode='tail'>
        {item.manufacturer}
      </Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode='tail'>
        {item.amount}
      </Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode='tail'>
        {item.value_per_unit}
      </Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('RegisterProduct', { id_product: item.id })}
          testID={`editButton-${item.id}`}
        >
          <Image style={styles.icons} source={require('../assets/edit.png')}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setSelectedProductId(item.id);
            setModalVisible(true);
          }}
          testID={`editButton-${item.id}`}
        >
          <Image style={styles.icons} source={require('../assets/deleteBlack.png')}/>
        </TouchableOpacity>
        
      </View>
    </View>
  );

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../assets/logoMarca_SISGEPS.png')} resizeMode="contain" />
        </View>
        <View style={styles.body}>

          <Text style={styles.instrution}>Bem vindo! Aqui você pode gerenciar os seus produtos no estoque.</Text>
          
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.customButtonRead}
              onPress={fetchProducts}
              testID='refreshButton'
            >
              <Image style={{backgroundColor: '#007BFF', width: 25, height: 25}} source={require('../assets/refresh.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.customButtonCreate}
              onPress={() => navigation.navigate('RegisterProduct', { id_product: 0 }, {username})}
              testID='createButton'
            >
              <Image style={{backgroundColor: '#277e1b', width: 23, height: 23}} source={require('../assets/create.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButtonCalc}
              onPress={() => navigation.navigate('Calculator', { id_product: 0 }, {username})}
              testID='calcButton'
            >
              <Image style={{backgroundColor: '#e69722', width: 30, height: 30}} source={require('../assets/calc.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.colorTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Produto</Text>
              <Text style={styles.headerText}>Categor.</Text>
              <Text style={styles.headerText}>Fabric.</Text>
              <Text style={styles.headerText}>Quantid.</Text>
              <Text style={styles.headerText}>Valor(R$)</Text>
              <Text style={styles.headerText}>Ações</Text>
            </View>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>

        <Portal>
          <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
            <Dialog.Title>Confirmar Exclusão</Dialog.Title>
            <Dialog.Content>
              <Text>Você tem certeza de que deseja retirar este produto do estoque?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setModalVisible(false)} testID='cancelDeleteButton'>Cancelar</Button>
              <Button onPress={handleDelete} testID='confirmDeleteButton'>Confirmar</Button>
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
    flex: 2.3,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '55%'
  },
  body: {
    flex: 9.7,
    width: '100%',
  },
  instrution: {
    fontSize: RFValue(18),
    width: '100%',
    paddingHorizontal: 50,
    textAlign: 'center',
    color: '#495057',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20
  },
  customButtonRead: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  customButtonCreate: {
    backgroundColor: '#277e1b',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  customButtonCalc: {
    backgroundColor: '#e69722',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  colorTable: {
    backgroundColor: '#f0f0f0',
    height: "100%"
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'start',
    overflow: 'hidden',
  },
  actionButtons: {
    flexDirection: 'row'
  },
  editButton: {
    backgroundColor: '#FFC107',
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f42d16',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  icons: {
    width: 20,
    height: 20
  },
});
