//// OPTIONS FOR THE AVATAR ////
const strSides = `() [] {}`;
const aSides = strSides.split(' ');

const strRightEyes = `- o T > • ◣ ◢ ° ^ ˇ ♡ ๏ ◔ ☺ ▬ ♫ Ò * ◘ ☼ ⌂`;
const aRightEyes = strRightEyes.split(' ');

const strLeftEyes = `- o T < • ◢ ◣ ° ^ ˇ ♡ ๏ ◔ ☺ ▬ ♫ Ò * ◘ ☼ ⌂`;
const aLeftEyes = strLeftEyes.split(' ');

const strMouth = `_ __ . .. ‿ ⎵ ᴥ ︿ ▂ ⌓ ෴ ∟`; 
const aMouth = strMouth.split(' ');

const elementAvatar = document.querySelector(`#d-element_avatar`);
const avatarSet = document.querySelector('#avatar>span');
const side = document.querySelector(`#side`);
const eyes = document.querySelector(`#eyes`);
const mouth = document.querySelector(`#mouth`);
let newChar_1 = ``;
let newChar_2 = ``;
  
const bkg = document.querySelector(`#bkg`);
let bkg_clr = 0;
let saturation = '100%';



////  DISPLAY THE AVATAR CREATION FIELDS ////
document.querySelector(`#avatar`).addEventListener(`click`, e=>{
  let id = e.target.id;
  if(e.target.classList.contains(`avatarSet`)) id = e.target.parentNode.id; //// IF THE CLICK IS ON THE GREEN CHARACTERES ////
    
  document.querySelector(`#e_${id}_e`).classList.remove('ghost');
  document.querySelector(`#e_${id}_e`).classList.add('show_list');
});
  
//// HIDE THE AVATAR CREATION FIELDS ////
document.querySelector(`#e_avatar`).addEventListener(`click`, e=>{
  document.querySelector(`#${e.target.id}_e`).classList.remove('show_list');
  document.querySelector(`#${e.target.id}_e`).classList.add('ghost');
});

  //// CHANGE ELEMEMTS OF THE AVATAR ELEMENT AND BETWEEN THE BUTTONS OF SELECTION  ////
document.querySelectorAll(`.d-input_avatar>button`).forEach(btn =>{
  btn.addEventListener(`click`, e=>{

    switch(e.target.id){

      case `prev_side`: 
        
        for(let i = 0; i < aSides.length; i++){
          if(side.textContent.charAt(0) === aSides[i][0])
            if(i > 0){
              newChar_1 = aSides[i - 1][0];
              newChar_2 = aSides[i - 1][1];
            }else{
              newChar_1 = aSides[aSides.length - 1][0];
              newChar_2 = aSides[aSides.length - 1][1];
            }  
        }
        
        elementAvatar.childNodes[1].textContent =  newChar_1;
        elementAvatar.childNodes[13].textContent =  newChar_2;
        side.textContent =  `${newChar_1} ${newChar_2}`;
      break;

      case `next_side`:
        
        for(let i = 0; i < aSides.length; i++){
          if(side.textContent.charAt(0) === aSides[i][0])
            if(i < aSides.length -1){
              newChar_1 = aSides[i + 1][0];
              newChar_2 = aSides[i + 1][1];
            }else{
              newChar_1 = aSides[0][0];
              newChar_2 = aSides[0][1];
            }  
        }
        
        elementAvatar.childNodes[1].textContent =  newChar_1;
        elementAvatar.childNodes[13].textContent =  newChar_2;
        side.textContent =  `${newChar_1} ${newChar_2}`;
      break;
        
      case `prev_eyes`: 

        for(let i = 0; i < aRightEyes.length; i++){
          if(eyes.textContent.charAt(0) === aRightEyes[i][0])
            if(i > 0){
              newChar_1 = aRightEyes[i - 1];
              newChar_2 = aLeftEyes[i - 1];
            }else{
              newChar_1 = aRightEyes[aRightEyes.length - 1];
              newChar_2 = aLeftEyes[aLeftEyes.length - 1];
            }  
        }

        elementAvatar.childNodes[5].textContent =  newChar_1;
        elementAvatar.childNodes[9].textContent =  newChar_2;
        eyes.textContent = `${newChar_1} ${newChar_2}`;
      break; 

      case `next_eyes`: 
        
        for(let i = 0; i < aRightEyes.length; i++){
          if(eyes.textContent.charAt(0) === aRightEyes[i][0])
            if(i < aRightEyes.length - 1){
              newChar_1 = aRightEyes[i + 1];
              newChar_2 = aLeftEyes[i + 1];
            }else{
              newChar_1 = aRightEyes[0];
              newChar_2 = aLeftEyes[0];
            }  
        }

        elementAvatar.childNodes[5].textContent =  newChar_1;
        elementAvatar.childNodes[9].textContent =  newChar_2;
        eyes.textContent = `${newChar_1} ${newChar_2}`;
      break; 

      case `prev_mouth`: 

        for(let i = 0; i < aMouth.length; i++){
          if(mouth.textContent === aMouth[i])
            if(i > 0) newChar_1 = aMouth[i - 1];
            else newChar_1 = aMouth[aMouth.length - 1]; 
        }

        elementAvatar.childNodes[7].textContent = newChar_1;
        mouth.textContent = `${newChar_1}`;
      break; 

      case `next_mouth`: 

        for(let i = 0; i < aMouth.length; i++){
          if(mouth.textContent === aMouth[i])
            if(i < aMouth.length - 1) newChar_1 = aMouth[i + 1];
            else newChar_1 = aMouth[0]; 
        }

        elementAvatar.childNodes[7].textContent = newChar_1;
        mouth.textContent = `${newChar_1}`;
      break; 

      case `prev_bkg`: 

        changeBkg(-15);
      break;
      
      case `next_bkg`: 
        
        changeBkg(15);
      break;

      case `bkg`:

      if(bkg.textContent === `0`){
        changeBkg(`0%`);
        bkg.textContent = `1`;
      }else{
        changeBkg(`100%`);
        bkg.textContent = `0`;
      }
      break;
    }
    ////  UPDATE THE AVATAR BUTTON SPAN GREEN TEXT, THE VALUE WILL BE USED FOR THE DATABASE QUERY ////

    avatarSet.textContent = elementAvatar.childNodes[1].textContent + 
    ' ' + 
    elementAvatar.childNodes[5].textContent + 
    elementAvatar.childNodes[7].textContent +
    elementAvatar.childNodes[9].textContent +
     ' ' + 
     elementAvatar.childNodes[13].textContent
    ;
  })
});

