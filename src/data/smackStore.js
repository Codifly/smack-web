import { observable, action, computed, useStrict } from 'mobx';

class smackStore {
    @observable users = [{id, status, username}];
    @observable channels = [{id: 'everyone', name: 'Global Smack'}];
    @observable messages = [{id, message, timestamp, userId}];
}