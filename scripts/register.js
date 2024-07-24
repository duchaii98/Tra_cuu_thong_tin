"use strict";
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
const myForm = document.getElementById("myForm");
function resetForm() {
  myForm.reset();
}
// Hàm kiểm tra dữ liệu
function validateData(data) {
  if (
    data.firstname == "" ||
    data.lastname == "" ||
    data.username == "" ||
    data.password == "" ||
    data.passwordConfirm == ""
  ) {
    alert("You must fill all fields");
    return;
  }
  for (let i = 0; i < userArr.length; i++) {
    if (data.username == userArr[i].id) {
      alert("ID must be unique!");
      return;
    }
  }
  if (data.password != data.passwordConfirm) {
    alert("Password và Confirm Password phải giống nhau");
    return;
  }
  if (data.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự");
    return;
  }
  return true;
}
// Hàm bắt sự kiện khi click vào nút submit
btnSubmit.addEventListener("click", function () {
  const data = {
    firstname: inputFirstname.value,
    lastname: inputLastname.value,
    username: inputUsername.value,
    password: inputPassword.value,
    passwordConfirm: inputPasswordConfirm.value,
  };
  let check = validateData(data);
  if (check) {
    userArr.push(data);
    saveToStorage("userArr", userArr);
    resetForm();
    window.location.href = "../pages/login.html";
  }
});
