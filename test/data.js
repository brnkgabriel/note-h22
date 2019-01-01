var data = {
  materials: [
    {
      author: "Superbook",
      event: "The Creation (Genesis 1)",
      location: "https://www.youtube.com/embed/fn-wEOpPsMo",
      time: "Before 4000 BC",
      title: "In the Beginning",
      type: "message",
      uid: "material-1545841262976",
      questions: [
        {
          title: "The earth was without form and _______",
          uid: "question-1545843541397",
          options: [
            {
              pts: "-10",
              value: "bright"
            }, {
              pts: "-10",
              value: "dark"
            }, {
              pts: "10",
              value: "void"
            }
          ]
        }, {
          title: "In the Beginning God created the __________",
          uid: "question-1545841262976",
          options: [
            {
              value: "heaven-earth",
              pts: "10"
            }, {
              value: "earth-heaven",
              pts: "-10"
            }, {
              value: "New Option",
              pts: "-10"
            }
          ]
        }
      ]
    }, {
      author: "Myles Munroe",
      event: "In the Beginning was the Word (John 1)",
      location: "https://www.youtube.com/embed/sboYH7-Aj0o",
      time: "Before Time",
      title: "The Principles of Creation",
      type: "message",
      uid: "material-1545841953015",
      questions: [
        {
          title: "New Question...",
          uid: "question-1545841953015",
          options: [
            {
              value: "New Value",
              pts: "-10"
            }
          ]
        }
      ]
    }
  ],
  scores: [
    {
      index: 2,
      materialId: "material-1545841262976",
      response: [
        "0|1",
        "1|2"
      ]
    }, {
      index: 1,
      materialId: "material-1545841953015",
      response: [
        "0|0"
      ]
    }
  ]
}

module.exports = data;