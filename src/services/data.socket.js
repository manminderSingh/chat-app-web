import { API_WS_URL} from './../constants/';
const actioncable = require("actioncable");

let cable;

const init = () => {
  cable = actioncable.createConsumer(API_WS_URL);
  return cable;
}

const channelList = () => {
  let cable = init();
  cable.subscriptions.create({
    channel: `conversations_channel`
},{
    connected: () => {
        console.log("connected!")
    },
    disconnected: () => {
      console.log('disconnected');
    },
    received: data => {
      console.log(data);
      // return data;
    }
})
  // console.log(cable);
}

const channelMessages = (channelId) => {

}

const DataSocket = {
  init,
  channelList,
  channelMessages
}

export default DataSocket;