import { SERVER_URL } from 'env';
import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Header from './Header';
import Calls from './CallsTab';
import Chats from './ChatsTab';
import Contacts from './ContactsTab';

const transformData = (data) => {
  data.Contacts.forEach((Contact) => {
    Contact.image = `${SERVER_URL}/${Contact.image}`;
  });
  data.Chats.forEach((Chat) => {
    Chat.image = `${SERVER_URL}/${Chat.image}`;
  });
  data.Calls.forEach((Call) => {
    Call.image = `${SERVER_URL}/${Call.image}`;
  });
};

// Main Component
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Contacts: [],
      Chats: [],
      Calls: [],
    };
    fetch(`${SERVER_URL}/data/dbMock.json`)
     .then(response => response.json())
     .then(data => {
       transformData(data);
       return this.setState({
         Contacts: data.Contacts,
         Chats: data.Chats,
         Calls: data.Calls,
       });
     });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <ScrollableTabView
          style={{ borderColor: '#fff' }}
          tabBarUnderlineStyle={style = { backgroundColor: '#fff' }}
          tabBarBackgroundColor="#075e54"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#88b0ac"
          initialPage={1}
        >
          <Calls
            tabLabel="CALLS"
            CallsData={this.state.Calls}
            {...this.props}
          />
          <Chats
            tabLabel="CHATS"
            ChatsData={this.state.Chats}
            {...this.props}
          />
          <Contacts
            tabLabel="CONTACTS"
            ContactsData={this.state.Contacts}
            {...this.props}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

export default Home;
