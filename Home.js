import React, { Component } from 'react'
import {  StyleSheet,Image, ScrollView,View,TouchableHighlight,Text} from 'react-native'
import { Flex } from '@ant-design/react-native';
let musicUri="http://8.140.8.251:5000/MP3/"
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            music:[],
            index:0,
            length:0,
            musicimg:{uri:""}
        }
        this.fd=null
    }
    componentDidMount(){
        setInterval(()=>{
            if(this.fd==null){
            let index=Math.floor(Math.random()*14)
            let musicimg=this.state.musicimg
            musicimg.uri=musicUri+this.state.music[index].img
            this.setState({musicimg})}
            },2500)
        }
    UNSAFE_componentWillMount() {//新版本以后需要用UNSAFE_componentWillMount，之前的方法会报错
        fetch(musicUri+"music.json",{method:'GET'})
          .then((response)=>response.json())
          .then((json)=>{return(this.setState({music:json.music}),this.setState({length:json.music.length,isLog:true}))}) 
      }
    render() {
        return (
            <ScrollView style={{width:"100%"}}>
            <Flex direction="column" >
            <Image style={styles.bannaImg} source={this.state.musicimg} />
            <Flex style={{height:90,width:"100%",position:"relative",left:20}} direction="row">
            <Flex.Item >
            <Image style={{width:60,height:60,borderWidth:1,borderColor:"black",borderRadius:40}} resizeMethod="scale" source={{uri:musicUri+"songer.jpg"}}/>
            <Text style={{fontSize:20,position:"relative",left:10}}>歌手</Text>
            </Flex.Item>
            <Flex.Item>
            <Image style={{width:60,height:60,borderWidth:1,borderColor:"black",borderRadius:40}} resizeMethod="scale" source={{uri:musicUri+"Sort.jpg"}}/>
            <Text style={{fontSize:20,position:"relative",left:10}}>排名</Text>
            </Flex.Item>
            <Flex.Item >
            <Image style={{width:60,height:60,borderWidth:1,borderColor:"black",borderRadius:40}} resizeMethod="scale" source={{uri:musicUri+"dian.jpg"}}/>
            <Text style={{fontSize:20,position:"relative",left:10}}>电台</Text>
            </Flex.Item>
            <Flex.Item>
            <Image style={{width:60,height:60,borderWidth:1,borderColor:"black",borderRadius:40}} resizeMethod="scale" source={{uri:musicUri+"Twop.jpg"}}/>
            <Text style={{fontSize:20}}>一起听</Text>
            </Flex.Item>
            </Flex>
            </Flex >
            <Flex justify="center" style={{borderWidth:5,borderColor:"rgb(0,0,0)"}}>
            <Text style={{fontSize:40,width:60}}>今</Text>
            <Text style={{fontSize:40,width:60}}>日</Text>
            <Text style={{fontSize:40,width:60}}>推</Text>
            <Text style={{fontSize:40,width:60}}>荐</Text>
            </Flex>
            <Image style={{height:400,width:"100%",borderWidth:10,borderColor:"rgb(0,0,0)"}} source={{uri:musicUri+"gzz.jpg"}} resizeMode="stretch"/>
            </ScrollView>
            )
            }
}
const styles=StyleSheet.create({
bannaImg:{width:'100%',height:180,borderWidth:3,borderColor:"black"},
 nav:{flexDirection:'row',justifyContent:'space-around',backgroundColor:'grey',height:40},
 navText:{fontSize:20,color:'white',lineHeight:40},
 navInput:{flexDirection:'row',justifyContent:'space-around',backgroundColor:'white',height:"100%",width:160,},
 showPan:{flexDirection:'row',flexWrap:'wrap',backgroundColor:'black'},
 cafe:{width:'50%',borderColor:"white",borderWidth:1},
 cafeText:{color:'rgb(96,56,17)'},
 cafeImg:{width:'100%',height:160},
 byButton:{width:80,height:40,backgroundColor:'red',alignSelf:'flex-end',justifyContent:'center',borderRadius:18},
 byButtonText:{color:'white',fontSize:26,textAlign:'center'},
})
export default Home;