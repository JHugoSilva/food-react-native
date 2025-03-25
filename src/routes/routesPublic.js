import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/login/login';
import Register from '../screens/registro/registro';
import Register2 from '../screens/registro2/registro';

const Stack = createNativeStackNavigator();

function routesPublic() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='login'
                component={Login}
                options={{
                    headerShown: false

                }}
            />
            <Stack.Screen
                name='register'
                component={Register}
                options={{
                    //headerShown:false 
                    headerShadowVisible: false,
                    title: "",
                    headerBackTitle: "Voltar"
                }}
            />
            <Stack.Screen
                name='register2'
                component={Register2}
                options={{
                    //headerShown:false 
                    headerShadowVisible: false,
                    title: "",
                    headerBackTitle: "Voltar"
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
}

export default routesPublic