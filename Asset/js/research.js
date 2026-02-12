const form = document.querySelector('form');
const searchOptions = document.querySelectorAll('.switch');
const searchOptionsExtra = document.querySelectorAll('.extra');

const btnSearchSwitch = document.querySelector('#btn-search_switch');

const btnMoreFilters = document.querySelector('#btn-more_filters')

//////      NAME     ////////
const name = document.querySelector('#name');

//////      PLATFORMS     ////////
const platformsSelected = document.querySelector('#d-platforms_selected');
const platformsList = document.querySelector('#d-platforms_list');
const btnLoadMorePlats = document.querySelector(`#btn-load_more_plats`); 
const platsSelectedCount = document.querySelector('#platforms>span');

//////      GENRES     ////////
const genresSelected = document.querySelector('#d-genres_selected');
const genresList = document.querySelector('#d-genres_list');
const btnLoadMoreGenres = document.querySelector(`#btn-load_more_genres`); 
const genresSelectedCount = document.querySelector('#genres>span');

//////      TAGS     ////////
const tagsSelected = document.querySelector('#d-tags_selected');
const tagsList = document.querySelector('#d-tags_list');
const tag = document.querySelector('#tag');
const tagsSelectedCount = document.querySelector('#tags>span');

//////     RELEASES DATES     ////////
const releasesSelected = document.querySelector('#d-releases_selected');
const releasesList = document.querySelector('#d-releases_list');
const releaseStart = document.querySelector('#release_start');
const releaseEnd = document.querySelector('#release_end');
const releasesSelectedOk = document.querySelector('#releases>span');

//////      CREATORS    ////////
const creatorsSelected = document.querySelector('#d-creators_selected');
const creatorsList = document.querySelector('#d-creators_list');
const creator = document.querySelector('#creator');
const creatorsSelectedCount = document.querySelector('#creators>span');

//////     UPDATES     ////////
const updateSelected = document.querySelector('#d-releases_selected');
const updateList = document.querySelector('#d-update_list');
const updateStart = document.querySelector('#update_start');
const updateEnd = document.querySelector('#update_end');
const updatesSelectedOk = document.querySelector('#updates>span');

//////      PUBLISHERS    ////////
const publishersSelected = document.querySelector('#d-publishers_selected');
const publishersList = document.querySelector('#d-publishers_list');
const publisher = document.querySelector('#publisher');
const publishersSelectedCount = document.querySelector('#publishers>span');

//////      DEVELOPERS    ////////
const developersSelected = document.querySelector('#d-developers_selected');
const developersList = document.querySelector('#d-developers_list');
const developer = document.querySelector('#developer');
const developersSelectedCount = document.querySelector('#developers>span');

//// PAGE NUMBERS FOR PLATFORMS/GENRES QUERIES ////
let platformsPage = 1;
let genresPage = 1;

//// TRACK THE LIST HEIGHT TO PLACE THH ADD MORE BUTTONS ACCORDINGLY ////
let platformsHeight = 0;
let genresHeight = 0;

//// ARRAYS AND STRINGS TO GET THE RESEARCH PARAMETERS ////
let aSelectedPlats = [];
let aSelectedGenres = []; 
let aSelectedTags = [];
let strSelectedReleases = '';
let aSelectedCreators = [];
let strSelectedUpdates = '';
let aSelectedPublishers = [];
let aSelectedDevelopers = [];

//// MAKE SURE THE SCROLLING TIMEOUT RUN ONLY ONCE AT A TIME
let scrolling = false;

////  DISPLAY THE RESEARCHES FIELDS ////
document.querySelectorAll(`.open_research`).forEach(element => {
  element.addEventListener(`click`, e=>{
    let id = e.target.id;
    if(e.target.classList.contains(`counter`)) id = e.target.parentNode.id; //// IF THE CLICK IS ON THE GREEN NUMBER OR SET, UNSET STRING ////
    clearShown();
    document.querySelector(`#e_${id}_e`).classList.remove('ghost');
    document.querySelector(`#e_${id}_e`).classList.add('show_list');
  });
});

////  HIDE THE RESEARCHES FIELDS ////
document.querySelectorAll(`.hide_list`).forEach(element => {
  element.addEventListener(`click`, e=>{
    document.querySelector(`#${e.target.id}_e`).classList.remove('show_list');
    document.querySelector(`#${e.target.id}_e`).classList.add('ghost');
  });
});

