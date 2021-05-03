import React,{useEffect,useState} from "react";
import {Text,TouchableOpacity,View,Image} from "react-native"
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import {connect} from "react-redux"
import * as userActions from "../redux/actions/userData"
import AsyncStorage from "@react-native-async-storage/async-storage"
const InitialScreen = ({navigation,dispatch}) => {
  const [BiometryType,setBiometryType] = useState("")
  const [UserInfo,setUserInfo] = useState("")
  const [isBiometricSignedIn,setBiometricSignedIn] = useState(null)
  const configureGoogleSignIn = () => {
      GoogleSignin.configure({
          webClientId : "304833540848-3jl2f393kj45vei1868dj1vdntko35ac.apps.googleusercontent.com"
      })
  }

  const signIn = async () => {
    try {
      const CheckPlayServices= await GoogleSignin.hasPlayServices();
      if(CheckPlayServices){
        const userInfo = await GoogleSignin.signIn();
        setUserInfo(userInfo)
        //isSignedIn()
        //getCurrentUser()
        const {idToken,user} = userInfo
        dispatch(userActions.setUserData(user))
        const token = await AsyncStorage.setItem("token",idToken)
        navigation.navigate("Home")
      
        
        
      }
     
    } catch (error) {
        console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        alert("Failed to google login")
      }
    }
  };
  const CheckIsSensorAvailable = () => {
    FingerprintScanner.isSensorAvailable()
    .then(biometryType=>{
      console.log(biometryType,"bio")
      setBiometryType(biometryType)
      ShowAuthenticationDialog(biometryType)
    })
    .catch(error=>{
      console.log(error,"err")
    })
  }

  const getMessage = () => {
    if(BiometryType == "FACE ID"){
      console.log("waha")
      return "Scan your Face on the device to continue"
    }
    else{
      console.log("yaha")
      return 'Scan your Fingerprint on the device scanner to continue'
    }
  }
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
      if(!isSignedIn){
        signIn();
      }
      else{
        getCurrentUser()
       
        
      }
  };
  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    const {idToken,user} = currentUser
    
    dispatch(userActions.setUserData(user))
     AsyncStorage.setItem("token",idToken).then(data=>{
      console.log(data,"Data")
      navigation.navigate("Home")
     })
    
     
    
    
  };
  const ShowAuthenticationDialog = (BiometryType) => {
    
    if(BiometryType!==null && BiometryType!==undefined && BiometryType != "" )
    {
    FingerprintScanner.authenticate({
      description: getMessage()
    })
      .then((data) => {
        setBiometricSignedIn(data)
        
        if(data){
            configureGoogleSignIn()
        }
      })
      .catch((error) => {
        setBiometricSignedIn(false) 
        alert(error.toString())
        // console.log(error.toString(),"error")  
        // console.log(isBiometricSignedIn,"89")     
      });
    }
    else
    {
    console.log('biometric authentication is not available');
    }
  }

  useEffect(()=>{
    CheckIsSensorAvailable()
    
  },[])

  return(
    <View style={{flex:1,backgroundColor:"#251f63"}}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        {
          isBiometricSignedIn ?
          <View>
            <TouchableOpacity
              onPress={isSignedIn}
            >
              <View style={{flexDirection:"row",justifyContent:"space-around",backgroundColor:"#dae0db",padding:10,borderRadius:40,opacity:0.4}}>
                <Image 
                  source={require("../assets/images/google.png")}
                  style={{height:50,width:50,borderRadius:25}}
                />
                <Text style={{marginTop:10,fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Sign in with Google</Text>
              </View>
              
            </TouchableOpacity>
          </View>
          :
          <View style={{backgroundColor:"white",elevation:10,borderRadius:20,padding:10,margin:20,alignSelf:"center"}}>
            <Text style={{fontSize:22,fontWeight:"bold",padding:10,textAlign:"center"}}>
              Please use your biometrics to enable google login
            </Text>
          </View>
        }
      
      </View>
    </View>
  )
}

{/* <GoogleSigninButton
          style={{ width: 250, height: 48 , padding:10}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={()=>signIn()}
          /> */}
export default connect()(InitialScreen);