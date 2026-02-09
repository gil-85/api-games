
document.querySelector(`form`).addEventListener(`submit`,(e)=>{
   e.preventDefault();
   
   logname = lognameInput.value;
   errorMessage.textContent = ``;
 
   
   if( ! isValidLogName(logname)){
     errorMessage.textContent= `The logname can only have letters, numbers, hyphens or underscores an name must be between 4 and 16 characters`;
     return;
    }

   
  if (errorMessage.textContent === '') {
    
   action = 'updateUser';

   let color = saturation === `0%` ? 0 : 1;
   let avatarAndBkg = avatarSet.textContent + bkg_clr + '-' + color;

   formData.append('action', action);
   formData.append('logname', logname);
   formData.append('avatar', avatarAndBkg);
  
   updateUser(formData);
 }  
 return;

});


////  GO TO THE CONTROLLER WITH THE PARAMETERS TO UPDATE ////
const updateUser = async (formData) => {
   try {
     const res = await fetch('../Controller/users_controller.php', {
       method: 'POST',
       body: formData,
     });
     //console.log(res);
     if ( ! res.ok) throw new Error('Network response was not ok');
 
 /////////////////////////////////////////////////////////////
 const data = await res.json();  
 if(data.response !== true){
   errorMessage.textContent = data.response;
    //////////////////////

    if(data.response.includes(`1062`) && data.response.includes(`logname`) )
      errorMessage.textContent = `This logname is already taken`;

      //////////////////////
  console.log(data.response);
  return;
} else window.location = '../index.php';
 //////////////////////////////////////////////////////////
 
   } catch (error) {
     console.error('Error:', error);
   }   
 }
   
 