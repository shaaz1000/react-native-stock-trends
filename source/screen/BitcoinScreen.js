import React,{useState} from "react"
import {Text,View,ScrollView,SafeAreaView,FlatList,Image,TouchableOpacity} from "react-native"
import ApiEndPoint from "../utilities/UrlKeys"
import {Divider} from "react-native-paper"
import Loader from "../commonComponent/Loader"

export const CustomInformations = ({text}) => {
    return(
    <>
    <View style={{flexDirection:"row"}}>
        <View style={{height:30,width:30,borderRadius:15,backgroundColor:"white",marginLeft:10,marginBottom:10}}/>
            <Text style={{color:"white",fontSize:18,fontWeight:"bold",padding:10,bottom:10}}>{text}</Text>
        </View>
    <Divider style={{borderWidth:0.3,borderColor:"white",marginBottom:5,marginHorizontal:10}}/>
    </>
    )
}
const BitcoinScreen = ({navigation}) => {

    const [id,setButtonId] = useState(0)
    const [BitcoinInfo,setBitcoinInfo] = useState("")
    const [BitcoinApiData,setBitcoinData] = useState()
    const [Loading,setLoading] = useState(false)
    const [onPressBitcoinInformation,setOnPressBitcoinInformation] = useState({})
    const [isBitcoinDataFetched,setIsBitcoinDataFetched] = useState(false)
    const BitcoinData = [
        {
            id : "1",
            symbol : "BTC",
            cryptoName : "Bit Coin",
            ImageLink : "https://cdn4.vectorstock.com/i/1000x1000/32/98/bitcoin-symbol-in-flat-design-vector-21033298.jpg"
        },
        {
            id : "2",
            symbol : "ETH",
            cryptoName : "Ether",
            ImageLink : "https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/31987/eth-diamond-black.png"
        },
        {
            id : "3",
            symbol : "LTC",
            cryptoName : "Litecoin",
            ImageLink : "https://cryptologos.cc/logos/litecoin-ltc-logo.png"
        },
        {
            id : "4",
            symbol : "XRP",
            cryptoName : "Ripple XRP",
            ImageLink : "https://cryptologos.cc/logos/xrp-xrp-logo.png"
        },
        {
            id : "5",
            symbol : "BCH",
            cryptoName : "BitcoinCash",
            ImageLink : "https://cdn4.vectorstock.com/i/1000x1000/32/98/bitcoin-symbol-in-flat-design-vector-21033298.jpg"
        }
        ,
        {
            id : "6",
            symbol : "DOGE",
            cryptoName : "Doge Coin",
            ImageLink : "https://cdn.vox-cdn.com/thumbor/ByCzLV-FK04btA7bxc_pr5Pory4=/0x0:560x345/1200x800/filters:focal(236x129:324x217)/cdn.vox-cdn.com/uploads/chorus_image/image/69137452/Dogecoin_logo.0.png"
        }
    ]

    const getBitcoinData = (symbol) => {
        setLoading(true)
        fetch(`${ApiEndPoint.AlphavantageEndPoint}?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=INR&apikey=${ApiEndPoint.AlphavantageApiKey}`)
        .then(response=>response.json())
        .then(data=>{
            
            //console.log("<<<<<<",data["Time Series (Digital Currency Daily)"])
            setBitcoinData(data["Time Series (Digital Currency Daily)"])
            setBitcoinInfo(data["Meta Data"])
            setLoading(false)
            setIsBitcoinDataFetched(true)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    
    console.log(id,1,"bittu Coin")
    const renderItem = (item) => {
        
        return(
            <>
            <TouchableOpacity
                onPress={()=>{
                    setButtonId(item.id)
                    getBitcoinData(item.symbol)
                    setOnPressBitcoinInformation(item)
                }}
            >
            <View style={{
                opacity : item.id === id ? 0.9 : null,
                elevation:20,
                height:130,
                width:160,
                margin:10,
                borderRadius:20,
                backgroundColor: item.id === id ? "#fea82f" : "white",
                top:100
                }}>
                <View style={{flexDirection:"row",marginTop:30,marginLeft:10}}>
                    <Image
                        source={{uri : item.ImageLink}}
                        style={{height:50,width:50,borderRadius:25,marginLeft:4,left:-20,borderWidth:2,borderColor:"white",backgroundColor:"white"}}
                    />
                    <Text style={{marginTop:10,fontSize:16,right:15,fontFamily:"serif",fontWeight:"bold"}}>{item.cryptoName}</Text>
                </View>
                <Text
                    style={{
                        color: "#02475e",
                        textAlign:"center",
                        fontSize:20,
                        backgroundColor : item.id === id ? "white" : null,
                        fontWeight:"bold",
                        borderWidth:3,
                        textAlignVertical:"center",
                        borderRadius:10,
                        alignSelf:"center",
                        paddingHorizontal:20,
                        paddingVertical:5,
                        borderColor:item.id === id ? "#ff6701" : "#f3bda1",
                        marginBottom:5
                    }}
                >{item.symbol}</Text>
            </View>
            </TouchableOpacity>
            </>
        )
    } 
    return(
        <>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <Loader loading={Loading}/>
            <View style={{backgroundColor:"#251f63",borderBottomLeftRadius:60,borderBottomRightRadius:60,height:200,position:"absolute",width:"100%"}}>
                <Text 
                    style={{
                        textAlign:"center",
                        color:"white",
                        padding:10,
                        fontSize:18,
                        fontWeight:"bold",
                        fontFamily:"serif"
                    }}>
                        All about bitcoins
                </Text>
                
            </View>
            <FlatList
                data={BitcoinData}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                //style={{zIndex:1}}
                renderItem={({item})=>{
                    return renderItem(item)
                }}
                keyExtractor={({id})=>id}
            />   
            
            {
                isBitcoinDataFetched ?
                
                <View style={{margin:10,borderRadius:20,elevation:20,backgroundColor:"#e1701a"}}>
                    <Text style={{fontSize:20,textAlign:"center",backgroundColor:"white",color:"black",borderTopLeftRadius:20,borderTopRightRadius:20,padding:10}}>{BitcoinInfo["1. Information"]}</Text>
                    <Divider style={{borderWidth:0.5,borderColor:"white",marginBottom:5}}/>
                    <CustomInformations text={ `Digital Currency Code - ${BitcoinInfo["2. Digital Currency Code"]}`}/>
                    <CustomInformations text={ `Digital Currency Name - ${BitcoinInfo["3. Digital Currency Name"]}`}/>
                    <CustomInformations text={ `Market Code - ${BitcoinInfo["4. Market Code"]}`}/>
                    <CustomInformations text={ `Market Name - ${BitcoinInfo["5. Market Name"]}`}/>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Graph",{Data : BitcoinApiData,APIInfo:onPressBitcoinInformation,isBitconData : true})}
                        style={{backgroundColor:"#f0ebcc",marginHorizontal:10,marginBottom:10,borderRadius:20}}>
                        <Text style={{padding:8,color:"#393e46",fontSize:18,fontWeight:"bold",alignSelf:"center"}}>View Graph</Text>
                    </TouchableOpacity>
                </View>
               
                :
                null
            }
        </SafeAreaView>
        </>
    )
}

export default BitcoinScreen