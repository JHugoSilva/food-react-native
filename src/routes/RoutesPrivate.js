import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Principal from '../screens/principal/principal';
import Cardapio from '../screens/cardapio/cardapio';
import Busca from '../screens/busca/busca';
import DetalheProduto from '../screens/detalhe-produto/detalhe-produto';
import DetalhePedido from '../screens/detalhe-pedido/detalhe-pedido';
import MeuPedido from '../screens/meu-pedido/meu-pedido'
import { Alert, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator();

function RoutesPrivate() {
    return <NavigationContainer>
         
        <Stack.Navigator>
            <Stack.Screen
                name="principal"
                component={Principal}
                options={{
                    headerShown: false
                }}
            />
              <Stack.Screen
                name='busca'
                component={Busca}
                options={{
                    title:"Resultados de busca",
                    headerTitleAlign:"center",
                    headerTintColor: COLORS.dark_gray,
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen
                name="detalhe-pedido"
                component={DetalhePedido}
                options={{
                    headerShadowVisible: false,
                    title: 'Pedidos',
                    headerTitleAlign: 'center',
                    animation: 'slide_from_left'
                }}
            />
            <Stack.Screen
                name="meu-pedido"
                component={MeuPedido}
                options={{
                    headerShadowVisible: false,
                    title: 'Meus Pedidos',
                    headerTitleAlign: 'center',
                    animation: 'slide_from_left',
                  
                }}
            />
            <Stack.Screen
                name="detalhe-produto"
                component={DetalheProduto}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='cardapio'
                component={Cardapio}
                options={{
                    headerShown: false
                }}
            />
         
        </Stack.Navigator>
    </NavigationContainer>
}
export default RoutesPrivate