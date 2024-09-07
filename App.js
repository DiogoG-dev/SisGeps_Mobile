import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Autentication from './pages/Autentication';
import CreateAccount from './pages/CreateAccount';
import Stock from './pages/Stock';
import RegisterProduct from './pages/RegisterProduct';
import Shortly from './pages/Shortly';

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Autentication"
          component={Autentication}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
        />
        <Stack.Screen
          name="Stock"
          component={Stock}
        />
        <Stack.Screen
          name="RegisterProduct"
          component={RegisterProduct}
        />
        <Stack.Screen
          name="Shortly"
          component={Shortly}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
