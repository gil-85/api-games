const form= document.querySelector(`form`);
const newPass= document.querySelector(`#new_password`);
const confNewPass= document.querySelector(`#confirm_new_password`);
const errorMessage = document.querySelector(`#p-error_message`);
const email= document.querySelector(`#spn-email`).textContent;
console.log(email);



form.addEventListener(`submit`, e=>{
   e.preventDefault();

   if (newPass.value !== confNewPass.value){
     errorMessage.textContent= `The passwords don't match`;
     return; 
   }

   //// add password complexity to do

  
});