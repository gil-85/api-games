const loadingElement = document.querySelector(`#loading`);
const content = document.querySelector(`#content`);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const btnLoadMore = document.querySelector(`#btn-load_more`); 

let title = '';
let aParam = [];
let page = 1;

//// GET THE TITLE FROM THE URL AND THE OTHER PARAMETERS FOR FILTER THE RESEARCH ////
urlParams.forEach((value, key) => {
  if(key !== 'title') aParam.push(`${key}=${value}`);
  else title = value;
});
let params = aParam.join('&');

//// FORMAT ARRAYS RESULTS ////
const getStrTags = (tags) => { return tags.map(each => each.id); };

const getStrGenres = (params) => { return params.map(each => each.name).join(', '); };

const getStrParentPlatforms = (params) => { return params.map(each => each.platform.name).join(', '); };

const showArray = (params, name, maxLength = 60) => {
    let strParams= ``;
    switch(name){
      case  `tags` : strParams = getStrTags(params); break;
      case `genres` :  strParams = getStrGenres(params); break;
      case `parent_platforms` :  strParams = getStrParentPlatforms(params); break;
    }
    
    if(strParams.length > maxLength) return strParams.substring(0, maxLength) + `...`;
    if(strParams.length > 0) return strParams
  return;
};

//// FETCH GAMES LIST ID ////
const loadGames = async () => {
  try{
    url = `https://api.rawg.io/api/games?key=${apikey}&ordering=-released&page_size=30&page=${page}&${params}`; 
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    let nextGameListURL = data.next ? data.next : null;
    const games = data.results;
   //console.log(games);
    document.querySelector('h2').innerHTML = `${title} : <small>${data.count}</small>`;
    
    games.forEach(game => {
      
      let name = game.name.length < 50 ?  game.name : game.name.substring(0, 50) + `...`;
      let tags = [];
      let genres = 'Genres unavailable';
      let backgroundImage = `<img src="../Asset/images/alt.png" alt="${game.name} image" class="link-img" id="${game.id}">`;
      let esrb = 'ESRB unavailable';
      let parentPlatforms = 'Parent platforms unavailable';
      let releaseDate = 'Release date unavailable';

      if(game.tags !== null && game.tags !== undefined && game.tags.length > 0)
        tags = showArray(game.tags, 'tags');
    
      if(game.genres !== null && game.genres !== undefined && game.genres.length > 0)
        genres = showArray(game.genres, 'genres');
  
      if(game.background_image !== null && game.background_image !== undefined && game.background_image.length > 0)
         backgroundImage = `<img src="${game.background_image}" alt="${game.name} image" class="link-img" id="${game.id}">`;
  
      if(game.esrb !== null && game.esrb !== undefined && game.esrb.length > 0)
        esrb = game.esrb;
        
      if(game.parent_platforms !== null && game.parent_platforms !== undefined && game.parent_platforms.length > 0)
        parentPlatforms = showArray(game.parent_platforms, `parent_platforms`, 40);
        
      if(game.released !== null && game.released !== undefined && game.released.length > 0)
        releaseDate = `Release date: ${game.released}`;  
        
      let item = '';
      //// FILTER NON SUITABLE RESULTS  ////

     //if(tags.length=== 0) alert(tags.length);
     //console.log(game.tags);
      if ( ! tags.some(tag => tag === 50 || tag === 312 || tag === 786)) 
      
      //// CREATE THE ELEMENT TO DISPLAY ////
        item =
        `
        <div class="item"> 
      
          <div class="item-game_info_1">

            <h3>${name}</h3>

            <div> 
              <small>${genres}</small>
              <br>
              <small>${esrb}</small>
            </div>
           
          </div>
          
        
          <div class="item-bkg_img">
          ${backgroundImage}
          </div>

          <div class="item-game_info_2">
            <span> ${parentPlatforms}</span>
            <br>
            <span>${releaseDate}</span>
            <br>
          </div>
        </div>
        `;
      content.insertAdjacentHTML(`beforeend`, item);
    }); 
    
    btnLoadMore.parentNode.classList.toggle('ninja', ! nextGameListURL);

    //// LINK THE IMAGES TO THE DETAILS PAGE ////
    const linkImg = document.querySelectorAll('.link-img');
    linkImg.forEach(img => {
      img.addEventListener('click', (e) => {
        location.href = `detail.php?id=${e.target.id}`;
      });
    });
    
  }catch(err){
    alert(`ERROR : ${err}`);
  }
  loadingElement.classList.add(`ninja`);
}

//// LOAD MORE RESULTS ////
btnLoadMore.addEventListener(`click`,()=>{
  loadingElement.classList.remove(`ninja`);
  page++;
  loadGames();
});

//// FETCH THE API KEY TO FETCH THE GAMES LIST////
fetchKey(loadGames);