"use strict";
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");
function isNaN(x) {
  // Ép kiểu Number cho biến x
  x = Number(x);
  // Nếu x là NaN, NaN != NaN trả về true, các trường hợp khác sẽ trả về false
  return x != x;
}
// hàm kiểm tra dữ liệu
function validate() {
  // Kiểm tra inputpagesize
  if (isNaN(inputPageSize.value) || inputPageSize.value == "") {
    alert("News per page không hợp lệ");
    return;
  }
  // Kiểm tra category
  if (inputCategory.value == "") {
    alert("Vui lòng nhập News Category");
    return;
  }
  return true;
}
getFromStorage("userArr", userA);
btnSubmit.addEventListener("click", function () {
  if (validate()) {
    // cập nhật lại userActive
    userActive.pageSize = Number.parseInt(inputPageSize.value);
    userActive.category = inputCategory.value;
    saveToStorage("userActive", userActive);
    // cập nhật lại mảng userArr
    const index = userA.findIndex(
      (item) => item.username === userActive.username
    );
    userA[index] = userActive;
    saveToStorage("userArr", userA);
    // reset lai form nhập và thông báo cài đặt thành công
    alert("Cài đặt thành công!");
  }
});
// Hàm hiển thị những cài đặt mình đã cài
let hienthi = getFromStorage("userActive", userActive) ?? null;
console.log(hienthi);
if (hienthi) {
  inputPageSize.value = hienthi.pageSize;
  inputCategory.value = hienthi.category;
}
