import React from 'react';
import { Text, View } from 'react-native';
import {  SearchBar, TabBar ,Flex } from '@ant-design/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from './Home'
import Music from './Music'
import Information from "./Photo"
export default class BasicTabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'homeTab',
    };
  }
  renderContent(webpage) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Flex direction="column">
          <Flex direction="row">
          <Flex.Item style={{flex:3}}>
          <Text style={{backgroundColor:"rgb(239,239,244)",fontSize:33}}>北城之音</Text>
          </Flex.Item>
          <Flex.Item style={{flex:5}}>
          <SearchBar placeholder="Search" showCancelButton/>
          </Flex.Item>
        </Flex>
        </Flex>
        {webpage}
      </View>
    );
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="首页"
          icon={<FontAwesome name="home" size={20}/>}
          selected={this.state.selectedTab === 'homeTab'}
          onPress={() => this.onChangeTab('homeTab')}
        >
          {this.renderContent(<Home />)}
        </TabBar.Item>
        <TabBar.Item
          icon={<FontAwesome name="video-camera" size={20}/>}
          title="正在播"
          selected={this.state.selectedTab === 'musicTab'}
          onPress={() => this.onChangeTab('musicTab')}
        >
          {this.renderContent(<Music />)}
        </TabBar.Item>
        <TabBar.Item
          icon={<FontAwesome name="user" size={20}/>}
          title="制作人信息"
          selected={this.state.selectedTab === 'userTab'}
          onPress={() => this.onChangeTab('userTab')}
        >
          {this.renderContent(<Information />)}
        </TabBar.Item>
      </TabBar>
    );
  }
}