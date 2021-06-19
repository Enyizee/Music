import React, { Component } from 'react'
import { Text, View ,Image,ScrollView} from 'react-native'

export default class Photo extends Component {
    render() {
        return (
            <ScrollView>
            <Image style={{height:500,width:400}} resizeMode="stretch" source={{uri:"http://8.140.8.251:5000/MP3/Myphoto.jpg"}}/>
            <View style={{borderWidth:2,borderColor:"black"}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Text style={{fontSize:20}}>作品作者:杨云淏</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Text style={{fontSize:20}}>学号:17111653440</Text>
            </View>
            </View>
            <Image style={{height:200,width:400}} resizeMode="stretch" source={{uri:"http://8.140.8.251:5000/MP3/flie.jpg"}}/>
            <View style={{borderWidth:2,borderColor:"black"}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Text style={{fontSize:20}}>服务器文件展示</Text>
            </View>
            </View>
            <Image style={{height:200,width:400}} resizeMode="stretch" source={{uri:"http://8.140.8.251:5000/MP3/Method.jpg"}}/>
            <View style={{borderWidth:2,borderColor:"black"}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Text style={{fontSize:20}}>采用ant组件中TabBar方法</Text>
            </View>
            </View>
            <Image style={{height:200,width:400}} resizeMode="stretch" source={{uri:"http://8.140.8.251:5000/MP3/json.jpg"}}/>
            <View style={{borderWidth:2,borderColor:"black"}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Text style={{fontSize:20}}>json文件展示</Text>
            </View>
            </View>
            </ScrollView>
        )
    }
}
