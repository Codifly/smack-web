import { observable, action, computed, useStrict } from 'mobx';

const channelEveryone = { id: 'everyone', name: 'Global Smack' };

class SmackStore {
    // "redux entities"
    @observable users = {}; // {id, status, username}
    @observable channels = { [channelEveryone.id]: channelEveryone }; // {id: 'everyone', name: 'Global Smack'}
    @observable messages = {}; // {id, message, timestamp, userId}

    // "redux relations"
    @observable chatHasUsers = []; // id
    @observable chatHasChannels = [channelEveryone.id]; // id
    @observable userHasMessages = {};
    @observable channelHasMessages = {};

    // "redux rest dingen"
    @observable myUserId;

    loginSucces(data) { //data = { id, status, username }
        this.users[data.id] = data;
    }
    usersFetch(data) { // data = [{ id, status, username }]
        data.array.forEach((user) => { this.users[user.id] = user; });
        //this.users.push.apply(data);
        //this.chatHasUsers.push.apply(data.map(user => user.id));
    }

    joinedChat(data) { // data = { id, status, username }
        if (this.chatHasUsers.indexOf(data.id) === -1) {
            this.chatHasUsers.unshift(data.id);
        }
        if (this.users[data.id] === -1) {
            this.users[data.id] = data;
        }
    }
    leftChat(data) { // data = { id, status, username }
        if (this.chatHasUsers.indexOf(data.id) === -1) {
            this.chatHasUsers.unshift(data.id);
        }
        if (this.users.indexOf(data) === -1) {
            this.users[data.id] = data;
        }
    }

    receiveChannelMessage(data) { // data =  { channelId, message: { id, message, timestamp, userId } }
        const { channelId, message } = data;
        this.messages[message.id] = message;
        this.channelHasMessages[channelId].push(message);
    }
    receiveUserMessage(data) { // data =  { id, message, timestamp, userId }
        const message = data;
        this.messages[message.id] = message;
        this.userHasMessages[message.userId].push(message);
    }

    sendUserMessage(data) { // data =  { message: { id, message, timestamp, userId }, userId }
        const message = data.message;
        this.messages[message.id] = message;
        this.userHasMessages[data.userId].push(message);
    }

    channelMessagesFetch(data) { // data = { channelId, messages }
        const { channelId, messages } = data;
        messages.array.forEach((message) => { this.messages[message.id] = message; });
        this.channelHasMessages[channelId] = messages;
    }
    userMessagesFetch(data) { // data = { messages, userId }
        const { messages, userId } = action.data;
        messages.array.forEach((message) => { this.messages[message.id] = message; });
        this.userHasMessages[userId] = messages;
    }

}

const smackStore = new SmackStore();
export default smackStore;