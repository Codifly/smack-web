import { observable, action, computed, useStrict } from 'mobx';

const channelEveryone = { id: 'everyone', name: 'Global Smack' };

class SmackStore {
    // "redux entities"
    @observable users = []; // {id, status, username}
    @observable channels = [ channelEveryone ]; // {id: 'everyone', name: 'Global Smack'}
    @observable messages = []; // {id, message, timestamp, userId}

    // "redux relations"
    @observable chatHasUsers = []; // id
    @observable chatHasChannels = [ channelEveryone.id ]; // id

    // "redux rest dingen"
    @observable myUserId;

    loginSucces(data) { //data = { id, status, username }
        this.users.push(data);
    }
    usersFetch(data) { // data = [{ id, status, username }]
        this.users.push.apply(data);
        this.chatHasUsers.push.apply(data.map(user => user.id));
    }
    joinedChat(data) { // data = { id, status, username }
        if (this.chatHasUsers.indexOf(data.id) === -1) {
            this.chatHasUsers.unshift(data.id);
        }
        if (this.users.indexOf(data) === -1) {
            this.users.push(data);
        }
    }
    leftChat(data) { // data = { id, status, username }
        if (this.chatHasUsers.indexOf(data.id) === -1) {
            this.chatHasUsers.unshift(data.id);
        }
        if (this.users.indexOf(data) === -1) {
            this.users.push(data);
        }
    }
}

const smackStore = new SmackStore();
export default smackStore;