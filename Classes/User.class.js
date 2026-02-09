/*/

class User{

  #email = '';
  #logname = '';
  #password = '';
  #avatar = '';

  constructor(email, password) {
    this.setEmail(email);
    this.setLogname(logname);
    this.setPassword(password);
    this.setAvatar(avatar);
  }

  getEmail(){
    return this.#email;
  }

  setEmail(){
    thid.#email = email;
    alert('set email');
  }

  getLogname(){
    return this.#logname;
  }
  
  setLogname(logname){
    this.#logname = logname;
    alert('set logname');
  }

  getPassword(){
    return this.#password;
  }

  setPassword(password){
    this.#password = CryptoJS.SHA256(password).toString();
    alert('set password');
  }

  getAvatar(){
    return this.#avatar;
  }

  setAvatard(avatar){
    this.#avatar = avatar;
    alert('set avatar');
  }
}
 
//alert(`class ok`);

*/