//// GET PLATFORMS AND GENRES LIST FROM THE API ////
const loadDatas = async (arg, pageNumber) => {
  try {
    url = `https://api.rawg.io/api/${arg}?key=${apikey}&page=${pageNumber}&page_size=20`;

    const res = await fetch(url);
    const data = await res.json();
    
    if (arg === 'platforms') {
      let nextPlatformsListURL = data.next ? data.next : null;
      btnLoadMorePlats.parentNode.classList.toggle('ghost', ! nextPlatformsListURL);
    } else {
      let nextGenresListURL = data.next ? data.next : null;
      btnLoadMoreGenres.parentNode.classList.toggle('ghost', ! nextGenresListURL);
    }

    const elements = data.results;
    
    elements.forEach(element => {
      //console.log(element);
      const selection = 
      `
      <div class="d-grid_2_input">
        <label for="c-${element.slug}">${element.name}</label>
        <input type="checkbox" class="ghost" id="c-${element.slug}">
      </div>
      `;

      if(arg === 'platforms'){
        platformsHeight += 2;
        platformsList.insertAdjacentHTML(`beforeend`, selection); 
        btnLoadMorePlats.parentNode.style.top = `${platformsHeight}em`;
      } 
      else{
        genresHeight += 2;
        genresList.insertAdjacentHTML(`beforeend`, selection); 
        btnLoadMoreGenres.parentNode.style.top = `${genresHeight}em`;
      } 
      
      document.querySelector(`#c-${element.slug}`).addEventListener(`change`, e => {
      
        if(e.target.checked){
          elements.forEach(element => {
            validSelected(arg, element, e.target.id);
          })
        }else{
          removeSelection(arg, element.id, `d-${element.slug}-${element.id}`);
        }
      });
    });  // <----END FOREACH
  }catch (error) {
    console.error('Error fetching ', error);
  }
};

//// GET THE RESEARCHED TAG, CREATOR, PUBLISHER OR DEVELOPER FROM THE API ////
const loadInputHand = async (arg, value) => {
  try {
 url = `https://api.rawg.io/api/${arg}/${value}?key=${apikey}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  validSelected(arg, data)
  }catch (error) {
    console.error(`Error fetching ${arg}`, error);
  }
}

//// VALIDE THE SELECTED ELEMENT //// 
function validSelected(arg, element, target = null) {

  let searchOk = false;
  if( ! target) searchOk = true;
  else{
    //// MAKE SURE THIS IS THE RIGHT ELEMENT BY COMPARING THE ELEMENT SLUG WITH A PART OF THE ELEMENT TARGET ID THAT CALLED THIS FUNCTION ////
    let slugFromId = target.substring(2); 
    if(element.slug === slugFromId) searchOk = true;
  }
  if(searchOk){
    //// PREPARE THE SELECTED ELEMENT FOR DISPLAY ////
    const displayElement = 
    `
    <div class="d-element" id="d-${element.slug}-${element.id}">
        <button id="btn-${element.slug}"> X </button>
      <img src="${element.image_background}">
      <p>${element.name}</p>
    </div>
    `;
    switch(arg){
      case 'platforms': 
   //// PUSH THE ID IN THE VARIABLE USED TO STORE THE PARAMETERS ACCORDING TO THE CASE ////
        aSelectedPlats.push(element.id);
    //// SET THE TEXT CONTENT ON THE GREEN NUMBER OR SET, UNSET STRING ////
        platsSelectedCount.textContent = aSelectedPlats.length;
      //// INSERTING THE CREATED ELEMENT //// 
        platformsSelected.insertAdjacentHTML(`beforeend`, displayElement); 
    //// AUTO SCROLL THE DISPAYING DIV IN CASE OF OVERFLOW //// 
      if( ! scrolling){
        scrolling = true;
        scrollInterval = setInterval(() => scrollDown(platformsSelected), 5);
      }
      break;
      case 'genres': 
        aSelectedGenres.push(element.id);
        genresSelectedCount.textContent = aSelectedGenres.length;
        genresSelected.insertAdjacentHTML(`beforeend`, displayElement); 
      if( ! scrolling){
        scrolling = true;
        scrollInterval = setInterval(() => scrollDown(genresSelected), 5);
      }
      break;
      case 'tags': 
        if(element.id === undefined){
     // if(element.id === undefined || element.id === 50 || element.id === 312 || element.id === 786){
        document.querySelector('#d-tag_not_found').classList.remove('ninja');
        return;
        }else{
          document.querySelector('#d-tag_not_found').classList.add('ninja');
          tag.value = '';
          tag.focus();
        } 
      
        if(document.querySelector(`#d-${element.slug}-${element.id}`) === null){
          tagsSelected.insertAdjacentHTML(`beforeend`, displayElement); 
          aSelectedTags.push(element.id);
          tagsSelectedCount.textContent = aSelectedTags.length;
        }
        if( ! scrolling){
          scrolling = true;
          scrollInterval = setInterval(() => scrollDown(tagsSelected), 5);
        }
      break;
      case 'creators': 
        if(element.id === undefined){
        document.querySelector('#d-creator_not_found').classList.remove('ninja');
        return;
        }else{
          document.querySelector('#d-creator_not_found').classList.add('ninja');
          creator.value = '';
          
        } 
      
        if(document.querySelector(`#d-${element.slug}-${element.id}`) === null){
          creatorsSelected.insertAdjacentHTML(`beforeend`, displayElement); 
          aSelectedCreators.push(element.id);
          creatorsSelectedCount.textContent = aSelectedCreators.length;
        }
        if( ! scrolling){
          scrolling = true;
          scrollInterval = setInterval(() => scrollDown(creatorsSelected), 5);
        }
      break;
      case 'publishers': 
      if(element.id === undefined){
      document.querySelector('#d-publisher_not_found').classList.remove('ninja');
      return;
      }else{
        document.querySelector('#d-publisher_not_found').classList.add('ninja');
        publisher.value = '';
      } 
    
      if(document.querySelector(`#d-${element.slug}-${element.id}`) === null){
        publishersSelected.insertAdjacentHTML(`beforeend`, displayElement); 
        aSelectedPublishers.push(element.id);
        publishersSelectedCount.textContent = aSelectedPublishers.length;
      }
      if( ! scrolling){
        scrolling = true;
        scrollInterval = setInterval(() => scrollDown(publishersSelected), 5);
      }
    break;
      case 'developers': 
      if(element.id === undefined){
      document.querySelector('#d-developer_not_found').classList.remove('ninja');
      return;
      }else{
        document.querySelector('#d-developer_not_found').classList.add('ninja');
        developer.value = '';
      } 
    
      if(document.querySelector(`#d-${element.slug}-${element.id}`) === null){
        developersSelected.insertAdjacentHTML(`beforeend`, displayElement); 
        aSelectedDevelopers.push(element.id);
        developersSelectedCount.textContent = aSelectedDevelopers.length;
      }
      if( ! scrolling){
        scrolling = true;
        scrollInterval = setInterval(() => scrollDown(developersSelected), 5);
      }
    break;
      
    } 
    //// ADDING THE POSSIBLILITY TO REMOVE THE SELECTED ELEMENT ////
    document.querySelector(`#btn-${element.slug}`).addEventListener('click', e => {

      removeSelection(arg, element.id, `d-${element.slug}-${element.id}`);
      if(arg === 'platforms' || arg === 'genres')
      document.querySelector(`#c-${element.slug}`).checked = false;
    }); 
  }
}

