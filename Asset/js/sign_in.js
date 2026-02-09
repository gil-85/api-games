const emailInput = document.querySelector(`input[type=email]`);
const aPassword = document.querySelectorAll(`input[type=password]`);
let email = ``;
let password =``;
let action =  ``;


document.querySelector(`form`).addEventListener(`submit`,(e)=>{
  e.preventDefault();
  
  email = emailInput.value;
  password = aPassword[0].value;
  logname = lognameInput.value;
  errorMessage.textContent = ``;
  
  if( ! isValidEmail(email)){
    errorMessage.textContent= `Email is invalid`;
    return;
  }
  
  if( ! isValidLogName(logname)){
    errorMessage.textContent= `The logname can only have letters, numbers, hyphens or underscores an name must be between 4 and 16 characters`;
    return;
  }
  
  
  if(password !== aPassword[1].value){
    errorMessage.textContent= `The passwords don't match`;
    return;
  }
  

  
  if (errorMessage.textContent === '') {
  //////////////////////////////////////////////////////////////////


  action = 'sendCode';
  formData.append('action', action);
  formData.append('email', email);
  sendCode(formData);
  }  
  return;
});

/////////////////////////////////////////////////

////  GO TO THE CONTROLLER WITH THE PARAMETERS TO CREATE A RANDOM CODE  ////
const sendCode = async (formData) => {

  try {
    const res = await fetch('../Controller/users_controller.php', {
      method: 'POST',
      body: formData,
    });

    if ( ! res.ok) throw new Error('Network response was not ok');
    
    const data = await res.json();

    //console.log(data.response);  // needs to be removed of course :)

     if(data.response.includes(`Error`)){
        errorMessage.textContent= `Verification impossible, please try later`;
        return;
     } 
    

    const code = data.response;
    const typedCode = prompt(`Enter the code send to ${email}`);
   
    if(typedCode === code){

      action = 'signIn';
      password = CryptoJS.SHA256(password).toString();
      
      let color = saturation === `0%` ? 0 : 1;
      let avatarAndBkg = avatarSet.textContent + bkg_clr + '-' + color;
      
      formData.append('action', action);
      formData.append('logname', logname);
      formData.append('password', password);
      formData.append('avatar', avatarAndBkg);
      
      signIn(formData);   
    } else alert(`Error : the code doesn't match`);

  } catch (error) {
    console.error('Error:', error);
  }   
}
///////////////////////////////////////////////


////  GO TO THE CONTROLLER WITH THE PARAMETERS TO SIGN IN ////
const signIn = async (formData) => {

  try {
    const res = await fetch('../Controller/users_controller.php', {
      method: 'POST',
      body: formData,
    });
    //console.log(res);
    if ( ! res.ok) throw new Error('Network response was not ok');

    const data = await res.json();

    if(data.response !== true){
      errorMessage.textContent = data.response;
      //////////////////////

    if(data.response.includes(`1062`) && data.response.includes(`emai`) )
      errorMessage.textContent = `This email is already registered`;

    if(data.response.includes(`1062`) && data.response.includes(`logname`) )
      errorMessage.textContent = `This logname is already taken`;

      //////////////////////
      console.log(data.response);
      return;
    }

     action = 'logIn';
     formData.append('action', action);
     logIn(formData);

  } catch (error) {
    console.error('Error:', error);
  }   
}



const logIn = async (formData) => {

  try {
     
   const res = await fetch('../Controller/users_controller.php', {
      method: 'POST',
      body: formData,
   });
   if ( ! res.ok) throw new Error('Network response was not ok');
    window.location = '../index.php';
  }catch (error) {
    console.error('Error:', error);
  }
  
}

//// CHECK IF THE EMAIL IS VALID ////
const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};