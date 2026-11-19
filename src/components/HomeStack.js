import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Comentarios" component={Comments} />
        </Stack.Navigator>
    );
}

export default HomeStack;