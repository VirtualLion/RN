import React from 'react';
import { 
    Text, 
    View 
} from 'react-native';
import { 
    Icon, 
    SearchBar, 
    TabBar 
} from '@ant-design/react-native';
import {
    SafeAreaView
} from 'react-navigation';
import {connect, DispatchProp} from 'react-redux'
import {getData} from '../../../redux/actions/navAction'



interface Props extends DispatchProp {}
interface State {
    selectedTab: string;
}

class BasicTabBarExample extends React.Component<Props, State> {
    state:State;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
        };
    }

    componentDidMount() {
        console.log('get')
        this.props.dispatch(getData());
    }

    renderContent(pageText: string) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton />
                <Text style={{ margin: 50 }}>{pageText}</Text>
            </SafeAreaView>
        );
    }
    onChangeTab(tabName: string) {
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
                    title="Life"
                    icon={<Icon name="home" />}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => this.onChangeTab('blueTab')}
                >
                    {/* {this.renderContent('Life Tab')} */}
                    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                        {/* <SearchBar placeholder="Search" showCancelButton /> */}
                        <Text style={{ margin: 50 }}>{123}</Text>
                    </SafeAreaView>
                    
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="ordered-list" />}
                    title="Koubei"
                    badge={2}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => this.onChangeTab('redTab')}
                >
                    {this.renderContent('Koubei Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="like" />}
                    title="Friend"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => this.onChangeTab('greenTab')}
                >
                    {this.renderContent('Friend Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="user" />}
                    title="My"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => this.onChangeTab('yellowTab')}
                >
                    {this.renderContent('My Tab')}
                </TabBar.Item>
            </TabBar>
        );
    }
}

function select(store: any){
    console.log('connect');
    console.log(store.nav);
    return {
        data: store.nav.value
    }
}
  
  
export default connect(select)(BasicTabBarExample);