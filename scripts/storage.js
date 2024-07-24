"use strict";
const userArr = getFromStorage("userArr") ?? [];
const todos = getFromStorage("todoArr") ?? [];
// Hàm lưu dữ liệu xuống local
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
console.log(userArr);
// chuyển đổi về dạng class instance
const userA = userArr.map((data) => parseUser(data));
console.log(userA);
// Hàm parseUser sẽ tạo ra một đối tượng User từ dữ liệu của mỗi phần tử trong mảng, và sau đó trả về đối tượng User này
function parseUser(data) {
  const user = new User(
    data.firstname,
    data.lastname,
    data.username,
    data.password,
    data.pageSize,
    data.category
  );

  return user;
}
// lấy dữ liệu user đang đăng nhập
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

// Hàm chuyển đổi từ JS object sang class instance của task class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
// chuyển đổi từ obj về dạng class Instance
const todoArr = todos.map((todo) => parseTask(todo));
console.log(todoArr);
