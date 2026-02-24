
const emailInput = document.querySelector(`input[type=email]`);
const aPassword = document.querySelectorAll(`input[type=password]`);
let avatarInput= document.querySelector(`#avatar`);
let email = ``;
let password =``;
let avatar= ``;
let action =  ``;

const formCredentials= document.querySelector(`#form_credentials`);

const formCode= document.querySelector(`#form_code`);
let codeInput= document.querySelector(`input[type=number]`);
formCode.style.display = 'none';

if (sessionStorage.getItem("errorMessage")) {
  errorMessage.textContent = sessionStorage.getItem("errorMessage");
  sessionStorage.removeItem("errorMessage");
}


formCredentials.addEventListener(`submit`,(e)=>{
  e.preventDefault();
 
  email = emailInput.value;
  password = aPassword[0].value;
  logname = lognameInput.value;
  avatar= avatarInput.value;

  errorMessage.textContent = ``;

  
  if( ! isValidEmail(email)){
    errorMessage.textContent= `This email is invalid`;
    return;
  }
  
  if( ! isValidLogName(logname)){
    errorMessage.textContent= `The logname can only have letters, numbers, hyphens or underscores an name must be between 4 and 16 characters`;
    return;
  }

  if( ! isValidPassword(password)){
     errorMessage.textContent= `Weak password. Use 8–20 characters with upper & lowercase letters, a number, and a special character`;
    return;
  }
  
  if(password !== aPassword[1].value){
    errorMessage.textContent= `The passwords don't match`;
    return;
  }
  
  if (errorMessage.textContent === '') {
    password = CryptoJS.SHA256(password).toString();
  //////////////////////////////////////////////////////////////////

    let color = saturation === `0%` ? 0 : 1;
    let avatarAndBkg = avatarSet.textContent + bkg_clr + '-' + color;

    document.querySelector(`#hidden_email`).value= email;
    document.querySelector(`#hidden_logname`).value= logname;
    document.querySelector(`#hidden_avatar`).value= avatarAndBkg;
    document.querySelector(`#hidden_password`).value= password;

    e.currentTarget.style.display= 'none';
    formCode.style.display= 'flex';

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

      if(data.response=== false){
        errorMessage.textContent= `Verification impossible, please try later`;
        return;
      }
  } catch (error) {
    console.error('Error:', error);
  }   
}
///////////////////////////////////////////////

function afterCodeVerification(postData) {
  
  action =  `signIn`;
  
  formData.append('action', action);
  formData.append('email', postData.email);
  formData.append('logname', postData.logname);
  formData.append('password', postData.password);
  formData.append('avatar', postData.avatar);

  signIn(formData);
}


////  GO TO THE CONTROLLER WITH THE PARAMETERS TO SIGN IN ////
const signIn = async (formData) => {

  try {
     const res = await fetch('../Controller/users_controller.php', {
      method: 'POST',
      body: formData,
    });

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
  