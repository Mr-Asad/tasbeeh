// counter

var y = getStorage("main");
var x = getStorage("mini");
console.log(x,y);
var setCounts = 33;

document.getElementById("mini").innerText = getStorage("mini");
document.getElementById("count").innerText = getStorage("main");

function increment() {
    var smallCounter = document.getElementById("mini").innerText;
    var counter = document.getElementById("count").innerText;

    if(counter > setCounts-1){
        document.getElementById("mini").innerText = ++smallCounter;
        document.getElementById("count").innerText = 0;
    } else {
        document.getElementById("count").innerText = ++counter;
    }
   
    setStorage("main",counter,360000);
    setStorage("mini",smallCounter,360000);
}

// time js
var d = new Date(); // for now
var hour  = d.getHours(); // => 9
if(hour > 0  && hour < 12){
    console.log('Good Morning');
} else if(hour > 11  && hour < 18){
    console.log('Good Evening');
} else {
    console.log('Good Night');
}

// function change_period(period){
//     var monthly = document.getElementById("monthly");
//     var semester = document.getElementById("semester");
//     var annual = document.getElementById("annual");
//     if(period === "monthly"){
//       semester.className +=  "switch semester";
//       annual.className +=  "switch annual";
//       setTimeout(function(){
//         monthly.className +=  "switch monthly active";
//       },500);
//     }else if(period === "semester"){
//       monthly.className +=  "switch monthly";
//       annual.className +=  "switch annual";
//       setTimeout(function(){
//         semester.className +=  "switch semester active";
//       },500);
//     }else{
//       monthly.className +=  "switch monthly";
//       semester.className +=  "switch semester";
//       setTimeout(function(){
//         annual.className +=  "switch annual active";
//       },500);
//     }
//   }
var monthly = document.getElementById("monthly2");
var selector = document.getElementById("selector");
selector.style.left = 0;
selector.style.width = monthly.clientWidth + "px";
selector.style.backgroundColor = "#777777";
selector.innerHTML = "33";

  function change_period2(period){
    var monthly = document.getElementById("monthly2");
    var semester = document.getElementById("semester2");
    var annual = document.getElementById("annual2");
    var selector = document.getElementById("selector");
    if(period === "monthly"){
      selector.style.left = 0;
      selector.style.width = monthly.clientWidth + "px";
      selector.style.backgroundColor = "#777777";
      selector.innerHTML = "33";
      selector.style.fontSize = "15px";
      setCounts = 33;
    }else if(period === "semester"){
      selector.style.left = monthly.clientWidth + "px";
      selector.style.width = semester.clientWidth + "px";
      selector.innerHTML = "100";
      selector.style.backgroundColor = "#418d92";
      selector.style.fontSize = "15px";
      setCounts = 50;
    }else{
      selector.style.left = monthly.clientWidth + semester.clientWidth + 1 + "px";
      selector.style.width = annual.clientWidth + "px";
      selector.innerHTML = "∞";
      selector.style.backgroundColor = "#4d7ea9";
      selector.style.fontSize = "35px";
      setCounts = 100000;
    }
  }



function clickfunction() {
    $(".reset").toggleClass("rotate");
    document.getElementById("count").innerText = 0;
    document.getElementById("mini").innerText = 0;
    setStorage("main",0,360000);
    setStorage("mini",0,360000);
}

/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */




function removeStorage(name) {
  try {
      localStorage.removeItem(name);
      localStorage.removeItem(name + '_expiresIn');
  } catch(e) {
      console.log('removeStorage: Error removing key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
      return false;
  }
  return true;
}
/*  getStorage: retrieves a key from localStorage previously set with setStorage().
  params:
      key <string> : localStorage key
  returns:
      <string> : value of localStorage key
      null : in case of expired key or failure
*/
function getStorage(key) {

  var now = Date.now();  //epoch time, lets deal only with integer
  // set expiration for storage
  var expiresIn = localStorage.getItem(key+'_expiresIn');
  if (expiresIn===undefined || expiresIn===null) { expiresIn = 0; }

  if (expiresIn < now) {// Expired
      removeStorage(key);
      return null;
  } else {
      try {
          var value = localStorage.getItem(key);
          return value;
      } catch(e) {
          console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
          return null;
      }
  }
}
/*  setStorage: writes a key into localStorage setting a expire time
  params:
      key <string>     : localStorage key
      value <string>   : localStorage value
      expires <number> : number of seconds from now to expire the key
  returns:
      <boolean> : telling if operation succeeded
*/
function setStorage(key, value, expires) {

  if (expires===undefined || expires===null) {
      expires = (24*60*60);  // default: seconds for 1 day
  } else {
      expires = Math.abs(expires); //make sure it's positive
  }

  var now = Date.now();  //millisecs since epoch time, lets deal only with integer
  var schedule = now + expires*1000; 
  try {
      localStorage.setItem(key, value);
      localStorage.setItem(key + '_expiresIn', schedule);
  } catch(e) {
      console.log('setStorage: Error setting key ['+ key + '] in localStorage: ' + JSON.stringify(e) );
      return false;
  }
  return true;
}