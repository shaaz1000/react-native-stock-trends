import React,{useEffect,useState} from "react"
import {Text,View,StatusBar,SafeAreaView,Image,FlatList,StyleSheet,ScrollView,TextInput, TouchableOpacity, Linking} from "react-native"
import Loader from "../commonComponent/Loader"
import APiEndpoint from "../utilities/UrlKeys"
import {IconButton} from "react-native-paper"
import SpeechToText from 'react-native-google-speech-to-text';
import { WebView } from 'react-native-webview';
import WebViewComponent from "../commonComponent/WebViewComponent"
import {connect} from "react-redux"
const NewsScreen = ({userData,navigation}) => {
    console.log(userData,"userData")
    const [IndianNewsData,setIndianNewsData] = useState([])
    const [UsNewsData,setUsNewsData] = useState([])
    const [Loading,setLoading] = useState(true)
    const [TechCrunchData,setTechCrunchData] = useState([])
    const [CompanyName,setCompanyName] = useState("")
    const [CompanyData,setCompanyData] = useState([])
    const [isCompanyDataAvailable,setIsCompanyDataAvailable] = useState(false) 
    const [isLoading,setIsLoading] = useState(false)
    const [url,setUrl] = useState()
    const getIndianBussinessDetails = () => {
        setLoading(true)
        fetch(`${APiEndpoint.NewsApiEndPoint}country=in&category=business&apiKey=${APiEndpoint.NewsApiKey}`)
        .then(res=>res.json())
        .then(data=>{
            
            setIndianNewsData(data.articles)
            setLoading(false)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const getUsBusinessDetails = () => {
        setLoading(true)
        fetch(`${APiEndpoint.NewsApiEndPoint}country=us&category=business&apiKey=${APiEndpoint.NewsApiKey}`)
        .then(res=>res.json())
        .then(data=>{
            
            setUsNewsData(data.articles)
            setLoading(false)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const techCrunchDetails = () => {
        setLoading(true)
        fetch(`${APiEndpoint.NewsApiEndPoint}sources=techcrunch&apiKey=${APiEndpoint.NewsApiKey}`)
        .then(res=>res.json())
        .then(data=>{
            
            setTechCrunchData(data.articles)
            setLoading(false)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getIndianBussinessDetails()
        getUsBusinessDetails()
        techCrunchDetails()
    },[])

    const getCompanyNews = (companyName) => {
        
        console.log(companyName,"companyName")
        setLoading(true)
        fetch(`https://newsapi.org/v2/everything?q=${companyName}&from=2021-04-15&sortBy=publishedAt&apiKey=${APiEndpoint.NewsApiKey}`)
        .then(response =>response.json())
        .then(data=>{
            if(data){
                setCompanyData(data.articles)
                setIsCompanyDataAvailable(true)
            }
            else{
                setIsCompanyDataAvailable(false)
            }
            setLoading(false)
        })
        .catch(err => {
            alert("Something went wrong while fetching company data")
            setIsCompanyDataAvailable(false)
        })
    }

    const renderIndianNewsItem = (item,index) => {
        
        return (
            <>
            <TouchableOpacity onPress={()=>{
                
                Linking.openURL(item.url)
                
            }}>
            <View 
                // key={index}
                style={{width:330,height:290,marginLeft:10,elevation:20,borderRadius:20,backgroundColor:"#75cfb8"}}>
                <View>
                <Image
                    style={{width:330,height:150,borderRadius:20,alignSelf:"center"}}
                    source={{uri:item.urlToImage}}
                />
                </View>
                <Text 
                style={{fontSize:18,
                padding:10,
                color:"white",
                fontWeight:"bold",
                fontFamily:"serif"
                }}>{item.title}</Text>
                {
                    item.author != null ?
                    <Text 
                    style={{
                        alignSelf:"flex-end",
                        margin:10,
                        fontSize:16,
                        fontWeight:"bold",
                        bottom:5,
                        color:"white"
                    }}> ~ {item.author}</Text>
                    :
                    null
                }
                
            </View>
            </TouchableOpacity>
            </>
        )
    }
    const renderCompanyNewsItem = (item,index) => {
        
        return (
            <>
            <TouchableOpacity onPress={()=>Linking.openURL(item.url)}>
            <View 
            // key={index}
                style={{width:330,height:290,marginLeft:10,elevation:20,borderRadius:20,backgroundColor:"#ad94d0"}}>
                <View>
                <Image
                    style={{width:330,height:150,borderRadius:20,alignSelf:"center"}}
                    source={{uri:item.urlToImage}}
                />
                </View>
                <Text 
                style={{fontSize:18,
                padding:10,
                color:"white",
                fontWeight:"bold",
                fontFamily:"serif"
                }}>{item.title}</Text>
                {
                    item.author != null ?
                    <Text 
                    style={{
                        alignSelf:"flex-end",
                        margin:10,
                        fontSize:16,
                        fontWeight:"bold",
                        bottom:5,
                        color:"white"
                    }}> ~ {item.author}</Text>
                    :
                    null
                }
                
            </View>
            </TouchableOpacity>
            </>
        )
    }
    const renderUsNewsItem = (item,index) => {
        
        return (
            <>
            <TouchableOpacity onPress={()=>Linking.openURL(item.url)}>
            <View 
            // key={index}
                style={{width:330,height:290,marginLeft:10,elevation:20,borderRadius:20,backgroundColor:"#ffe9d6",marginBottom:10}}>
                <View>
                <Image
                    style={{width:330,height:150,borderRadius:20,alignSelf:"center"}}
                    source={{uri:item.urlToImage}}
                />
                </View>
                <Text 
                style={{fontSize:18,
                padding:10,
                color:"#de8971",
                fontWeight:"bold",
                fontFamily:"serif"
                }}>{item.title}</Text>
                {
                    item.author != null ?
                    <Text 
                    style={{
                        alignSelf:"flex-end",
                        margin:10,
                        fontSize:16,
                        fontWeight:"bold",
                        bottom:5,
                        color:"#de8971"
                    }}> ~ {item.author}</Text>
                    :
                    null
                }
                
            </View>
            </TouchableOpacity>
            </>
        )
    }
    const renderTechCrunchData = (item,index) => {
        
        return (
            <>
            <TouchableOpacity onPress={()=>Linking.openURL(item.url)}>
            <View 
            // key={index}
                style={{width:330,height:290,marginLeft:10,elevation:20,borderRadius:20,backgroundColor:"#114e60",marginBottom:10}}>
                <View>
                <Image
                    style={{width:330,height:150,borderRadius:20,alignSelf:"center"}}
                    source={{uri:item.urlToImage}}
                />
                </View>
                <Text 
                style={{fontSize:18,
                padding:10,
                color:"white",
                fontWeight:"bold",
                fontFamily:"serif"
                }}>{item.title}</Text>
                {
                    item.author != null ?
                    <Text 
                    style={{
                        alignSelf:"flex-end",
                        margin:10,
                        fontSize:16,
                        fontWeight:"bold",
                        bottom:5,
                        color:"white"
                    }}> ~ {item.author}</Text>
                    :
                    null
                }
                
            </View>
            </TouchableOpacity>
            </>
        )
    }

    const micPressed = async () => {
        let speechToTextData = null;
        try {
            speechToTextData = await SpeechToText.startSpeech('Try saying something', 'en_IN');
            setCompanyName(speechToTextData)
            if(speechToTextData){
                getCompanyNews(speechToTextData)
            }
 
        } catch (error) {
            alert("Failed to load mic")
        }
    }

    
    return(
        <>
        <StatusBar backgroundColor="#251f63" barStyle="light-content"/>
        <SafeAreaView  style={{flex:1,backgroundColor:"#251f63"}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Loader loading={Loading}/>
            <View style={{flexDirection:"row"}}>
            <View style={{width:"70%"}}>
            <Text 
                style={{
                    color:"white",
                    fontSize:17,
                    fontWeight:"bold",
                    padding:10,
                    //textAlign:"center",
                    fontFamily:"serif"
                }}>Welcome To Stock Trend {userData.givenName} {userData.familyName}</Text>
            </View>
            <View style={{width:"30%"}}>
                {/* <TouchableOpacity onPress={()=>navigation.navigate("Profile")}> */}
                <Image 
                    style={{height:70,width:70,borderRadius:35,margin:5}}
                    source={{uri : userData.photo}}
                />
                {/* </TouchableOpacity> */}
            </View>
            </View>
          <View style={{flexDirection:"row",justifyContent:"center"}}>
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
                placeholder="Search News by Company Name"
                placeholderTextColor="#ff6701"
                label = "Search News by Company Name"
                style={{backgroundColor:"white",borderRadius:20,marginVertical:15,color:"#02475e"}}
              />
              <TouchableOpacity
                disabled={CompanyName.length > 0 ? false : true}
                onPress={()=>getCompanyNews(CompanyName)}
              >
                  <Text style={{backgroundColor:CompanyName.length > 0 ?"#fea82f":"black",borderRadius:10,width:80,height:40,marginVertical:20,color:"white",fontWeight:"bold",fontSize:16,textAlign:"center",textAlignVertical:"center",marginLeft:10}}>Search </Text>
              </TouchableOpacity>
          </View>


        <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:20,borderTopLeftRadius:20}}>
        
        <Text style={styles.headerTextStyle}>Stock News</Text>
        {
            isCompanyDataAvailable ?
            <View>
                <Text style={styles.topicStyle}>All about {CompanyName}</Text>
                    <FlatList
                        keyExtractor={(item)=>item.urlToImage}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={CompanyData}
                        renderItem={({item,index})=>{
                            return renderCompanyNewsItem(item,index)
                        }}
                        
                    />
            </View>
            :
            null
        }
        <Text style={styles.topicStyle}>Get Insights of Indian Business News</Text>
        <FlatList
            keyExtractor={(item)=>item.urlToImage}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={IndianNewsData}
            renderItem={({item,index})=>{
                return renderIndianNewsItem(item,index)
            }}
            
        />
        <Text style={[styles.topicStyle,{backgroundColor:"#3d84b8",borderRadius:10,padding:5,color:"#f0ebcc",marginRight:10,marginLeft:5,marginVertical:10}]}>Get Insights of Us Business News</Text>
        <FlatList
            horizontal={true}
            keyExtractor={(item)=>item.urlToImage}
            showsHorizontalScrollIndicator={false}
            data={UsNewsData}
            renderItem={({item,index})=>{
                return renderUsNewsItem(item,index)
            }}
            
        />
        <Text style={[styles.topicStyle,{backgroundColor:"#fea82f",borderRadius:10,padding:5,color:"#f0ebcc",marginRight:10,marginLeft:5,marginVertical:10}]}>All about the Tech Crunch</Text>
        <FlatList
            keyExtractor={(item)=>item.urlToImage}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={TechCrunchData}
            renderItem={({item,index})=>{
                return renderTechCrunchData(item,index)
            }}
            
        />
        {/* <WebViewComponent uri={url} isLoading={isLoading}/> */}
        
        </View> 
        </ScrollView>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    headerTextStyle:{
        backgroundColor:"#ff8474",
        color:"white",
        borderRadius:20,
        width:"50%",
        padding:10,
        fontSize:18,
        fontWeight:"bold",
        margin:10,
        textAlign:"center",
        alignSelf:"center"
    },
    topicStyle:{
        padding:10,
        marginTop:10,
        color:"#7b6079",
        fontSize:17,
        fontWeight:"bold",
        fontFamily:"serif"
    }
})

const mapStateToProps = (state)=> {
    return {
        userData : state.UserReducer.userData
    }
    
}
export default connect(mapStateToProps)(NewsScreen)