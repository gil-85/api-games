const btnMode = document.querySelector('#btn-mode');
const btnDisconnect = document.querySelector(`#btn-disconnect`);
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


if (btnDisconnect) {
    btnDisconnect.addEventListener('click', async () => {
      if(confirm('Log out ?')) logout(); 
  });
}

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
 