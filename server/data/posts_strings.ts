const Q1_DESC = 'Programmatically navigate using React router'
const Q1_TXT =
  'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.'

const Q2_DESC = 'android studio save string shared preference, start activity and load the saved string'
const Q2_TXT =
  'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.'

const Q3_DESC = 'Object storage for a web application'
const Q3_TXT =
  'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.'

const Q4_DESC = 'Quick question about storage on android'
const Q4_TXT =
  'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains'

const A1_TXT =
  "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node."
const A2_TXT =
  "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."
const A3_TXT =
  'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.'
const A4_TXT =
  'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);'
const A5_TXT = 'I just found all the above examples just too confusing, so I wrote my own.'
const A6_TXT = 'Storing content as BLOBs in databases.'
const A7_TXT = 'Using GridFS to chunk and store content.'
const A8_TXT = 'Store data in a SQLLite database.'

export {
  Q1_DESC,
  Q1_TXT,
  Q2_DESC,
  Q2_TXT,
  Q3_DESC,
  Q3_TXT,
  Q4_DESC,
  Q4_TXT,
  A1_TXT,
  A2_TXT,
  A3_TXT,
  A4_TXT,
  A5_TXT,
  A6_TXT,
  A7_TXT,
  A8_TXT
}
