"use strict";
const btnSubmit = document.getElementById("btn-submit");
const inputQuery = document.getElementById("input-query");
const navPageNum = document.getElementById("nav-page-num");
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
let totalResults = 0;
let keywords = "";
navPageNum.style.display = "none";
// Hàm hiển thị tin tức
function displayNewList(data) {
  totalResults = data.totalResults;
  console.log(totalResults);
  checkBtnNext();
  checkBtnPrev();
  newsContainer.innerHTML = "";
  data.articles.forEach((article) => {
    let html = `
    <div >
     <div class="img-banner">
   <img src= ${
     article.urlToImage ? article.urlToImage : "no_img.jpg"
   } alt="img" /></div>
    </div>
    <div class= "content"> <h4>${article.title}</h4>
    <p>${article.description}</p>
    <button><a href=${article.url} target="_blank">View</a></button></div></div>
  `;
    newsContainer.insertAdjacentHTML("afterbegin", html);
  });
  // let html = "";
  // data.articles.forEach((article) => {
  //   html = `
  //   <div id="news-container">
  //   <div class="img-banner">
  //   <img src= ${
  //     article.urlToImage ? article.urlToImage : "no_img.jpg"
  //   } alt="img" /></div>
  //   </div>
  //   <div class= "content"> <h4>${article.title}</h4>
  //   <p>${article.description}</p>
  //   <button><a href=${article.url} target="_blank">View</a></button></div></div>
  //   `;
  // });
  // newsContainer.innerHTML = html;
}
// hàm bắt sự kiện nút submit
btnSubmit.addEventListener("click", function () {
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";
  if (inputQuery.value.trim().length === 0) {
    navPageNum.style.display = "none";
    alert("Vui lòng nhập keywords để tìm kiếm!");
  } else {
    keywords = inputQuery.value;
    getDataNewsByKeywords(keywords, 1);
  }
});
// Hàm bất đồng bộ để lấy dữ liệu tin tức được tìm kiếm từ từ khóa nhập vào
async function getDataNewsByKeywords(keywords, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=3f66b80e586e4af29b6cd65203b3107b`
    );
    const data = await res.json();
    console.log(data);
    console.log(userActive.pageSize);
    // check lỗi quá 100 lần/ request một ngày
    if ((data.status === "error") & (data.code === "rateLimited")) {
      navPageNum.style.display = "none";
      throw new Error(data.message);
    }
    // nếu không có bài viết nào thì thông báo
    if (data.totalResults == 0) {
      // ẩn các nút chuyển trang nếu có lỗi
      navPageNum.style.display = "none";
      throw new Error(
        "Không có bài báo nào phù hợp với từ khóa bạn tìm kiếm, thử lại bằng cách nhập từ khóa mới"
      );
    }
    // bắt lỗi khi chạy từ tập tin không thông qua server
 
    // hiển thị các nút chuyển trang nếu dữ lieu trả về thành công
    navPageNum.style.display = "block";
    displayNewList(data);
    // bắt lỗi và thông báo cho người dùng
  } catch (error) {
    alert(error.message);
  }
}
// hàm kiểm tra điểu kiện ấn vào nút previouse
function checkBtnPrev() {
  if (pageNum.textContent == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}
// hàm kiểm tra điều kiện ấn vào nút next
function checkBtnNext() {
  if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}
btnPrev.addEventListener("click", function () {
  getDataNewsByKeywords(keywords, --pageNum.textContent);
});
btnNext.addEventListener("click", function () {
  getDataNewsByKeywords(keywords, ++pageNum.textContent);
});
