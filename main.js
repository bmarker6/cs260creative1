// Keypress?
// Hangmang pictures
// CSS
// Random words
var word = ''
var guesses = []
var blankWord = ''
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
var misses = 0
var gameover = false
var randomWords = ['ALBATROSS', 'BACON', 'ALPHABET', 'ZOOLOGY', 'CAFFEINE', 'JAVASCRIPT']

function renderMisses() {
    document.getElementById('status').innerHTML = misses + ' miss(es)'
}

function renderWord() {
  document.getElementById('blanks').innerHTML = blankWord.split('').join(' ')

}

function renderButtons() {
  var buttons = alphabet.map(function(letter) {
  var disableString = (guesses.includes(letter) > 0 || gameover) ? 'disabled' : ''
    return '<button type="button" ' + disableString + ' " onclick="handleClick(\'' + letter + '\')">' + letter + '</button>'
  })
  document.getElementById('letters').innerHTML = buttons.join('');
}
function handleClick(letter) {
  guesses.push(letter)
  if (word.includes(letter)) {
    var newBlankWord = ''
    for (var i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        newBlankWord += letter
      }
      else {
        newBlankWord += blankWord[i]
      }
    }
    blankWord = newBlankWord
    if (!blankWord.includes('_')) {
      gameover = true
      document.getElementById('status').innerHTML = 'YOU WIN!'
    }
    renderWord()
  }
  else {
    misses++
    if (misses >= 6) {
      gameover = true
      document.getElementById('status').innerHTML = 'YOU LOSE! The word was ' + word
    }
    else {
    renderMisses()
    }
  }
  renderButtons()
}

function setup(newWord) {
  if (newWord) {
    word = newWord
  }
  else {
    word = randomWords[Math.floor(Math.random() * (randomWords.length))]
  }
  guesses = []
  misses = 0
  gameover = false
  blankWord = '_'.repeat(word.length)
  renderButtons()
  renderMisses()
  renderWord()        
}

function setupCustomWord() {
  setup(document.getElementById('customWord').value.toUpperCase())
}
setup()