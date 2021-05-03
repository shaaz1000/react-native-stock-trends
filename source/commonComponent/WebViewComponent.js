import React,{useState} from "react"
import {View,ActivityIndicator,StyleSheet} from "react-native"
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import Modal from 'react-native-modal'
import {Appbar} from "react-native-paper"
import { WebView } from 'react-native-webview';
const WebViewComponent = ({uri,isLoading}) => {
    console.log(isLoading,uri,"yaha hai bc")
    
    return(
        <Modal
        //hasBackdrop={false}
        isVisible={isLoading}
        // onBackdropPress={()=>{
        //     closeWebView
        // }}
        onBackButtonPress={()=>{
            !isLoading
        }}
        style={{
          margin: 0
        }}>
        <Appbar.Header>
        <Appbar.Action icon="magnify" onPress={()=>{
             !isLoading
            }}/>
       
        </Appbar.Header>
        <WebView source={{uri}}/>
      </Modal>
    )
}

export default WebViewComponent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    //alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});