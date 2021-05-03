import React from 'react';
import InitialScreen from "./source/screen/InitialScreen"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BitcoinScreen from "./source/screen/BitcoinScreen"
import NewsScreen from "./source/screen/NewsScreen"
import StocksScreen from "./source/screen/StocksScreen"
import GraphScreen from "./source/screen/GraphScreen"
import StockMarketGraph from "./source/screen/StockMarketGraph"
import {Provider} from 'react-redux';
import store from "./source/redux/store"
import ProfileScreen from "./source/screen/ProfileScreen"
const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

const AppStack = () => {
  return(
    <BottomTab.Navigator
      tabBarLabel={false}
      tabBarOptions={{
        activeTintColor:"#fac673",
        showLabel:false,
        activeBackgroundColor:"white",
        //inactiveBackgroundColor:"#faf5ed"
      }}
    >
      <BottomTab.Screen 
        name="News" 
        component={NewsScreen}
        options={{
          tabBarLabel : "News",
          tabBarIcon : ({color,size}) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size}/>
          )
        }}
      />
      <BottomTab.Screen
        name="Stocks"
        component={StocksScreen}
        options={{
          tabBarLabel : "Stocks",
          tabBarIcon : ({color,size}) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={size}/>
          )
        }}
      />
      <BottomTab.Screen
        name="BitCoin"
        component={BitcoinScreen}
        options={{
          tabBarLabel : "BitCoin",
          tabBarIcon : ({color,size}) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={size}/>
          )
        }}
      />
    </BottomTab.Navigator>
  )
}
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="InitialScreen" component={InitialScreen}/>
        <Stack.Screen name="Home" component={AppStack}/>
        <Stack.Screen name="Graph" component={GraphScreen}/>
        <Stack.Screen name="Stock Graph" component={StockMarketGraph}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App  