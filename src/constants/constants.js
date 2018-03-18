const CONSTANTS = {
  BASE_URL: 'https://lyceumexams.herokuapp.com/api/', // 'http://localhost:5000/api/'

  NONE_PLACE: {
    _id: '',
    code: 'All',
    audience: []
  },

  NONE_AUDIENCE: {
    _id: '',
    name: 'All'
  },

  TABLE_HEADERS: [
    {
      text: 'Абитуриент',
      align: 'left',
      value: 'firstName'
    },
    { text: 'Аудитория',
      value: 'audience'
    }
  ]
}

export default CONSTANTS
