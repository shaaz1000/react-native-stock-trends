import React,{useEffect} from "react";
import {Text,View,Image,SafeAreaView} from "react-native";
import {connect} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
const ProfileScreen = ({navigation,userData}) => {
    console.log(userData,"user")
    
    return(
        <>
        <SafeAreaView style={{flex: 1,backgroundColor:"#f7f9fc"}}>
        <View style={{margin:10,backgroundColor:"#f0ebcc",elevation:10,borderRadius:20,flex:1}}>
        <Image source={{uri : userData.photo}} style={{height:200,width:200,alignSelf:"center",borderRadius:100,margin:10,marginTop:50,borderColor:"#f7f9fc",borderWidth:2}}/>
            <Text style={{margin:10,marginTop:10,padding:5,fontSize:20,fontWeight:"bold",color:"#3f3697"}}>Name - {userData.givenName} {userData.familyName}</Text>
            <Text style={{margin:10,padding:5,fontSize:20,fontWeight:"bold",color:"#3f3697"}}>Email - {userData.email}</Text>
        </View>
        </SafeAreaView>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userData : state.UserReducer.userData
    }
}
export default connect(mapStateToProps)(ProfileScreen);