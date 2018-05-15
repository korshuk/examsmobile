const CONSTANTS = {
  BASE_URL: 'https://lyceumexams.herokuapp.com/api/',
 // BASE_URL: 'http://localhost:5000/api/',
  LYCEUM_URL: 'http://lyceum.by/images/pupils/',

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

  EXAM_ICONS: {
    '0': 'ok',
    '1': 'directions_run',
    '2': 'format_align_left',
    '3': 'local_hospital'
  },

  SNACKBAR_SUCCESS: 'Статус сохранен',
  SNACKBAR_ERROR: 'Не получилось',

  VIEWER_OPTIONS: {
    inline: false,
    button: true,
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: {
        show: true,
        size: 'large'
      },
      zoomOut: {
        show: true,
        size: 'large'
      },
      oneToOne: {
        show: true,
        size: 'large'
      },
      reset: {
        show: true,
        size: 'large'
      },
      prev: false,
      play: false,
      next: false,
      rotateLeft: {
        show: true,
        size: 'large'
      },
      rotateRight: {
        show: true,
        size: 'large'
      },
      flipHorizontal: false,
      flipVertical: false
    },
    tooltip: false,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }

}

export default CONSTANTS
