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
    return {
      date: codedArray[0],
      message: util.messages[parseInt(codedArray[1])],
      preacher: util.preachers[parseInt(codedArray[2])],
      score: codedArray[3],
      age: codedArray[4],
      aggregate: codedArray[5]
    }
  },
  codeScores: function (decodedScores) {
    var messageIndex = util.messages
      .findIndex(message => decodedScores.message === message);
    var preacherIndex = util.preachers
      .findIndex(preacher => decodedScores.preacher === preacher);
    return decodedScores.date + '|'
      + messageIndex + '|'
      + preacherIndex + '|'
      + decodedScores.score + '|'
      + decodedScores.age + '|'
      + decodedScores.aggregate;
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
  messages: ["Arrived",
    "Eternal Life",
    "Close Encounters of the God Kind",
    "Growing Up Spiritually",
    "The Cost of a Crown",
    "The Love Walk",
    "Opted for Group Discussion",
    "Repositioning for Exploits",
    "1John 4:4",
    "Hand Sequence",
    "Yesterday, Today and Tomorrow",
    "Your Abilities",
    "Maximizing Your Most Valuable Asset",
    "Character Custodian of Destiny",
    "The Myth of Singleness",
    "Being Still (Psalms 46vs10)",
    "Selecting the Most Appropriate Word Replacement",
    "Personalizing Scripture",
    "Inner Counsel",
    "Bible Questions",
    "Marathon Question",
    "Uzziah's Story",
    "Multiple Choice",
    "4-Cards",
    "Memory Test",
    "Scripture Expansion",
    "Multiple Choice",
    "Tower of Hanoi & Marriage",
    "The Innovative Demands of Leadership",
    "The Best Kept Secret",
    "Divine Secrets ",
    "Kingdom Keys to Successful Relationships",
    "Heralding the Emergence of World Changers",
    "The Encounter",
    "The Ten Attitudes for Leadership Development",
    "What is Faith?",
    "The Media Mandate of the Kingdom",
    "Engaging the Armour of Light for Total Deliverance",
    "Vital Keys to Achieving Your Vision",
    "Engaging Violent Faith for Supernatural Turnaround",
    "How to Excel in Your Field",
    "The Stronghold of Faith",
    "How to Deal with Grief 2/4",
    "Christmas Jubilee and Direction",
    "The Holy Spirit",
    "God's Kind of Love To You",
    "7 Mistakes to avoid before Marriage & End of the Harvest",
    "Deepening your Relationship with God & 3 Types of Friends",
    "Spirituality the Master Key to a World of Exploits",
    "Life 2",
    "Marriage Prep 101",
    "Salvation Testimony",
    "God's Love (Love Series 3)",
    "The Last Reformation (0:00-30:27)",
    "The Power of Spiritual Depth",
    "The Last Reformation (30:27-The End)",
    "The Principles of Creation",
    "Drive Through History Holy Land 1",
    "How to Walk in Confidence",
    "The Believer's Authority 1",
    "The Dignity of Spirituality",
    "The Spirit of the Gift of the King",
    "John Maxwell at Hillsong",
    "Visions of Heaven and Hell",
    "Responsibility ",
    "Grant You Power Over Circumstances",
    "Talent is Never Enough 1 ",
    "The Holy Spirit",
    "Understanding the Principles and Priority of Goals",
    "The Word Renewed Mind",
    "The Power of Meditation",
    "The Responsibility of Freedom",
    "The Kingdom Culture of Relationships",
    "Engaging the Laws of the Spirit for Exploit",
    "Single Again (Message for the Married and Unmarried)",
    "Engaging the Power of Dedication for Exploits",
    "Understanding the Principle and Power of Law",
    "Rediscovering the Kingdom Mandate and Identifying Your Role",
    "Faith to Change the World",
    "Unveiling the Stronghold of Faith",
    "The Passion of the Christ",
    "Harnessing Your Emotions 1",
    "Cooperate With the Laws of God",
    "The Price of Power",
    "How to Deal With Temptation 3",
    "Developing Spiritual Capacity Towards Sustainable Global Impact",
    "Special Communion Service",
    "The Pilgrim's Progress",
    "Kingdom Keys for Success",
    "The Source of the Leadership Spirit",
    "How to Deal With Grief 1",
    "Life",
    "Ultimate Myles Munroe 2016 Collection",
    "The Kingdom Power of Self Government",
    "Who's Who in Hell",
    "Walking in Financial Dominion 1",
    "Eagle's Summit 2017",
    "You Have the Power",
    "Principles of Male and Female Relationships",
    "The Life and Power of Words",
    "Word Finder",
    "Signed Up"]

}
// uncomment below when you want to test
// and comment when you want to use
// module.exports = util;

// comment below when you want to test
// and uncomment when you want to use
export default util;