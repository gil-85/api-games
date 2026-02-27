const form= document.querySelector(`form`);
const newPassInput= document.querySelector(`#new_password`);
const confNewPassInput= document.querySelector(`#confirm_new_password`);
const errorMessage = document.querySelector(`#p-error_message`);
const email= document.querySelector(`#spn-email`).textContent;
console.log(email);
let newPass= ``;
let action =  ``;

document.querySelector(`#spn-email`).style.display= `none`;

const formData = new FormData();


form.addEventListener(`submit`, e=>{
  e.preventDefault();
  
  newPass= newPassInput.value;

  if( ! isValidPassword(newPass)){
     errorMessage.textContent= `Weak password. Use 8-20 characters with upper & lowercase letters, a number, and a special character`;
    return;
  }
  
  if (newPass !== confNewPassInput.value){
    errorMessage.textContent= `The passwords don't match`;
    return; 
  }

  //// add password complexity to do

  action= `updatePassword`;  
  newPass = CryptoJS.SHA256(newPass).toString();
  formData.append('action', action);
  formData.append('email', email);
  formData.append('newPass', newPass);
  
  updatePass(formData);

  return;
});


const updatePass = async (formData) => {
  try {
      
    const res = await fetch('../Controller/users_controller.php', {
       method: 'POST',
       body: formData,
    });
    console.log(res);
    if ( ! res.ok) throw new Error('Network response was not ok');

    ////////////////////////////////////////////////////////////////
    const data = await res.json();
    
    if(data.response !== true){
      errorMessage.textContent = data.response;
      console.log(data);
      console.log(data.response);
      return;
    } //else window.location = '../index.php'; // need 2 go to log
     
    
   else {
      
      action = 'logIn';
     
      formData.append('action', action);
      formData.append('email', email); //// ONLY THE EMAIL IS PROVIDED IN THE PASS RECOVERY CASE
      formData.append('password', newPass); //// PASSWORD ALREADY ENCRYPTED
      
      logIn(formData);
  }
   
   return;
    ////////////////////////////////////////////////////////////////

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
      console.log(res);
      if ( ! res.ok) throw new Error('Network response was not ok');

      ////////////////////////////////////////////////////////////////

      const data = await res.json();
      
      if(data.response !== true){
         errorMessage.textContent = data.response;
         console.log(data);
         console.log(data.response);
         return;
       } else window.location = '../index.php';
   
      ////////////////////////////////////////////////////////////////

   } catch (error) {
      console.error('Error:', error);
   }
   
}
