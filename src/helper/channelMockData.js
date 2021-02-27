export const mockAllChannels = () => {
  return[{
    "name": "slack",
    "id": "29",
    "created_at": "2021-02-24T22:18:39.474Z",
    "updated_at": "2021-02-24T22:18:39.474Z"
  },
  {
    "name": "teams",
    "id": "30",
    "created_at": "2021-02-24T23:03:34.144Z",
    "updated_at": "2021-02-24T23:03:34.144Z"
  },
  {
    "name": "zoom",
    "id": "31",
    "created_at": "2021-02-25T02:08:00.999Z",
    "updated_at": "2021-02-25T02:08:00.999Z"
  },
  {
    "name": "team",
    "id": "85",
    "created_at": "2021-02-26T05:46:33.897Z",
    "updated_at": "2021-02-26T05:46:33.897Z"
  },
  {
    "name": "app1",
    "id": "86",
    "created_at": "2021-02-26T05:48:21.662Z",
    "updated_at": "2021-02-26T05:48:21.662Z"
  },
  {
    "name": "app2",
    "id": "87",
    "created_at": "2021-02-26T05:50:03.126Z",
    "updated_at": "2021-02-26T05:50:03.126Z"
  },
  {
    "name": "app3",
    "id": "88",
    "created_at": "2021-02-26T06:15:34.593Z",
    "updated_at": "2021-02-26T06:15:34.593Z"
  }]
};

export const mockSelectedChannel = () => {
  return {
    "name": "app3",
    "id": "88",
    "created_at": "2021-02-26T06:15:34.593Z",
    "updated_at": "2021-02-26T06:15:34.593Z"
  }
};

export const mockNonExistentChannel = () => {
  return {
    "name": "app4",
    "id": "108",
    "created_at": "2021-02-26T06:15:34.593Z",
    "updated_at": "2021-02-26T06:15:34.593Z"
  }
};
