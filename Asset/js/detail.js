const loadingElement = document.querySelector(`#loading`);
const content = document.querySelector(`#content`);
const contentScreenshots = document.querySelector(`#content-screenshots`);
const contentMovies = document.querySelector(`#content-movies`);
const contentSeries = document.querySelector(`#content-series`);
const contentDlc = document.querySelector(`#content-dlc`);

const keysValues = window.location.search;
const urlDetailsParams = new URLSearchParams(keysValues);
const id = urlDetailsParams.get("id");


const btnLoadMore = document.querySelector(`#btn-load_more`);
const btnMoreScreenshots = document.querySelector('#btn-more_screenshots');

let isFavorite= false;

//// FORMAT ARRAYS RESULTS ////
const getStrGenres = (genres) => { return genres.map(each => each.name).join(', '); };

const getStrPlatforms = (platforms) => { return platforms.map(each => each.platform.name).join(', '); };

const getStrTags = (tags) => { return tags.map(each => '<small>"' + each.name + '" id: ' + each.id +'</small>' +  ' &nbsp;').join(' '); };

const getStrDevelopers = (developers) => { return developers.map(each => each.name).join(`[-_-]__/`); };

const getScreenshotsStr = (screenshots) => { return screenshots.map(each => `
  <div class="d-screens-movies_item">
    <img src="${each.image}"  alt="screenshot"></div>`).join(' '); };

const getMoviesStr = (movies) => {
  return movies.map(each =>  `
  <div class="d-screens-movies_item">
    <p>${each.name}</p>
    <video controls width="100%" src="${each.data.max}" poster="${each.preview}">
        Your browser does not support the video tag.
    </video>
  <div>
  ` ).join(' '); };
  
const showArray = (params, name, maxLength = 1000) => {
      let strParams= ``;
      switch(name){
        case `genres` :  strParams = getStrGenres(params); break;
        case `platforms` :  strParams = getStrPlatforms(params); break;
        case `tags` : strParams = getStrTags(params); break;
        case `developers` : strParams = getStrDevelopers(params); break;
        case `screenshots` :  strParams = getScreenshotsStr(params); break;
        case `movies` :  strParams = getMoviesStr(params); break;
      }
      if(strParams.length > maxLength) return strParams.substring(0, maxLength) + `...`;
      if(strParams.length > 0) return strParams
    return;
};



function checkFavorite(spnUserId, dataDetailId){
  
  const formData = new FormData();
  let action= `checkIfFav`;
  formData.append(`action`, action);
  formData.append(`user_id`, spnUserId);
  formData.append(`game_id`, dataDetailId);


  const checkIfFav = async(formData) => {
    try {
      const res = await fetch('../Controller/users_controller.php', {
        method: 'POST',
        body: formData,
      });

      if ( ! res.ok) throw new Error('Network response was not ok');

      const data = await res.json();  
        
      
      isFavorite= data.response;

      console.log('is fav = ' + isFavorite);
      console.log(isFavorite, typeof isFavorite);

      let action;
      
      document.querySelector('h2').innerHTML+= `<button id="toggle_fav"></button>`;
      const btnFav= document.querySelector(`#toggle_fav`);

     if(isFavorite){
        action= `removeFav`;
        btnFav.textContent= `Remove from favorite`;
      }else{
       action= `addFav`;
       btnFav.textContent= `Add to favorite`;
      } 

    //// BUTTON TO ADD IN FAVORIES
      ToggleFav(btnFav, action, spnUserId, dataDetailId);
      
      return;
    }catch (error) {
      console.error('Error:', error);
    }   
  }
  checkIfFav(formData);
}

function ToggleFav(btnFav, action, spnUserId, dataDetailId){
  btnFav.addEventListener(`click`, e=> {
        const formData = new FormData();
        formData.append(`action`, action);
        formData.append(`user_id`, spnUserId);
        formData.append(`game_id`, dataDetailId);
        console.log(e.target.id);


        console.log(spnUserId, dataDetailId);
        console.log(action);

        toggleFav(formData);
      })
      
      const toggleFav = async(formData) => {
        try {
          const res = await fetch('../Controller/users_controller.php', {
            method: 'POST',
            body: formData,
          });

          if ( ! res.ok) throw new Error('Network response was not ok');
        
          const data = await res.json(); 

          if(data.response !== true){
            errorMessage.textContent = data.response;
            console.log(data.response);
            return;
          }    
       
          if(action=== `addFav`){
            action= `removeFav`;
            btnFav.textContent= `Remove from favorite`;
          }else{
            action= `addFav`
            btnFav.textContent= `Add to favorite`;
          } 

        }catch (error) {
          console.error('Error:', error);
        }   
      }
}

