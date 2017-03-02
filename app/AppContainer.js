import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, StyleProvider, getTheme, variables, Drawer, Tabs, Tab, Text, TabHeading, Icon } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { Router, Scene } from 'react-native-router-flux';

import AirHeader from './components/Header/AirHeader';
import NHSearchbar from './components/searchbar/';
import Home from './components/home/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/variables';

const {
  popRoute,
} = actions;

const RouterWithRedux = connect()(Router);

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppContainer extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    themeState: React.PropTypes.string,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render(){
    return(
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Container style={{'flex':1}}>
          <Header hasTab>
            <Icon name="keypad" onPress={() => this.openDrawer()}/>
            <NHSearchbar/>
          </Header>
          <Tabs tabBarPosition='bottom'>
              <Tab heading={ <TabHeading><Icon name="home" /><Text>Camera</Text></TabHeading>}>
                  {this.props.searching ? <Text>Searching...</Text> : null }
              </Tab>
              <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
                  <Text>2</Text>
              </Tab>
              <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
                  <Text>3</Text>
              </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}

const bindAction = dispatch => ({
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  themeState: state.drawer.themeState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppContainer);
