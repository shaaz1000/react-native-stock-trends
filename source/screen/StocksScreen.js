import React,{useState} from "react"
import {Text,View,StatusBar,SafeAreaView,TextInput,TouchableOpacity} from "react-native"
import Loader from "../commonComponent/Loader"
import {IconButton,Divider} from "react-native-paper"
import SpeechToText from 'react-native-google-speech-to-text';
import ApiEndPoint from "../utilities/UrlKeys"
import {CustomInformations} from "./BitcoinScreen"
const StocksScreen = ({navigation}) => {
    const [Loading,setLoading] = useState(false)
    const [CompanyName,setCompanyName] = useState("")
    const [CompanyData,setCompanyData] = useState()
    const [CompanyIntro,setCompanyIntro] = useState({})
    const [isCompanyDataAvailable,setIsCompanyDataAvailable] = useState(false) 
    const micPressed = async () => {
        let speechToTextData = null;
        try {
            speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_IN');
            console.log(speechToTextData,"Data")
            setCompanyName(speechToTextData)
            if(speechToTextData){
                getBSEListedStock(speechToTextData)
            }
 
        } catch (error) {
            console.log(error,"nh")
        }
    }

    const getBSEListedStock = (symbol) => {
        setLoading(true)
        fetch(`${ApiEndPoint.AlphavantageEndPoint}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}.BSE&apikey=${ApiEndPoint.AlphavantageApiKey}`)
        .then(response=>response.json())
        .then(data=>{
            if(data != undefined){
                setIsCompanyDataAvailable(true)
                setCompanyIntro(data["Meta Data"])
                setCompanyData(data["Time Series (Daily)"])
                setLoading(false)
            }
            
        })
        .catch(err=>{
            setIsCompanyDataAvailable(false)
            alert(err.toString())
        })
    }
    console.log(CompanyIntro,"ha")
    return(
        <>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <Loader loading={Loading}/>
            <View style={{backgroundColor:"#251f63",borderBottomLeftRadius:60,borderBottomRightRadius:60,height:180}}>
                <Text 
                    style={{
                        textAlign:"center",
                        color:"white",
                        padding:10,
                        fontSize:18,
                        fontWeight:"bold",
                        fontFamily:"serif"
                    }}>
                        All about Stock Market
                </Text>

                 <View style={{flexDirection:"row",justifyContent:"space-around"}}>
          <IconButton
            icon="microphone"
            color="white"
            size={28}
            style={{marginTop:18}}
            onPress={micPressed}
            />
              <TextInput
                onChangeText={(text)=>{
                    setCompanyName(text)
                    if(CompanyName.length == 0){
                        setIsCompanyDataAvailable(false)
                        
                    }
                }}
                placeholder="Search BSE Listed Stock"
                placeholderTextColor="#ff6701"
                label = "Search BSE Listed Stock"
                style={{backgroundColor:"white",borderRadius:20,marginVertical:15,color:"#02475e",paddingHorizontal:10}}
              />
              <TouchableOpacity
                disabled={CompanyName.length > 0 ? false : true}
                onPress={()=>getBSEListedStock(CompanyName)}
              >
                  <Text style={{backgroundColor:CompanyName.length > 0 ?"#fea82f":"#a7d0cd",borderRadius:10,width:80,height:40,marginVertical:20,color:"white",fontWeight:"bold",fontSize:16,textAlign:"center",textAlignVertical:"center",marginLeft:5,right:10}}>Search </Text>
              </TouchableOpacity>
          </View>
        </View>
        {
            isCompanyDataAvailable ?
            <View style={{margin:20,backgroundColor:"#e1701a",borderRadius:20,elevation:20}}>
                <Text style={{fontSize:20,textAlign:"center",backgroundColor:"white",color:"black",borderTopLeftRadius:20,borderTopRightRadius:20,padding:10}}>{CompanyIntro["1. Information"]}</Text>
                    <Divider style={{borderWidth:0.5,borderColor:"white",marginBottom:5}}/>
                    <CustomInformations text={ `Symbol - ${CompanyIntro["2. Symbol"]}`}/>
                    <CustomInformations text={ `Last Refreshed - ${CompanyIntro["3. Last Refreshed"]}`}/>
                    <CustomInformations text={ `Output Size - ${CompanyIntro["4. Output Size"]}`}/>
                    <CustomInformations text={ `Time Zone - ${CompanyIntro["5. Time Zone"]}`}/>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Stock Graph",{Data : CompanyData,CompanyName : CompanyName})}
                        style={{backgroundColor:"#f0ebcc",marginHorizontal:10,marginBottom:10,borderRadius:20}}>
                        <Text style={{padding:8,color:"#393e46",fontSize:18,fontWeight:"bold",alignSelf:"center"}}>View Graph</Text>
                    </TouchableOpacity>
            </View>
            :
            <View style={{margin:20,backgroundColor:"#e1701a",borderRadius:20,elevation:20}}>
                <Text style={{
                    alignSelf:"center",
                    color : "white",
                    fontWeight:"bold",
                    fontSize:20,
                    padding:10
                }}>Get Details of the Company Stocks by searching or by using the microphone.</Text>
            </View>
        }
        </SafeAreaView>
        </>
    )
}

export default StocksScreen