import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="home" size={24} color="#D85A30" />
        }}
      />
      <Tab.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="#D85A30" />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={24} color="#D85A30" />
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;
