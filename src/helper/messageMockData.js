export const mockMessage = () => {
  return {
    channel_id: 29,
    id: 62,
    message: "haha",
    user_id: 7,
    username: "Nicky",
    created_at: "2021-02-26T03:31:08.123Z"
  }
};

export const mockAllMessages = () => {
  return [
    {
      channel_id: 29,
      created_at: "2021-02-26T03:30:36.035Z",
      id: 61,
      message: "yes",
      user_id: 6,
      username: "test4567",
    }, {
      channel_id: 29,
      id: 62,
      message: "haha",
      user_id: 7,
      username: "Nicky",
      created_at: "2021-02-26T03:31:08.123Z"
    }, {
      channel_id: 29,
      created_at: "2021-02-26T03:29:46.572Z",
      id: 60,
      message: "works?",
      user_id: 7,
      username: "Nicky",
    }, {
      channel_id: 29,
      created_at: "2021-02-26T03:26:44.354Z",
      id: 56,
      message: "maybe",
      user_id: 6,
      username: "test4567",
    }, {
      channel_id: 29,
      created_at: "2021-02-26T03:26:44.354Z",
      id: 55,
      message: "what?",
      user_id: 5,
      username: "test457",
    }, {
      channel_id: 29,
      created_at: "2021-02-26T03:26:44.354Z",
      id: 57,
      message: "seriously?",
      user_id: 5,
      username: "test457",
    }, {
      channel_id: 29,
      created_at: "2021-02-26T03:26:44.354Z",
      id: 58,
      message: "chat app, right?",
      user_id: 5,
      username: "test457",
    }
  ]
};