////  CHANGE THE AVATAR BACKGRGOUND ////
function changeBkg(n){
  //// KEEPS VALUE BETWEEN 0 AND 360 ////
  if(typeof n === `string`) saturation = n;
  else{
    if(n < 0 && bkg_clr === 0) bkg_clr = 360;
    if(n > 0 && bkg_clr === 360) bkg_clr = 0;
    bkg_clr += n;
  }


  //bkg.textContent = bkg_clr;

  elementAvatar.style.backgroundImage = `linear-gradient(-225deg, hsl(${bkg_clr - 30}, ${saturation}, 95%), hsl(${bkg_clr}, ${saturation}, 50%), hsl(${bkg_clr + 30}, ${saturation}, 5%))`;
  bkg.style.backgroundImage = `linear-gradient(-225deg, hsl(${bkg_clr - 30}, ${saturation}, 95%), hsl(${bkg_clr}, ${saturation}, 50%), hsl(${bkg_clr + 30}, ${saturation}, 5%))`;
}

//// REPLACE THE DEFAULT VALUES WITH USER AVATAR'S VALUES  IN CASE OF ////
function setAvatar(){
  
  console.log(headerAvatar);
   
  let symbols = headerAvatar.textContent;
  symbols = symbols.replaceAll(' ', '');
  let arrSymbols = [];
  let symbolsBkg = 0;
  let symbolsSaturation = ``;
  
  let numberFlag = false;
  let dashFlag = false;
  symbols.split('').forEach((char, index) => {
    
  if (/\d/.test(char)) numberFlag = true; 
  if(numberFlag && char === `-`) dashFlag = true;

  if( ! numberFlag){
    arrSymbols[index] = char;
    console.log(arrSymbols[index] + arrSymbols.length);
  
  }else if( ! dashFlag){
    symbolsBkg += char;
    console.log(parseInt(symbolsBkg));
  }else{
    console.log(`last : ${char}`);
    symbolsSaturation = char;
  }

 
 
  });
  
  console.log('Length: ' + arrSymbols.length);



  if(arrSymbols.length === 5){

    //// SET THE SIDES ////
    elementAvatar.childNodes[1].textContent =  arrSymbols[0];
    elementAvatar.childNodes[13].textContent = arrSymbols[4];
    side.textContent = `${arrSymbols[0]} ${arrSymbols[4]}`;

    //// SET THE EYES ////
    elementAvatar.childNodes[5].textContent =  arrSymbols[1];
    elementAvatar.childNodes[9].textContent = arrSymbols[3];
    eyes.textContent = `${arrSymbols[1]} ${arrSymbols[3]}`;

    //// SET THE MOUTH ////
    elementAvatar.childNodes[7].textContent =  arrSymbols[2];
    mouth.textContent = `${arrSymbols[2]}`; 
  }

  
  if(arrSymbols.length === 6){

    //// SET THE SIDES ////
    elementAvatar.childNodes[1].textContent =  arrSymbols[0];
    elementAvatar.childNodes[13].textContent = arrSymbols[5];
    side.textContent = `${arrSymbols[0]} ${arrSymbols[5]}`;

    //// SET THE EYES ////
    elementAvatar.childNodes[5].textContent =  arrSymbols[1];
    elementAvatar.childNodes[9].textContent = arrSymbols[4];
    eyes.textContent = `${arrSymbols[1]} ${arrSymbols[4]}`;

     //// SET THE MOUTH ////
    elementAvatar.childNodes[7].textContent =  arrSymbols[3] + arrSymbols[3];
    mouth.textContent = `${arrSymbols[3]}${arrSymbols[3]}`; 
  }
   

  changeBkg(parseInt(symbolsBkg));

  if(symbolsSaturation === `0`){
    changeBkg(`0%`);
    bkg.textContent = `1`;
  }else{
    changeBkg(`100%`);
    bkg.textContent = `0`;
  }
}
  
  const headerAvatar = document.querySelector(`#header_avatar`);
  if (headerAvatar) setAvatar();

/////////////////////////////// COMMUMN IN CONECTION /////////////////////////////////////

const errorMessage = document.querySelector(`#p-error_message`);
const lognameInput = document.querySelector(`input[type=text]`);
let logname = ``;
const formData = new FormData();


//// CHECK IF THE LOGNAME IS VALID ////
const isValidLogName = (logname) => {
  const lognamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  return lognamePattern.test(logname);
};