//// FETCH THE API KEY TO FETCH THE PLATFORMS AND GENRES LIST ////
fetchKey(loadPlatsGenres);

//// LOAD TWO TIMES THE FUNCTION LOADDATA ONCE TO GET THE PLATFORMS AND ONCE TO GET THE GENRES FROM THE API ////
function loadPlatsGenres(){
  loadDatas(`platforms`, platformsPage);
  loadDatas(`genres`, genresPage);
}


//// RESEARCHES WITH TEXT INPUTS ////
document.querySelectorAll('.btn-search_hand').forEach(btn => {
  btn.addEventListener('click', e => {
    //// RETRIVE THE SEARCH BY (TAG, DEVELOPERS...) USING THE ELEMENT TARGET ID ////
    let searchBy = e.target.id.substring(11); 
    let inputId = searchBy.substring(-1, searchBy.length - 1);
    //// RETRIVE THE INPUT VALUE USING THE SEARCHBY VARIABLE ////
    let value = document.querySelector(`#${inputId}`).value;
    if(value !== ''){
      if(searchBy !== 'tags') value = value.replaceAll(' ', '-');
      loadInputHand(searchBy, value);
    }
    return;
  });
});


//// RESERCHES WITH DATES INPUTS ////
releaseStart.addEventListener('change', e => {
  if(releaseEnd.value !== '') numberOfDays(releaseStart.value, releaseEnd.value, 'releases', releasesSelectedOk);
});
releaseEnd.addEventListener('change', e => {
  if(releaseStart.value !== '') numberOfDays(releaseStart.value, releaseEnd.value, 'releases', releasesSelectedOk);
});

updateStart.addEventListener('change', e => {
  if(updateEnd.value !== '') numberOfDays(updateStart.value, updateEnd.value, 'updates', updatesSelectedOk);
});
updateEnd.addEventListener('change', e => {
  if(updateStart.value !== '') numberOfDays(updateStart.value, updateEnd.value, 'updates', updatesSelectedOk);
});

