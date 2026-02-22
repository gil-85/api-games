const email= document.querySelector(`#spn-email`).textContent;
const logname= document.querySelector(`#spn-logname`).textContent;
const avatar= document.querySelector(`#spn-avatar`).textContent;
const password= document.querySelector(`#spn-password`).textContent;
const errorMessage = document.querySelector(`#p-error_message`);
// console.log(email);
let action =  `signIn`;


document.querySelector(`html`).style.background= `none`;
document.querySelector(`#d-form_info`).style.display= `none`;

// console.log(email);
// console.log(logname);
// console.log(avatar);
// console.log(password);


const formData = new FormData();


formData.append('action', action);
formData.append('email', email);
formData.append('logname', logname);
formData.append('password', password);
formData.append('avatar', avatar);


    
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
      //errorMessage.textContent = data.response;
      //////////////////////

    if(data.response.includes(`1062`) && data.response.includes(`emai`) )
      sessionStorage.setItem("errorMessage", "This email is already registered");
      //errorMessage.textContent = `This email is already registered`;
     // alert(`This email is already registered`);
    
    if(data.response.includes(`1062`) && data.response.includes(`logname`) )
      sessionStorage.setItem("errorMessage", "This logname is already taken");
      //errorMessage.textContent = `This logname is already taken`;
      //alert(`This logname is already taken`);
      //////////////////////
     //console.log(data.response);

      window.location = 'sign_in.php';
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
   signIn(formData);