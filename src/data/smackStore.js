import { observable, action, computed, useStrict } from 'mobx';

class SmackStore {
    @observable users = [{id, status, username}];
    @observable channels = [{id: 'everyone', name: 'Global Smack'}];
    @observable messages = [{id, message, timestamp, userId}];
}

const smackStore = new SmackStore();

export default smackStore;
export { smackStore };