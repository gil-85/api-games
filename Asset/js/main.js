const currentURL = window.location.href;
const header = document.querySelector('header');


//// █ GET THE API KEY █ ////
let apikey =``;
const fetchKey = async (func) => {
  try{
    const res = await fetch('../prod.env.php');
    if ( ! res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    apikey = data.apikey;
    func();
    } catch (error){
    console.error('Error:', error);
  }
}

//// LINK TO THE HOME PAGE ON THE HEADER TITLE IF NOT ALREADY ON THE HOME PAGE //// 
if(document.querySelector(`h2`).textContent !== `Home`)
  document.querySelector(`#h1_link`).innerHTML =
  
  `
  <a href="../index.php">
    <h1>Project Games api</h1>
  </a> 
  `;



  //// BUTTON EDIT USER IF CONNECTED AND NOT ON THE EDIT PAGE////
  const settingsButton = document.querySelector(`#btn-edit_user`);
  if (settingsButton) {
    if( ! currentURL.includes(`update`)){
      
      if( ! currentURL.includes(`index`))
        settingsButton.addEventListener(`click`, () => {
          window.location = 'update_profil.php';
        });

      else 
        settingsButton.addEventListener(`click`, () => {
          window.location = 'View/update_profil.php';
        });
    
    }else settingsButton.style.display = `none`;
  }

//// KEEP THE THEME CHOOSED ON EVERY PAGE USING THE LOCALSTORAGE ////
const theme = localStorage.getItem('theme');
if (theme !== null) 
  if (theme === 'Light theme')
    document.body.classList.add('light-theme');
 


//// DISPLAY THE AVATAR AND ITS BACKGROUND IF CONNECTED
  if (settingsButton) {
    //const strRawHeaderAvatar= document.querySelector(`#spn-raw_header_avatar`).textContent;
    
    const strHeaderAvatar = document.querySelector("#spn-header_avatar");

    

    console.log(strHeaderAvatar.textContent.length); 

    //// TAKE THE HUE VALUE FROM THE AVATAR GET FROM THE DATABASE

    // for(let i= 0; i< strHeaderAvatar.textContent.length; i++){
    //   console.log(i + ' : ' + strHeaderAvatar.textContent.charAt(i));
    // }


    let strColor= strHeaderAvatar.textContent.charAt(7); 
    
    if (strHeaderAvatar.textContent.charAt(8) !== '-'){
      strColor+= strHeaderAvatar.textContent.charAt(8);
      if (strHeaderAvatar.textContent.charAt(9) !== '-') strColor+= strHeaderAvatar.textContent.charAt(9);
    } 
    console.log(strColor); 

  
  const bck_str = strHeaderAvatar.textContent.at(-1)=== '0' ? 0 : 100;
 // console.log(bck_str);

  strHeaderAvatar.style.backgroundImage = `
    linear-gradient(
      -225deg,
      hsl(${strColor - 30}, ${bck_str}%, 95%),
      hsl(${strColor}, ${bck_str}%, 50%),
      hsl(${strColor + 30}, ${bck_str}%, 5%)
    )
  `;

    //strHeaderAvatar.style.backgroundColor = `hsl(30, 100%, 50%)`;
    //strHeaderAvatar.style.border= `.1em solid #f00`;

    
  }



//console.log(`main.js`);