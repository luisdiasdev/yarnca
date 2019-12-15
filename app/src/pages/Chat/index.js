import { GiftedChat } from 'react-native-gifted-chat';
import { Text, StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';

import SocketIOClient from 'socket.io-client';

import { COLORS, SERVER_URL } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.main,
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      messages: [],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    const name = navigation.getParam('name');
    if (name) {
      this.socket = new SocketIOClient(SERVER_URL, {
        transports: ['websocket'],
        query: {
          name,
        },
      });

      this.socket.on('user', data => {
        this.setState({
          user: data,
        });
      });

      this.socket.on('message', data => {
        const { messages } = this.state;

        this.setState({
          messages: GiftedChat.append(messages, data),
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }

  handleSend = newMessages => {
    const { messages } = this.state;
    this.setState(
      {
        messages: GiftedChat.append(messages, newMessages),
      },
      () => {
        this.socket.emit('message', newMessages);
      }
    );
  };

  render() {
    const { messages, user } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.main} />
        <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
          <Text>Chat</Text>
        </SafeAreaView>
        <GiftedChat messages={messages} onSend={this.handleSend} user={user} />
      </View>
    );
  }
}

export default Chat;
