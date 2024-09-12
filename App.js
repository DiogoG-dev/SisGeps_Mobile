import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import RecoverAccount from './pages/RecoverAccount'
import CreateAccount from './pages/CreateAccount';
import Stock from './pages/Stock';
import Calculator from './pages/Calculator'
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
          name="Authentication"
          component={Authentication}
        />
        <Stack.Screen
          name="RecoverAccount"
          component={RecoverAccount}
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
          name="Calculator"
          component={Calculator}
        />
        <Stack.Screen
          name="Shortly"
          component={Shortly}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
