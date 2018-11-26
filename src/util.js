var util = {
  getAge: function (birthday, today) {
    var bday = util.getBirthdayObject(birthday);
    return util.compareAndReturnRightAge(today, bday);
  },
  compareAndReturnRightAge: function (today, bday) {
    if (
      today.month < bday.month ||
      (
        today.month == bday.month &&
        today.day < bday.day
      )
    ) { return (today.year - bday.year) - 1; }
    return today.year - bday.year;
  },
  getBirthdayObject: function (birthday) {
    var delimeter = (birthday.indexOf('/') !== -1) ? '/' : '-';
    var bdayArray = birthday.split(delimeter);
    if (delimeter === '-') {
      return {
        day: parseInt(bdayArray[2]),
        month: parseInt(bdayArray[1]),
        year: parseInt(bdayArray[0])
      }
    }
    return {
      day: parseInt(bdayArray[1]),
      month: parseInt(bdayArray[0]),
      year: parseInt(bdayArray[2])
    }
  },
  decodeScores: function (codedScores) {
    var codedArray = codedScores.split('|');
    var extractedMsg = util.messages[parseInt(codedArray[1])]
    return {
      date: codedArray[0],
      message: extractedMsg.split('|')[0],
      preacher: util.preachers[parseInt(codedArray[2])],
      score: codedArray[3],
      age: codedArray[4],
      aggregate: codedArray[5]
    }
  },
  codeScores: function (decodedScores) {
    var messageIndex = util.messages
      .findIndex(message => decodedScores.message.toLowerCase() === message.split('|')[0].toLowerCase());
    var preacherIndex = util.preachers
      .findIndex(preacher => decodedScores.preacher.toLowerCase() === preacher.toLowerCase());
    var encodedScores = decodedScores.date + '|'
    + messageIndex + '|'
    + preacherIndex + '|'
    + decodedScores.score + '|'
    + decodedScores.age + '|'
    + decodedScores.aggregate; 
    return encodedScores
  },
  decodeStudent: function (student) {
    var decodedStudent = student;
    var scores = [], decodedScores = [];
    scores = decodedStudent.user_data.scores.split("*");
    scores.forEach(score => {
      decodedScores.push(util.decodeScores(score));
    });
    decodedStudent.user_data.scores = decodedScores;
    return decodedStudent;
  },
  encodeStudent: function (student) {
    var encodedStudent = student;
    var scores = [], codedScores = [], encodedScores = '';
    scores = encodedStudent.user_data.scores;
    scores.forEach(score => {
      codedScores.push(util.codeScores(score));
    })
    encodedScores = codedScores.join('*')
    return {
      email: encodedStudent.email,
      first_name: encodedStudent.first_name,
      last_name: encodedStudent.last_name,
      roles_permissions: {
        roles: encodedStudent.roles_permissions.roles
      },
      uid: encodedStudent.uid,
      user_data: {
        birthday: encodedStudent.user_data.birthday,
        scores: encodedScores
      }
    }
  },
  today: {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  },
  preachers: [
    "Myles Munroe",
    "Kenneth E Hagin",
    "Bishop David Oyedepo",
    "Admin",
    "Youths",
    "Jesse Duplantis",
    "Andrew Wommack",
    "Pastor E.A. Adeboye",
    "Pure Flix Entertainment",
    "Christiano Film Group",
    "TD Jakes",
    "Akatio Films",
    "John Maxwell",
    "John Bunyan",
    "Kenneth Copeland",
    "Mel Gibson",
    "Charles Capps"
  ],
  messages: ["Arrived|3",
    "Eternal Life|6",
    "Close Encounters of the God Kind|5",
    "Growing Up Spiritually|1",
    "The Cost of a Crown|2",
    "The Love Walk|1",
    "Opted for Group Discussion|3",
    "Repositioning for Exploits|2",
    "1John 4:4|3",
    "Hand Sequence|3",
    "Yesterday, Today and Tomorrow|3",
    "Your Abilities|3",
    "Maximizing Your Most Valuable Asset|3",
    "Character Custodian of Destiny|2",
    "The Myth of Singleness|0",
    "Being Still (Psalms 46vs10)|3",
    "Selecting the Most Appropriate Word Replacement|3",
    "Personalizing Scripture|3",
    "Inner Counsel|3",
    "Bible Questions|3",
    "Marathon Question|3",
    "Uzziah's Story|3",
    "Multiple Choice|3",
    "4-Cards|3",
    "Memory Test|3",
    "Scripture Expansion|3",
    "Multiple Choice|3",
    "Tower of Hanoi & Marriage|3",
    "The Innovative Demands of Leadership|0",
    "The Best Kept Secret|0",
    "Divine Secrets|2 ",
    "Kingdom Keys to Successful Relationships|0",
    "Heralding the Emergence of World Changers|2",
    "The Encounter|8",
    "The Ten Attitudes for Leadership Development|0",
    "What is Faith?|2",
    "The Media Mandate of the Kingdom|0",
    "Engaging the Armour of Light for Total Deliverance|2",
    "Vital Keys to Achieving Your Vision|0",
    "Engaging Violent Faith for Supernatural Turnaround|2",
    "How to Excel in Your Field|2",
    "The Stronghold of Faith|2",
    "How to Deal with Grief 2/4|6",
    "Christmas Jubilee and Direction|0",
    "The Holy Spirit|0",
    "God's Kind of Love To You|6",
    "7 Mistakes to avoid before Marriage & End of the Harvest|7&9",
    "Deepening your Relationship with God & 3 Types of Friends|10",
    "Spirituality the Master Key to a World of Exploits|2",
    "Life 2|2",
    "Marriage Prep 101|7",
    "Salvation Testimony|1",
    "God's Love (Love Series 3)|6",
    "The Last Reformation (0:00-30:27)|11",
    "The Power of Spiritual Depth|2",
    "The Last Reformation (30:27-The End)|11",
    "The Principles of Creation|0",
    "Drive Through History Holy Land 1|17",
    "How to Walk in Confidence|0",
    "The Believer's Authority 1|6",
    "The Dignity of Spirituality||2",
    "The Spirit of the Gift of the King|0",
    "John Maxwell at Hillsong|12",
    "Visions of Heaven and Hell|13",
    "Responsibility|2",
    "Grant You Power Over Circumstances|0",
    "Talent is Never Enough 1|12",
    "The Holy Spirit|0",
    "Understanding the Principles and Priority of Goals|0",
    "The Word Renewed Mind|14",
    "The Power of Meditation|2",
    "The Responsibility of Freedom|0",
    "The Kingdom Culture of Relationships|0",
    "Engaging the Laws of the Spirit for Exploit|2",
    "Single Again|0",
    "Engaging the Power of Dedication for Exploits|2",
    "Understanding the Principle and Power of Law|0",
    "Rediscovering the Kingdom Mandate and Identifying Your Role|0",
    "Faith to Change the World|2",
    "Unveiling the Stronghold of Faith|2",
    "The Passion of the Christ|15",
    "Harnessing Your Emotions 1|6",
    "Cooperate With the Laws of God|6",
    "The Price of Power|2",
    "How to Deal With Temptation 3|6",
    "Developing Spiritual Capacity Towards Sustainable Global Impact|2",
    "Special Communion Service|2",
    "The Pilgrim's Progress|13",
    "Kingdom Keys for Success|0",
    "The Source of the Leadership Spirit|0",
    "How to Deal With Grief 1|6",
    "Life|2",
    "Ultimate Myles Munroe 2016 Collection|0",
    "The Kingdom Power of Self Government|0",
    "Who's Who in Hell|1",
    "Walking in Financial Dominion 1|2",
    "Eagle's Summit 2017|2",
    "You Have the Power|6",
    "Principles of Male and Female Relationships|0",
    "The Life and Power of Words|16",
    "Word Finder|3",
    "Signed Up"]
}
// uncomment below when you want to test
// and comment when you want to use
// module.exports = util;

// comment below when you want to test
// and uncomment when you want to use
export default util;