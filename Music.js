import React, { Component } from 'react'
import { View,Animated,StyleSheet,TouchableHighlight,Text } from 'react-native'
import { linear } from 'react-native/Libraries/Animated/Easing'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video'
import Slider from '@react-native-community/slider';
import Home from './Home'
let musicUri="http://8.140.8.251:5000/MP3/"
class Music extends Component {
        state={
            rotate:new Animated.Value(0),
            paused:true,
            index:0,//曲目位置
            isFullScreen: false,
            duration: 0,
            currentTime: 0,
            sliderValue: 0,
            music:[],//曲库信息
            status:"",//播放状态
            length:0,//曲库长度
            isLog:false,//初始数据加载数组
            status:["th-list","refresh","random"],//状态数组
            STap:0,//记录状态位置
            Love:false,
        }
 an=Animated.loop(Animated.timing(this.state.rotate,
 {useNativeDriver:true,duration:5000,toValue:360,easing:linear}))
 ref = player => { this.player = player }
 _play=()=>{
    
 let paused=this.state.paused
 if(paused){
 this.state.rotate.setValue(0)
 this.an.start()
 }
 else{
 this.an.stop()
 }
 this.setState({paused:!paused})
 }
customerOnload(e){
    let time = e.duration;   
    this.setState({
        duration: time
    })
}
customerOnprogress(e){
    let time = e.currentTime;   // 获取播放视频的秒数       
    this.setState({
        currentTime: time,
        sliderValue: time
    })           
}
_previous=()=>{
    if(this.state.STap==1){
        if(this.state.index!=0){
            this.setState({index:this.state.index-1,paused:false})
            this._play
        }
        else{
            this.setState({index:this.state.music.length-1,paused:false})
            this._play
        }
    }
    else if(this.state.STap==0){
        if(this.state.index!=0){
            this.setState({index:this.state.index-1,paused:false})
            this._play
        }
        else{
            this.setState({index:this.state.music.length-1,paused:false})
            this._play
        }
    }
    else if(this.state.STap==2){
        let index=Math.floor(Math.random()*14)
            this.setState({index:index,paused:false})
            this._play
        }
}
_next=()=>{

    if(this.state.STap==1){//判定不同播放模式下的下一曲方式
    if(this.state.index!=this.state.music.length-1){
        this.setState({index:++this.state.index,paused:false})
        this._play
    }
    else{
        this.setState({index:0,paused:false})
        this._play
    }
    }else if(this.state.STap==0){
    if(this.state.index!=this.state.music.length-1){
        this.setState({index:++this.state.index,paused:false})
        this._play
    }
    else{
        this.setState({index:0,paused:true})
        this._play
    }
}
else if(this.state.STap==2){
    let index=Math.floor(Math.random()*14)
        this.setState({index:index,paused:false})
        this._play
    }
}
_customerSliderValue=(value)=>{  //获取时间进度
    this.player.seek(value)
}
formatMediaTime(time) {//将时间转为分:秒格式
    let minute = Math.floor(time / 60);
    let second = parseInt(time - minute * 60);
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;
    return minute + ":" + second;
   }
   UNSAFE_componentWillMount() {//新版本以后需要用UNSAFE_componentWillMount，之前的方法会报错
    fetch(musicUri+"music.json",{method:'GET'})
      .then((response) => response.json())
      .then((json)=>{return(this.setState({music:json.music}),this.setState({length:json.music.length,isLog:true}))}) 
  }
  _ChangeStatus=()=>{
    if(this.state.STap===2){
        return(this.setState({STap:0}))
    }
    else{
       return(this.setState({STap:++this.state.STap}))
    }
  }
  _ChangeLove=()=>{
    let music=[...this.state.music]//浅复制原数组
    let musicinfor=music[this.state.index]//针对当前下标的数组内容复制
    musicinfor.Love=!musicinfor.Love//修改当前数组对象的喜好设定
    music.splice(this.state.index,1,musicinfor)
    return(this.setState({music:music}),<Home music={this.state.music}></Home>,console.log('传过去了'))
  }
  ComponentUpdate(nextProps){
      if(nextProps!==this.props){
      let index=0
      console.log(this.props.route.params.img)
      while(index!=this.state.length){
          if(this.state.music[index].img==this.props.route.params.img){
            return(this.setState({index:index}),this._play)
          }
          else{
              index=++index
          }
      }
    }
  }
 render() {
 let style={transform:[{rotate:this.state.rotate.interpolate({
 inputRange:[0,360],outputRange:['0deg','360deg']
 })}]}
 let log =this.state.isLog//判断state是否更新完毕
 if(log){
 return (
 <View style={{flex:1,backgroundColor:'antiquewhite',alignItems:'center'}}>
 <Video
 paused= {this.state.paused}
 source={{uri:musicUri+this.state.music[this.state.index].file}}
 ref={ref=>this.player=ref}
 onLoad={(e)=>this.customerOnload(e)} 
 onProgress={(e)=>this.customerOnprogress(e)}  
 onEnd={this._next}                     
 fullscreen={this.state.isFullScreen}/>
 <Text>{this.state.music[this.state.index].name+"-"+this.state.music[this.state.index].artname}</Text>
 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
 <Animated.Image style={[styles.disc,style]} source={{uri:musicUri+this.state.music[this.state.index].img}}/>
 </View>
<View style={{display:'flex',flexDirection:'column',justifyContent:'space-around',width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',width:'50%'}}>
<View style={{display:'flex',flexDirection:'row-reverse',width:'35%'}}>
<TouchableHighlight style={styles.Play} onPress={this._ChangeStatus}>
 <FontAwesome name={this.state.status[this.state.STap]} size= {30} color={"black"}/>
 </TouchableHighlight>
 </View>
 <View style={{display:'flex',flexDirection:'row-reverse',width:'175%'}}>
 <TouchableHighlight style={styles.Play} onPress={this._ChangeLove}>
 <FontAwesome name={this.state.music[this.state.index].Love?"star":"star-o"} size= {30} color={"black"}/>
 </TouchableHighlight> 
 </View>
 </View>
 </View>
 <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
 <View style={{display:'flex',flexDirection:'row-reverse',width:'20%'}}>
 <TouchableHighlight style={styles.Play} onPress={this._previous}>
 <FontAwesome name="step-backward" size= {30} color={"black"}/>
 </TouchableHighlight>
 </View>
 <View style={{display:'flex',flexDirection:'row-reverse',width:'20%'}}>
 <TouchableHighlight style={styles.Play} onPress={this._play} >
 <FontAwesome name={this.state.paused?"play":"pause"} size= {30} color={"black"}/>
 </TouchableHighlight>
 </View>
 <View style={{display:'flex',flexDirection:'row-reverse',width:'20%'}}>
 <TouchableHighlight style={styles.Play} onPress={this._next}>
 <FontAwesome name="step-forward" size= {30} color={"black"}/>
 </TouchableHighlight>
 </View>
 </View>
 </View>
 <View style={styles.sliderBox}>
                        <Text>{this.formatMediaTime(this.state.currentTime)}</Text>
                        <Slider 
                            style={{width:"80%",height: 40}} 
                            value={this.state.sliderValue}
                            maximumValue={this.state.duration}
                            thumbTintColor="#000" //开关夹点的yanse              
                            minimumTrackTintColor="red"
                            maximumTrackTintColor="#ccc"
                            step={1}
                            onValueChange={(value)=>this._customerSliderValue(value)}
                        />
                        <Text>{this.formatMediaTime(this.state.duration)}</Text>
                    </View>
 </View>
 )}
 else{
     return(
         <View>
             <Text>
                 is no data
             </Text>
         </View>
     )
 }
 }
}
const styles = StyleSheet.create({
 disc:{width:400,height:400,borderRadius:200},
 Play: {justifyContent:'center',alignItems:'center',width:45,height:45,borderRadius:45},
 sliderBox:{
    flex:0,
    flexDirection:'row',
    alignItems:'center'
}
})
export default Music;