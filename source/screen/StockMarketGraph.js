import React from 'react';
import {Text,View,Dimensions,StyleSheet,Image, FlatList, SafeAreaView,ScrollView} from "react-native"
import {LineChart,} from "react-native-chart-kit";

const StockMarketGraph = ({navigation,route}) => {
    
    const {CompanyName,Data} = route.params
    let stockObj = {}
    const DateData = []
    const StockData = []
    const HighStock = []
    let i
    for (i in Data){
        //console.log(Data[i],"iiii")
        DateData.push(i)
        HighStock.push(Data[i]["2. high"])
        
        //console.log(stockObj,i)
        StockData.push({
            DateOfStock : i,
            openPrice : Data[i]["1. open"],
        closePrice : Data[i]["4. close"],
        highPrice : Data[i]["2. high"],
        lowPrice : Data[i]["3. low"],
        adjustedClose : Data[i]["5. adjusted close"],
        volume : Data[i]["6. volume"],
        dividentAmount : Data[i]["7. dividend amount"]
        })
        //console.log(StockData,"id")
    }
    
    const UpdatedDateData = DateData.slice(0,5)
    const updatedHighStockData = HighStock.slice(0,5)
    const updatedStockData = StockData.slice(0,10)
    
    //console.log(StockData[StockData.length - 1],"i")
    const renderItem = (item,index) => {
        console.log(item,"i")
        return(
            <>
                <View style={{marginLeft:10,marginVertical:10,borderRadius:20,elevation:20,backgroundColor:"white",width:Dimensions.get("window").width /2,height:Dimensions.get("window").height/3.1}}>
                    <Text 
                        style={{
                            textAlign:"center",
                            fontSize:18,
                            fontWeight:"bold",
                            padding:5,
                            textAlign:"center",
                            margin:5,
                            color : "#3d84b8",
                            borderColor:"#ff8474",
                            borderWidth:1,
                            borderRadius:20
                        }}> 📆 {item.DateOfStock}</Text>
                    <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                        <View
                            style={{height:16,width:16,borderRadius:8,marginLeft:5,marginTop:6,backgroundColor:"#f7a440"}}
                        />
                        <Text style={{color : "#184d47",fontWeight:"bold",marginTop:4}}> Open Price - </Text>
                        <Text style={{backgroundColor:"#96bb7c",borderRadius:10,color:"white",padding:5,right:2}}> ₹{item.openPrice}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                        <View
                            style={{height:16,width:16,borderRadius:8,marginLeft:5,marginTop:6,backgroundColor:"#f7a440"}}
                        />
                        <Text style={{color : "#184d47",fontWeight:"bold",marginTop:4}}> High - </Text>
                        <Text style={{backgroundColor:"#ff7a00",borderRadius:10,color:"white",padding:5,right:2}}> ₹{item.highPrice}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                        <View
                            style={{height:16,width:16,borderRadius:8,marginLeft:5,marginTop:6,backgroundColor:"#f7a440"}}
                        />
                        <Text style={{color : "#184d47",fontWeight:"bold",marginTop:4}}> Low - </Text>
                        <Text style={{backgroundColor:"#184d47",borderRadius:10,color:"white",padding:5,right:2}}> ₹{item.lowPrice}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                        <View
                            style={{height:16,width:16,borderRadius:8,marginLeft:5,marginTop:6,backgroundColor:"#f7a440"}}
                        />
                        <Text style={{color : "#184d47",fontWeight:"bold",marginTop:4}}> Close - </Text>
                        <Text style={{backgroundColor:"#f05945",borderRadius:10,color:"white",padding:5,right:2}}> ₹{item.closePrice}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:5,justifyContent:"space-between"}}>
                        <View
                            style={{height:16,width:16,borderRadius:8,marginLeft:5,marginTop:6,backgroundColor:"#f7a440"}}
                        />
                        <Text style={{color : "#184d47",fontWeight:"bold",marginTop:4}}> Volume - </Text>
                        <Text style={{backgroundColor:"#75cfb8",borderRadius:10,color:"white",padding:5,right:2}}> {item.volume}</Text>
                    </View>
                </View>
            </>
        )
    }
    return(
        <>
        <SafeAreaView style={{flex:1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor:"white",borderRadius:20,marginVertical:20,marginHorizontal:10,padding:10,elevation:30}}> 
        <View style={{flexDirection:"row"}}>
                <Image 
                    source={{uri : "https://i1.wp.com/smestreet.in/wp-content/uploads/2018/10/BSE-SENSEX-NSE-NIFTY-Stock-Market.jpg"}}
                    style={{height:50,width:50,margin:10,borderRadius:25}}
                />
                <View style={{backgroundColor:"orange",margin:4,borderRadius:20,padding:10}}>
                <Text style={{marginTop:3,fontSize:16,fontWeight:"bold",padding:5,color:"white"}}>{CompanyName}</Text>
                <Text>BSE LISTED STOCK</Text>
                </View>
            </View>
            <View
                style={{borderWidth:1,marginHorizontal:10,borderColor:"pink"}}
            />
        <LineChart
    data={{
      labels: UpdatedDateData,
      datasets: [
        {
          data: updatedHighStockData
        }
      ]
    }}
    width={Dimensions.get("window").width/1.09} // from react-native
    height={Dimensions.get("window").height/2.9}
    yAxisLabel="₹"
    //yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    // onDataPointClick={(data)=>{
    //     console.log(data,"yc",Data3)
        
    // }} 
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    
      
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
        
      },
      propsForVerticalLabels:{
          fontSize:12,
        },
        
    }}
    bezier
    style={{
      margin: 20,
      alignSelf:"center",
      borderRadius: 16,
      elevation:20,
    }}
  />
    </View>
    <Text style={{backgroundColor:"#3f3697",padding:10,color:"white",borderRadius:20,fontSize:17,fontWeight:"bold",marginRight:10}}>Detailed stock details of {CompanyName} </Text>
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={updatedStockData}
            renderItem={({item,index})=>{
                return renderItem(item,index)
            }}
            keyExtractor={(index)=>{index
            }}
        />
    </ScrollView>
    </SafeAreaView>
    </>
    )
}

export default StockMarketGraph