//// FETCH GAME BY ID ////
const loadGame = async () => {
  try{
    urlDetail = `https://api.rawg.io/api/games/${id}?key=${apikey}`; 
    
    const resDetail = await fetch(urlDetail);
    const dataDetail = await resDetail.json();
    console.log(dataDetail);
    
    //// SHOW THE ADD TO FAVORITE BUTTON IF LOGGED IN
    if (settingsButton){
      document.querySelector('h2').innerHTML = `${dataDetail.name} &emsp;`;
      const spnUserId= document.querySelector(`#spn-user_id`).textContent;
      
      checkFavorite(spnUserId, dataDetail.id);
      
      
      
      // if ( ! isFavorite) {
        //   document.querySelector('h2').innerHTML =
//     `${dataDetail.name} &emsp; <button id="fav_${dataDetail.id}">!♡ remove ${dataDetail.id}</button>`;
// } else {
  //   document.querySelector('h2').innerHTML =
  //     `${dataDetail.name} &emsp; <button id="fav_${dataDetail.id}">♡ add ${dataDetail.id}</button>`;
  // }  
/////////////////////////////////////////////////////////////////
    }//else document.querySelector('h2').innerHTML = `${dataDetail.name} &emsp;`;



    
    
  let tags = 'Tags unavailable';
  let backgroundImage = `<img src="../Asset/Images/alt.png" alt="${dataDetail.name} image">`;
  let description = 'Description unavailable'; 
  let genres = 'Genres unavailable';
  let esrb = 'ESRB unavailable';
  let backgroundImageAdditional = `<img src="../Asset/Images/alt.png" alt="${dataDetail.name} image">`;
  let platforms = 'Platforms unavailable';
  let releaseDate = 'Release date unavailable';
  let metacriticUrl = '';
  let developers = 'Developers unavailable';
    
  if(dataDetail.background_image !== null && dataDetail.background_image !== undefined && dataDetail.background_image.length > 0)
    backgroundImage = `<img src="${dataDetail.background_image}" alt="${dataDetail.name} image">`;
      
  if(dataDetail.description !== null && dataDetail.description !== undefined && description.length > 0)
      description = dataDetail.description;
    
  if(dataDetail.genres !== null && dataDetail.genres !== undefined && dataDetail.genres.length > 0)
      genres = showArray(dataDetail.genres, 'genres');

  if(dataDetail.esrb !== null && dataDetail.esrb !== undefined && dataDetail.esrb.length > 0)
      esrb = dataDetail.esrb;
    
  if(dataDetail.background_image_additional !== null && dataDetail.background_image_additional !== undefined && dataDetail.background_image_additional.length > 0)
       backgroundImageAdditional = `<img src="${dataDetail.background_image_additional}" alt="${dataDetail.name} image">`;  
       
  if(dataDetail.platforms !== null && dataDetail.platforms !== undefined && dataDetail.platforms.length > 0)
      platforms = showArray(dataDetail.platforms, `platforms`);
      
  if(dataDetail.released !== null && dataDetail.released !== undefined && dataDetail.released.length > 0)
      releaseDate = `Release date: ${dataDetail.released}`;  
    
  if(dataDetail.metacritic_url !== null && dataDetail.metacritic_url !== undefined && dataDetail.metacritic_url.length > 0)
      metacriticUrl = `<a href="${dataDetail.metacritic_url}" target="blank">Link metacritic</a>`; 
    
  if(dataDetail.tags !== null && dataDetail.tags !== undefined && dataDetail.tags.length > 0)
    tags = showArray(dataDetail.tags, 'tags');
  if(dataDetail.developers !== null && dataDetail.developers !== undefined && dataDetail.developers.length > 0)
  developers = showArray(dataDetail.developers, 'developers');
  
   //// CREATE THE ELEMENT TO DISPLAY ////
  const item =
  `
    <div>
      ${backgroundImage}
    </div>
    <div id="description">
      <p>${description}</p>
    </div>
    
    <div id="item-game_info_1">
      <small>Genre : ${genres}</small>
      <small>Developeurs : ${developers}</small>
      <small>${esrb}</small> 
    </div>   
    
    
    <div>
      ${backgroundImageAdditional}
    </div>
    <div id="item-game_info_2">
      <div>${platforms}</div>
      <div>${releaseDate}</div>
    </div>
    
      <div id="item-tags">
        <p>Tags :</p>
        ${tags}
      </div>
    <div class="a-btn">${metacriticUrl}</div>
  `;
  content.insertAdjacentHTML(`beforeend`, item);
  eventToImgs();

































  loadingElement.classList.add(`ninja`);
   
  }catch(err){
    alert(`ERROR : ${err}`);
  }
}





let pageSreens = 1;

btnLoadMore.addEventListener(`click`,()=>{
  loadingElement.classList.remove(`ninja`); 
  btnLoadMore.parentNode.classList.add(`ghost`);
  
  contentScreenshots.classList.add('content-primary');
  contentMovies.classList.add('content-primary'); 
 
  loadScreensMovies('screenshots', pageSreens);
  pageSreens ++;
  loadScreensMovies('movies', 1);
  
  btnLoadSeriesDlc.parentNode.classList.remove(`ninja`);
});



