"use strict";
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
// Hàm check dữ liệu
function validateData(data) {
  if (data.username == "" || data.password == "") {
    alert("You must fill all fields");
    return;
  }

  return true;
}
// hàm bắt vào sự kiện submit
btnSubmit.addEventListener("click", function () {
  const data = {
    username: inputUsername.value,
    password: inputPassword.value,
  };
  let check = validateData(data);
  if (check) {
    const user1 = userA.find(
      (item) =>
        item.username === data.username && item.password === data.password
    );
    // console.log(user1);
    if (user1) {
      alert("Dang nhap thanh cong!");
      saveToStorage("userActive", user1);
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại");
    }
  }
});
