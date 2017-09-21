var randomWords = "ability,about,above,accept,according,account,across,action,activity,actually,address,administration,admit,adult,affect,after,again,against,agency,agent,agree,agreement,ahead,allow,almost,alone,along,already,although,always,American,among,amount,analysis,animal,another,answer,anyone,anything,appear,apply,approach,argue,around,arrive,article,artist,assume,attack,attention,attorney,audience,author,authority,available,avoid,beautiful,because,become,before,begin,behavior,behind,believe,benefit,better,between,beyond,billion,black,blood,board,break,bring,brother,budget,build,building,business,camera,campaign,cancer,candidate,capital,career,carry,catch,cause,center,central,century,certain,certainly,chair,challenge,chance,change,character,charge,check,child,choice,choose,church,citizen,civil,claim,class,clear,clearly,close,coach,collection,college,color,commercial,common,community,company,compare,computer,concern,condition,conference,Congress,consider,consumer,contain,continue,control,could,country,couple,course,court,cover,create,crime,cultural,culture,current,customer,daughter,death,debate,decade,decide,decision,defense,degree,Democrat,democratic,describe,design,despite,detail,determine,develop,development,difference,different,difficult,dinner,direction,director,discover,discuss,discussion,disease,doctor,dream,drive,during,early,economic,economy,education,effect,effort,eight,either,election,employee,energy,enjoy,enough,enter,entire,environment,environmental,especially,establish,evening,event,every,everybody,everyone,everything,evidence,exactly,example,executive,exist,expect,experience,expert,explain,factor,family,father,federal,feeling,field,fight,figure,final,finally,financial,finger,finish,first,floor,focus,follow,force,foreign,forget,former,forward,friend,front,future,garden,general,generation,glass,government,great,green,ground,group,growth,guess,happen,happy,health,heart,heavy,herself,himself,history,hospital,hotel,house,however,human,hundred,husband,identify,image,imagine,impact,important,improve,include,including,increase,indeed,indicate,individual,industry,information,inside,instead,institution,interest,interesting,international,interview,investment,involve,issue,itself,kitchen,knowledge,language,large,later,laugh,lawyer,leader,learn,least,leave,legal,letter,level,light,likely,listen,little,local,machine,magazine,maintain,major,majority,manage,management,manager,market,marriage,material,matter,maybe,measure,media,medical,meeting,member,memory,mention,message,method,middle,might,military,million,minute,mission,model,modern,moment,money,month,morning,mother,mouth,movement,movie,music,myself,nation,national,natural,nature,nearly,necessary,network,never,newspaper,night,north,nothing,notice,number,occur,offer,office,officer,official,often,operation,opportunity,option,order,organization,other,others,outside,owner,painting,paper,parent,participant,particular,particularly,partner,party,patient,pattern,peace,people,perform,performance,perhaps,period,person,personal,phone,physical,picture,piece,place,plant,player,point,police,policy,political,politics,popular,population,position,positive,possible,power,practice,prepare,present,president,pressure,pretty,prevent,price,private,probably,problem,process,produce,product,production,professional,professor,program,project,property,protect,prove,provide,public,purpose,quality,question,quickly,quite,radio,raise,range,rather,reach,ready,reality,realize,really,reason,receive,recent,recently,recognize,record,reduce,reflect,region,relate,relationship,religious,remain,remember,remove,report,represent,Republican,require,research,resource,respond,response,responsibility,result,return,reveal,right,scene,school,science,scientist,score,season,second,section,security,senior,sense,series,serious,serve,service,seven,several,sexual,shake,share,shoot,short,should,shoulder,significant,similar,simple,simply,since,single,sister,situation,skill,small,smile,social,society,soldier,somebody,someone,something,sometimes,sound,source,south,southern,space,speak,special,specific,speech,spend,sport,spring,staff,stage,stand,standard,start,state,statement,station,still,stock,store,story,strategy,street,strong,structure,student,study,stuff,style,subject,success,successful,suddenly,suffer,suggest,summer,support,surface,system,table,teach,teacher,technology,television,thank,their,themselves,theory,there,these,thing,think,third,those,though,thought,thousand,threat,three,through,throughout,throw,today,together,tonight,total,tough,toward,trade,traditional,training,travel,treat,treatment,trial,trouble,truth,under,understand,until,usually,value,various,victim,violence,visit,voice,watch,water,weapon,weight,western,whatever,where,whether,which,while,white,whole,whose,window,within,without,woman,wonder,worker,world,worry,would,write,writer,wrong,young,yourself,albatross,bacon,alphabet,zoology,caffeine,javascript".toUpperCase().split(',')
// Hangman pictures
// CSS
var word = ''
var guesses = []
var blankWord = ''
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
var misses = 0
var gameover = false

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

function setupRandomWord() {
  getHttp('http://setgetgo.com/randomword/get.php', setup)
}

function setupCustomWord() {
  setup(document.getElementById('customWord').value.toUpperCase())
}

function getHttp(url, callback) {
  var requestObj = new XMLHttpRequest()
  requestObj.onreadystatechange = function () {
    if (requestObj.readyState == 4 && requestObj.status == 200) {
      callback(requestObj.responseText.toUpperCase())
    }
  }
  requestObj.open('GET', url, true)
  requestObj.send()
}
setup()