//// CREATE RESEARCH BY DATE ////
function numberOfDays(dateStart, dateEnd, arg, dateSelectedOk){
  ;   //// COUNT THE TIME BETWEEN THE START AND END DATE ////
  let start = new Date(dateStart);
  let end = new Date(dateEnd);
  const timeDifference = end - start
  //// CONVERT MILLISECONDES TO DAYS ////
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));  
 
 //// PREVENT NEGATIVE VALUES ////
  if(daysDifference < 0){
    document.querySelector(`#d-${arg}_incorrect`).classList.remove('ninja');
    document.querySelector(`#d-element_${arg}`).innerHTML = ``;
    if(arg === 'releases') strSelectedReleases = ``;
    else strSelectedUpdates = ``;
    dateSelectedOk.textContent =  'UNSET';
  }else{
    if(arg === 'releases') strSelectedReleases = `&releases&dates=${dateStart},${dateEnd}`;
    else strSelectedUpdates = `&updated=${dateStart},${dateEnd}`;
    document.querySelector(`#d-${arg}_incorrect`).classList.add('ninja');
    dateSelectedOk.textContent = 'SET';
    let formatedDateStart = dateStart.replaceAll('-', '/');
    let formatedDateEnd = dateEnd.replaceAll('-', '/');
   
    let element = 
    `
      <p>
        Start: ${formatedDateStart}
      </p>
      <p>
        + ${daysDifference} ${daysDifference < 2 ? 'day' : 'days'}
      </p>
      <p>
        End: ${formatedDateEnd} 
      </p>
    `;
  
   document.querySelector(`#d-element_${arg}`).innerHTML = element;
  }
  return;
}

//// CLEAR THE DATES ////
document.querySelector('#btn-clear_releases').addEventListener('click', e => {
  releaseStart.value = '';
  releaseEnd.value = '';
  strSelectedReleases = '';
  releasesSelectedOk.textContent = 'UNSET';

  document.querySelector('#d-element_releases').innerHTML = ``;
});

document.querySelector('#btn-clear_updates').addEventListener('click', e => {
  updateStart.value = '';
  updateEnd.value = '';
  strSelectedUpdates = '';
  updatesSelectedOk.textContent = 'UNSET';

  document.querySelector('#d-element_updates').innerHTML = ``;
});
  
//// REMOVE SELECTED ELEMEMT FROM THE RESEARCH ////
function removeSelection(arg, id, divId){
  
  switch(arg){
    case 'platforms':
      aSelectedPlats.forEach((selectedPlat, index) => {
      if (selectedPlat === id) {
        aSelectedPlats.splice(index, 1); 
        platsSelectedCount.textContent = aSelectedPlats.length;
      }
    });
    break;
    case 'genres':
      aSelectedGenres.forEach((selectedGenre, index) => {
      if (selectedGenre === id) {
        aSelectedGenres.splice(index, 1);
        genresSelectedCount.textContent = aSelectedGenres.length;
      }
    });
    break;
    case 'tags':
      aSelectedTags.forEach((selectedTag, index) => {
      if (selectedTag === id) {
        aSelectedTags.splice(index, 1);
        tagsSelectedCount.textContent = aSelectedTags.length;
      }
    });
    break;
    case 'creators':
      aSelectedCreators.forEach((selectedCreator, index) => {
      if (selectedCreator === id) {
        aSelectedCreators.splice(index, 1);
        creatorsSelectedCount.textContent = aSelectedCreators.length;
      }
    });
    break;
    case 'publishers':
      aSelectedPublishers.forEach((selectedPublisher, index) => {
      if (selectedPublisher === id) {
        aSelectedPublishers.splice(index, 1);
        publishersSelectedCount.textContent = aSelectedPublishers.length;
      }
    });
    break;
    case 'developers':
      aSelectedPublishers.forEach((selectedDeveloper, index) => {
      if (selectedDeveloper === id) {
        aSelectedDevelopers.splice(index, 1);
        developersSelectedCount.textContent = aSelectedDevelopers.length;
      }
    });
    break;
  }
  
  document.querySelector(`#${divId}`).remove();
}

//// AUTO SCROLL TO SHOW ALL SELECTED ELEMENTS IN CASE OF OVERFLOW ////
function scrollDown(element) {
  element.scrollTop ++;
  if (element.scrollTop >= (element.scrollHeight - element.clientHeight - 1)){
    clearInterval(scrollInterval); 
    scrolling = false;
  }
}

