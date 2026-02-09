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
  const settingsButton = document.querySelector(`#edit_user`);
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
 

//console.log(`main.js`);