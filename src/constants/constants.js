const CONSTANTS = {
  BASE_URL: 'https://lyceumexams.herokuapp.com/api/', // 'http://localhost:5000/api/'
  LYCEUM_URL: 'http://lyceum.by/admin/pupils/api/examStatus/',

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
      value: 'firstName',
      width: '60%'
    },
    { text: 'Аудитория',
      value: 'audience',
      width: '30%'
    },
    {
      text: 'Info',
      value: 'examStatus',
      width: '10%'
    }
  ],

  EXAM_STATUSES: {
    '0': 'ok',
    '1': 'неявка',
    '2': 'удален за дело',
    '3': 'удален по хорошей причине'
  },

  SNACKBAR_SUCCESS: 'Статус сохранен',
  SNACKBAR_ERROR: 'Не получилось'

}

export default CONSTANTS
