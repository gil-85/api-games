




function createNewPassword(){

   // action = 'resetPassword';
   // newPassword = CryptoJS.SHA256(newPassword).toString()
   // formData.append('action', action);
   // formData.append('password', newPassword);

   let newPassword;
   let confirmNewPassword;

   do {
     newPassword = prompt("Enter a new password");
     if (newPassword === null) return; // user pressed cancel

     confirmNewPassword = prompt("Confirm the password");
     if (confirmNewPassword === null) return;

     if (newPassword !== confirmNewPassword) {
       alert("Passwords don't match. Try again.");
     }

   } while (newPassword !== confirmNewPassword);

}







createNewPassword();




console.log(`password recovery`);