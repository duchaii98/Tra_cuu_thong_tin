"use strict";
const inpuTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
// Hiển thị thông tin todo List
function displayTask() {
  todoList.innerHTML = "";
  // từ mảng todoArr lọc ra các task là của user đang đang nhập để hiển thị lên bảng
  let checktodo = todoArr.filter((el) => el.owner === userActive.username);

  checktodo.forEach((item) => {
    let html = `<li class = ${item.isDone ? "checked" : ""}>${
      item.task
    }<span class="close">×</span></li>`;
    todoList.insertAdjacentHTML("afterbegin", html);
  });
  // Bắt sự kiện
  deletTask();
  ToggleTasks();
}
displayTask();
// bắt sự kiện nút Add để thêm tasks
btnAdd.addEventListener("click", function () {
  // Kiểm tra xem người dùng đã thực sự nhập tên nhiệm vụ cần Add chưa?
  if (inpuTask.value.trim().length === 0) {
    alert("Vui lòng nhập nhiệm vụ!");
  } else {
    const todo = new Task(inpuTask.value, userActive.username, false);
    // Thêm task mới vào mảng todoArr
    todoArr.push(todo);
    // Lưu dữ liệu xuống localStorage
    saveToStorage("todoArr", todoArr);
    // Hiển thị lại list các nhiệm vụ
    displayTask(todoArr);
    // reset dữ liệu
    inpuTask.value = "";
  }
});
// Hàm bắt các sự kiện toggle tasks
function ToggleTasks() {
  // lất tất các phần tử li chứa thông tin của các task và bắt vào sự kiện click
  document.querySelectorAll("#todo-list li").forEach((ele) =>
    ele.addEventListener("click", function (e) {
      // tránh nút delet ra để không bị chồng sự kiện
      if (e.target !== ele.children[0]) {
        e.target.classList.toggle("checked");
        const item = todoArr.find(
          (tim) =>
            tim.owner === userActive.username &&
            tim.task === ele.textContent.slice(0, -1)
        );

        item.isDone = e.target.classList.contains("checked") ? true : false;
        console.log(item);
        saveToStorage("todoArr", todoArr);
        return;
      }
      return;
    })
  );
}
console.log(todoArr);
// Bắt sự kiện xóa các tasks
function deletTask() {
  // lấy tất cả các phần tử nút delete bắt sự kiện click
  document.querySelectorAll("#todo-list .close").forEach(function (ele) {
    ele.addEventListener("click", function (e) {
      console.log(e.target);
      const isDelete = confirm("Bạn chắc chắn muốn xóa chứ?");
      // Tìm vị trí của task được ấn xóa trong mảng todoArr
      let index = todoArr.findIndex(
        (tim) =>
          tim.owner === userActive.username &&
          tim.task === e.target.parentElement.textContent.slice(0, -1)
      );
      console.log(index);
      if (isDelete) {
        // Xóa các task đó ra khỏi mảng todoArr
        todoArr.splice(index, 1);
        // Cập nhật lại dữ liệu xuống local
        saveToStorage("todoArr", todoArr);
        console.log(todoArr);
        displayTask();
      }
    });
  });
}
