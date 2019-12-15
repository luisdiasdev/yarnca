import { GiftedChat } from 'react-native-gifted-chat';
import { Text, StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';

import SocketIOClient from 'socket.io-client';

import { COLORS, SERVER_URL } from '../../constants';

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.chatBackground,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: COLORS.headerBackground,
  },
  titleText: {
    margin: 10,
    color: COLORS.headerTextColor,
    fontSize: 18,
    paddingBottom: 5,
    borderBottomColor: COLORS.headerTextColor,
    borderBottomWidth: 1,
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
        <StatusBar barStyle="light-content" backgroundColor={COLORS.main} />
        <SafeAreaView style={styles.titleContainer}>
          <Text style={styles.titleText}>Chat</Text>
        </SafeAreaView>
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={this.handleSend}
            user={user}
            showUserAvatar
          />
        </View>
      </View>
    );
  }
}

export default Chat;
