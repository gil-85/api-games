const btnMode = document.querySelector('#btn-mode');
const linkFavories = document.querySelector('#link_favories')

//// THEMES CONTROL ////
if (document.body.classList.contains('light-theme')) btnMode.textContent = 'DARK THEME';
    
btnMode.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')){
    localStorage.setItem('theme', 'Light theme');
    btnMode.textContent = 'DARK THEME';
  }else{
    localStorage.setItem('theme', 'Dark theme');
    btnMode.textContent = 'LIGHT THEME';
  }
});

//// DISCONNECTION ////


// if (btnDisconnect) {
//     btnDisconnect.addEventListener('click', async () => {
//       if(confirm('Log out ?')) logout(); 
//   });
// }

////
const logout = async () => {
  try {
    const response = await fetch('Controller/log_out.php');
        window.location.reload();
  } catch (error) {
      console.error('Error during logout:', error);
  }
};

////


//// PREPARE THE DATES INFOS AND LINKS FOR PRESET RESEARCHES  ////
const currentDate = new Date();
const year = currentDate.getFullYear();   
const month = currentDate.getMonth() +1;     
const day = currentDate.getDate();        

const today = `${year}-${month < 10 ? `0`+ month : month}-${day < 10 ? `0` + day : day}`;
const lastYear = `${year - 1}-${month < 10 ? `0`+ month : month}-${day < 10 ? `0` + day : day}`;
const future = `${year+ 4}-${month < 10 ? `0`+ month : month}-${day < 10 ? `0` + day : day}`;

const presetLinks =  
  `
    <a href="View/list.php?title=Last%20releases&dates=${lastYear},${today}">LAST RELEASES</a>
    <a href="View/list.php?title=Future%20releases&dates=${today},${future}">FUTURE RELEASES</a>
  `;

  
 
document.querySelector('nav').insertAdjacentHTML(`afterbegin`, presetLinks);

  //  echo '
  //       <a href="View/list.php" id="link_favories">FAVORIES</a> 
  //       <button id="btn-disconnect">LOG OUT</button>
//// GET THE FAVORITE GAMES ID IF ANY AND IF USER IS LOGGED IN
  
if (settingsButton){
  const spnUserId= document.querySelector(`#spn-user_id`).textContent;
  searchFavorite(spnUserId);
}
// const arrFav= new Array();
function searchFavorite(userId){
  
  const formData = new FormData();
  let action= `searchFav`;
  formData.append(`action`, action);
  formData.append(`user_id`, userId);

  const searchIfFav = async(formData) => {
    try {
      const res = await fetch('Controller/users_controller.php', {
        method: 'POST',
        body: formData,
      });

      if ( ! res.ok) throw new Error('Network response was not ok');

      const data = await res.json();  
        
      const param= data.response;
      console.log(`param.length : ${param.length}`);
      
     // const presetLinks_1=`<a href="View/list.php?title=Favories&ids=${param}">FAVORITES</a>`;
      let presetLinks_1= param.length=== 0 
      ? `<a href="#" id="disabled">FAVORITES</a>`
       :`<a href="View/list.php?title=Favorites&ids=${param}">FAVORITES</a>`;

      presetLinks_1+=`<button id="btn-disconnect">LOG OUT</button>`;
                         
      document.querySelector('nav').insertAdjacentHTML(`beforeend`, presetLinks_1);

      const btnDisconnect = document.querySelector(`#btn-disconnect`);

      btnDisconnect.addEventListener('click', async () => {
        if(confirm('Log out ?')) logout(); 
      });


      return;
    }catch (error) {
      console.error('Error:', error);
    }   
  }
  searchIfFav(formData);
}

