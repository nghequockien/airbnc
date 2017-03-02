
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Icon, Item, Input, Content,Text } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { search } from '../../actions/search';
import styles from './styles';

class NHSearchbar extends Component { // eslint-disable-line
  constructor(props) {
    super(props)
    this.state = { searching: false, locationQ: '' }
  }

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  searchPressed() {
    this.setState({ searching: true })
    this.props.search(this.state.locationQ).then( (res) => {
      this.setState({searching: false })
    });
  }

  searchResults() {
    return Object.keys(this.props.searchedResults).map(key => this.props.searchResults[key])
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search"
            onChangeText={(locationQ) => this.setState({locationQ})}
            value={this.state.locationQ}/>
            <Icon active name="home" />
          </Item>
          <Button transparent onPress={ () => this.searchPressed() }>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    searchPressed: () => dispatch(searchPressed()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  searchedResults: state.searchedResults,
});

export default connect(mapStateToProps, bindAction)(NHSearchbar);
