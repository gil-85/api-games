const textInput = document.querySelector(`#email_logname`);
const passwordInput = document.querySelector(`input[type=password]`);
const errorMessage = document.querySelector(`#p-error_message`);

let email = ``;
let action =  ``;

const formData = new FormData();

const formCredentials= document.querySelector(`#form_credentials`);

formCredentials.addEventListener(`submit`,(e)=>{
   e.preventDefault();
   
   emailogname = textInput.value;
   password = passwordInput.value;
   errorMessage.textContent = ``;
 
   if( ! isValidEmailogname(emailogname)){
      errorMessage.textContent= `Wrong email or logname and / or password (SECURITY TEST NOT OK)`;
    return;
   } 

    
   if(errorMessage.textContent === '') {
      //action = 'searchUser';
      action = 'logIn';
      password = CryptoJS.SHA256(password).toString();
      formData.append('action', action);
      formData.append('emailogname', emailogname);
      formData.append('password', password);
      
      //searchUser(formData);
      logIn(formData);
   }
   
   return;
});

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


//// CHECK IF THE EMAIL OR LOGNAME IS VALID ////
const isValidEmailogname = (emailogname) => {
   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   const lognamePattern = /^[a-zA-Z0-9_-]{4,16}$/;

   return lognamePattern.test(emailogname) || emailPattern.test(emailogname);
};



const formEmailToCode= document.querySelector(`#form_email_to_code`);
const formCode= document.querySelector(`#form_code`);
const emailInput= document.querySelector(`#email`);


let codeInput= document.querySelector(`input[type=number]`);
formEmailToCode.style.display = 'none';
formCode.style.display = 'none';
let code= null;

const btnForgotPassword= document.querySelector(`#btn-forgot_password`);
//btnForgotPassword.textContent = btnForgotPassword.textContent.split('').reverse().join('');

btnForgotPassword.addEventListener('click', ()=>{

   formCredentials.style.display = 'none';
   formEmailToCode.style.display = 'flex';
});


formEmailToCode.addEventListener(`submit`,(e)=>{
   e.preventDefault();

   const email= emailInput.value;

     if( ! isValidEmail(email)){
      errorMessage.textContent= `This email is invalid`;
      return;
   }
   document.querySelector(`#hidden_email`).value= email;

   formEmailToCode.style.display = 'none';
   formCode.style.display = 'flex';
   
   action = 'sendCode';
   formData.append('action', action);
   formData.append('email', email);
   sendCode(formData);

});




////  GO TO THE CONTROLLER WITH THE PARAMETERS TO CREATE A RANDOM CODE  ////
const sendCode = async (formData) => {
   try {
      const res = await fetch('../Controller/users_controller.php', {
         method: 'POST',
         body: formData,
      });
      
      if ( ! res.ok) throw new Error('Network response was not ok');
      
      const data = await res.json();

      if(data.response.includes(`Error`)){
         errorMessage.textContent= `Verification impossible, please try later`;
         return;
      } 
      
      
      const code = data.response;
      // const typedCode = prompt(`Enter the code send to ${email}`);
     

      // if (typedCode !== code) {
      //    errorMessage.textContent= `Error : the codes don't match`;
      //    return;
      // }
      

         // action = 'resetPassword';
         // newPassword = CryptoJS.SHA256(newPassword).toString();

         // formData.append('action', action);
         // formData.append('password', newPassword);


   } catch (error) {
      console.error('Error:', error);
   } 
}


//// INPUT TO TYPE THE CODE SEND BY MAIL

// formCode.addEventListener(`submit`,(e) => {
//   e.preventDefault();

//   if(codeInput.value=== code){

     
//     } else {
//       e.currentTarget.style.display= 'none';
//       formCredentials.style.display= 'flex';
//       codeInput.value= ``;
//      errorMessage.textContent= `The codes don't match`;
//     }
// });
































      
      // const searchUser = async (formData) => {
      
      //    try {
      //       const res = await fetch('../Controller/users_controller.php', {
      //          method: 'POST',
      //          body: formData,
      //       });
      //       //console.log(res);
      //       if ( ! res.ok) throw new Error('Network response was not ok');
      
      //       const data = await res.json();  
      //       console.log(data);
      
      
      //       if(data.response === false){
      //          errorMessage.textContent = `Wrong email or logname and / or password (NO USER FOUND)`;
      //          return;
      //       }else{
      //        // if(data){// === emailogname || data.response.logname === emailogname){ 
                 
      //            action = 'logIn';
      //            formData.append('action', action);
      //            formData.append('email', data.response.email);
      //            logIn(formData);
      //            console.log(data.response.email);
      //           // errorMessage.textContent = data.response.email; ///////
      //         }
      //        // else errorMessage.textContent = data.response.email;//`We have a response !!`;//data.response; 
      //      // }
         
      //    } catch (error) {
      //       console.error('Error:', error);
      //    }   
      // }
      
