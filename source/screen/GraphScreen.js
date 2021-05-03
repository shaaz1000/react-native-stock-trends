import React,{useState} from "react"
import {Text,View,Dimensions,StyleSheet,Image} from "react-native"
import {LineChart,} from "react-native-chart-kit";

const GraphScreen = ({navigation,route}) => {
        const {Data,APIInfo} = route.params
        console.log(APIInfo,"]")
        const Dataobj = {}
        const Data1 = []
        // const Data1 = [1,2,3,4,5,6,7,8,9,10]
        // const data = []
        // for(let i=1; i<Data1.length; i++){
        //     data.push(Data1[i]*2)
        //     console.log(data,"det")
        // }
        let i
        const BezierData = []
        const MonthData = []
        for(i in Data){
            //console.log("i i",Data[i])
            BezierData.push(Data[i]["1a. open (INR)"])
            MonthData.push(i)
            Dataobj.x = i
            Dataobj.open = Data[i]["1a. open (INR)"]
            Dataobj.high = Data[i]["2a. high (INR)"]
            Dataobj.close = Data[i]["4a. close (INR)"]
            Dataobj.low = Data[i]["3a. low (INR)"]
            Data1.push(Dataobj)
        }
        //const Data2 = Data1.slice(Math.max(Data1.length - 10, 1))
        //const Data3 = BezierData.slice(Math.max(BezierData.length - 5, 1))
        //const Data4 = MonthData.slice(Math.max(MonthData.length - 5, 1))
        const Data3 = BezierData.slice(0,5)
        const Data4 = MonthData.slice(0,5)
        //console.log(Data3,"Data 3")
    return (
        <>
        <View style={{backgroundColor:"white",borderRadius:20,marginVertical:20,marginHorizontal:10,padding:10,elevation:30}}>
            <View style={{flexDirection:"row"}}>
                <Image 
                    source={{uri : APIInfo.ImageLink}}
                    style={{height:50,width:50,margin:10,borderRadius:25}}
                />
                <Text style={{marginTop:3,fontSize:18,fontWeight:"bold",backgroundColor:"orange",borderRadius:10,padding:10,color:"white",alignSelf:"center"}}>{APIInfo.cryptoName}</Text>
            </View>
            <View
                style={{borderWidth:1,marginHorizontal:10,borderColor:"pink"}}
            />
        <LineChart
    data={{
      labels: Data4,
      datasets: [
        {
          data: Data3
        }
      ]
    }}
    width={Dimensions.get("window").width/1.09} // from react-native
    height={Dimensions.get("window").height/2.9}
    yAxisLabel="₹"
    //yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    onDataPointClick={(data)=>{
        console.log(data,"yc",Data3)
        
    }} 
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
   
        </>
    )
}



export default GraphScreen

{/* <LineChart
    data={{
      labels: Dates,
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> */}