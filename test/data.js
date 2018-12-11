var quizData = {
  responses: [
    "question-1544106119844|hear-us-singing",
    "question-1544106119845|hear-us-singing",
  ],
  questions: [
    {
      question: 'We the redeemed_________',
      options: [
        {
          key: 'hear-us-singing',
          value: 'hear us singing',
          pts: 10
        }, {
          key: 'you-are-holy',
          value: 'You are Holy',
          pts: -10
        }, {
          key: 'we-will-see-him',
          value: 'we will see Him',
          pts: -10
        }
      ],
      serial: 1,
      stage: 1,
      type: 'worship',
      uid: "question-1544106119844"
    },
  ],
  expandedResponse: {
    date: '2018-12-10',
    quizNo: '2',
    worship: {
      id: 'material-1544331983313',
      stopped: '5',
      missed: ['2-0', '3-2']
    },
    message: {
      id: 'material-1544331983314',
      stopped: '8',
      missed: ['5-0']
    },
    bible: {
      id: 'material-1544331983324',
      stopped: '9',
      missed: ['1-1'],
    },
    book: {
      id: 'material-1544331983315',
      stopped: '3',
      missed: ['0-0']
    },
    picture: {
      id: 'material-1544331983325',
      stopped: '0',
      missed: []
    },
  },
  compressedResponse: '2018-12-10@2|material-1544331983313;2-0;3-2;5|material-1544331983314;5-0;8|material-1544331983324;1-1;9|material-1544331983315;0-0;3|material-1544331983325;0',
  materials: [
    {
      uid: 'material-1544331983313',
      type: 'worship'
    },
    {
      uid: 'material-1544331983314',
      type: 'message'
    },
    {
      uid: 'material-1544331983324',
      type: 'bible'
    },
    {
      uid: 'material-1544331983315',
      type: 'book'
    },
    {
      uid: 'material-1544331983325',
      type: 'picture'
    },
  ]
};

module.exports = quizData;