//// LOAD MORE DATAS FROM PLATFORMS AND GENRES ////
btnLoadMorePlats.addEventListener(`click`,()=>{
  platformsPage++;
  loadDatas(`platforms`, platformsPage);
});

btnLoadMoreGenres.addEventListener(`click`,()=>{
  genresPage++;
  loadDatas(`creators`, genresPage);
});

//// OPTION OF RESEARCH BY NAME OR FILTERS ////
btnSearchSwitch.addEventListener(`click`, ()=>{
  searchOptions.forEach(input => {
    input.classList.toggle('disabled');
    if(input.classList.contains('disabled')) input.setAttribute('disabled', 'true');
    else input.removeAttribute('disabled');
  })
  
  if(btnSearchSwitch.textContent === 'SEARCH BY FILTERS'){
    btnSearchSwitch.textContent = 'SEARCH BY NAME';
    form.reset();
  }else{
    btnSearchSwitch.textContent = 'SEARCH BY FILTERS';
    searchOptionsExtra.forEach(input => {
      input.classList.add('ghost');
    });  
    btnMoreFilters.textContent = 'MORE';
  }
});

//// DISPLAY MORE RESEARCH FILTER OPTIONS ////
btnMoreFilters.addEventListener('click', ()=>{
  searchOptionsExtra.forEach(input => {
    input.classList.toggle('ghost');
  })
  if(btnMoreFilters.textContent === 'MORE')
    btnMoreFilters.textContent = 'LESS';
  else btnMoreFilters.textContent = 'MORE';
});

//// HIDE THE RESEARCH DIVS BEFORE OPENING ANOTHER ONE ////
function clearShown(){
  let showned = document.querySelectorAll('.show_list');
  if(showned.length > 0){
    showned[0].classList.add('ghost');
    showned[0].classList.remove('show_list');
  }
}

////////////////////////////////////

//// RESET THE RESEARCH ////
document.querySelector('button[type="submit"]>span').addEventListener(`click`, e => {
  e.preventDefault();
 if(confirm('Reset research ?')) resetForm();
}); 


//// CHECK OF THE OPTION OF RESEARCH AND SUBMIT TO SEND THE LIST LOCATION WITH RESEARCHES PARAMETERS  ////
form.addEventListener(`submit`, e =>{
  e.preventDefault();
  if(name.value !== '')
    location.href = `list.php?title=Found&search=${name.value}&search_exact=true`; 
//search_precise
//search_exact
  else{
    let filteredsearch = '';
    
    if(aSelectedPlats.length > 0) filteredsearch += `&platforms=${aSelectedPlats.join(',')}`;
    
    if(aSelectedGenres.length > 0) filteredsearch += `&genres=${aSelectedGenres.join(',')}`;
    
    if(aSelectedTags.length > 0) filteredsearch += `&tags=${aSelectedTags.join(',')}`;
    
    if(strSelectedReleases !== '') filteredsearch += strSelectedReleases;   
    
    if(aSelectedCreators.length > 0) filteredsearch += `&creators=${aSelectedCreators.join(',')}`;
    
    if(strSelectedUpdates !== '') filteredsearch += strSelectedUpdates;   

    if(aSelectedPublishers.length > 0) filteredsearch += `&publishers=${aSelectedPublishers.join(',')}`;

    if(aSelectedDevelopers.length > 0) filteredsearch += `&developers=${aSelectedDevelopers.join(',')}`;

     
   // if(filteredsearch.length > 0)
    const newWindow = window.open('', '_blank');
    newWindow.location.href = `list.php?title=Found${filteredsearch}`; 
  } 
  
}); 


//// RESET THE FORM ////
function resetForm(){
  document.querySelector('form').reset();
  
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  document.querySelectorAll('input[type="date"]').forEach(date => {
    date.value = '';
  });
  
  aSelectedPlats = [];
  aSelectedGenres = []; 
  aSelectedTags = [];
  strSelectedReleases = '';
  aSelectedCreators = [];
  strSelectedUpdates = '';
  aSelectedPublishers = [];
  aSelectedDevelopers = [];


  platsSelectedCount.textContent = '0';
  genresSelectedCount.textContent = '0';
  tagsSelectedCount.textContent = '0';
  releasesSelectedOk.textContent = 'UNSET';
  creatorsSelectedCount.textContent = '0';
  updatesSelectedOk.textContent = 'UNSET';
  publishersSelectedCount.textContent = '0';
  developersSelectedCount.textContent = '0';
  
  document.querySelectorAll('.d-element').forEach(element => {
    element.remove();
  });

  document.querySelector('#d-element_releases').innerHTML = ``;
  document.querySelector('#d-element_updates').innerHTML = ``;
}