btnMoreScreenshots.addEventListener('click', () =>{
  loadScreensMovies('screenshots', pageSreens);
  pageSreens ++;
});

//// FETCH SCREENS AND MOVIES OF THE GAME IF ANY ////
const loadScreensMovies = async (arg, page) => {
  try{
    url = `https://api.rawg.io/api/games/${id}/${arg}?key=${apikey}&page=${page}`; 
    
    const res = await fetch(url);
    const data = await res.json();
    let nextGameListURL = data.next ? data.next : null;
    let extras = `No ${arg}` ;
    
    if(data.results !== null && data.results !== undefined && data.results.length > 0)
         extras = showArray(data.results ,arg);  
    const itemExtra = 
      `
      <div class="d-screens-movies">
        <h3>${arg.charAt(0).toUpperCase()
  + arg.slice(1)}</h3>
          ${extras}
      </div>
      `;
      
      if(arg === 'screenshots'){
        
        contentScreenshots.insertAdjacentHTML(`beforeend`, itemExtra); 
        
        btnMoreScreenshots.parentNode.classList.toggle('ghost', ! nextGameListURL);
      }
    
      else contentMovies.insertAdjacentHTML(`beforeend`, itemExtra);
    
    eventToImgs();
    
    }catch(err){
      alert(`ERROR : ${err}`);
  }
  loadingElement.classList.add(`ninja`);
}


//// ENABLE FULLSCREEN FOR IMAGES ////
function eventToImgs(){
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', e => {
      if (img.requestFullscreen) {
        img.requestFullscreen().catch(err => {
          console.error('Error entering fullscreen mode:', err);
        });
      }  
    });
  });
}



//// FETCH THE API KEY TO FETCH THE GAME ////
fetchKey(loadGame);

const btnLoadSeriesDlc = document.querySelector('#btn-load_series-dlc');
let pageSerie = 1;
let pageDlc = 1;

btnLoadSeriesDlc.addEventListener('click', () => {
  loadingElement.classList.remove(`ninja`);
  
  contentSeries.classList.add('content-secondary');
  contentDlc.classList.add('content-secondary');
  
  loadSeriesDlc('game-series', pageSerie);
  loadSeriesDlc('additions', pageDlc);
  pageSerie ++;
  pageDlc ++;
});

let btnMoreSeries = document.querySelector('#btn-more_series');
let btnMoreDlc = document.querySelector('#btn-more_dlc');

btnMoreSeries.addEventListener('click',() => {
  loadSeriesDlc('game-series', pageSerie);
  pageSerie ++;
});

btnMoreDlc.addEventListener('click',() => {
  loadSeriesDlc('additions', pageDlc);
  pageDlc ++;
});

//// FETCH MORE ABOUT THE GAME SERIES OR ADDITIONS IF ANY ////
const loadSeriesDlc = async (arg, page) => {
  try{
    url = `https://api.rawg.io/api/games/${id}/${arg}?key=${apikey}&page=${page}`; 
    
    const res = await fetch(url);
    const data = await res.json();
    
    let nextGameListURL = data.next ? data.next : null;
    const games = data.results;
    console.log(games);

  
    let itemSerieDlc = `No ${arg} found`;
    
    if(games !== null && games !== undefined && games.length > 0){
      
      games.forEach(game => {
        itemSerieDlc =    
        `
        <div class="d-serie-dlc_item" id="d-serie-dlc_${game.id}-${game.slug}">
          <p>${game.name}<p>
        </div>
        `;
        
        if(arg === 'game-series') contentSeries.insertAdjacentHTML(`beforeend`, itemSerieDlc);
        else contentDlc.insertAdjacentHTML(`beforeend`, itemSerieDlc);
        let item = document.querySelector(`#d-serie-dlc_${game.id}-${game.slug}`);
        
        item.style.backgroundImage = `url("${game.background_image}")`;
        
        item.addEventListener(`click`,()=>{
          location.href = `detail.php?id=${game.id}`; 
        });
      });
        
    }else{
      if(arg === 'game-series')
      contentSeries.insertAdjacentHTML(`beforeend`, itemSerieDlc);
      else contentDlc.insertAdjacentHTML(`beforeend`, itemSerieDlc);
    } 
    
    
    btnLoadSeriesDlc.parentNode.classList.add('ninja');
    
    if(arg === 'game-series')
      btnMoreSeries.parentNode.classList.toggle('ghost', ! nextGameListURL);
    else btnMoreDlc.parentNode.classList.toggle('ghost', ! nextGameListURL);
    
    
    }catch(err){
      alert(`ERROR : ${err}`);
  }
  loadingElement.classList.add(`ninja`);
}


