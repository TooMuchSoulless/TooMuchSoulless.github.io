class AuthException extends Error {
  constructor(code, message) {
    super(message ? `${code}: ${message}` : `${code}`);
    this.code = code;
  }
  
  toString() {
    return this.message;
  }
}

let isAuth = (auth) => auth ?? false;

let dialogBoxId = document.getElementById("dialogBox");

function showDialog(){
  dialogBoxId.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDialog();
    }
  });
  
  dialogBoxId.showModal();
}

function closeDialog(){
  dialogBoxId.close(); 
}

let checkAuth = document.querySelector(".check-auth");

checkAuth.addEventListener("click", () => {
  try {
    let authResult = isAuth();
    
    if (!authResult) {
      throw new AuthException('FORBIDDEN', "You don't have access to this page"); 
    } else {
      window.open("success.html");
    }
  } catch (e) {
    let errorMessage = document.querySelector(".message");
    errorMessage.textContent = e.toString();
    showDialog();
  }
});

