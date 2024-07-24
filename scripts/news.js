"use strict";
const apiKey = "3f66b80e586e4af29b6cd65203b3107b";
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
let totalResults = 0;
console.log(userActive);
// Hàm hiển thị tin
function displayNews(data) {
  let checkTotal = Math.ceil(Number(data.totalResults) / userActive.pageSize);

  anPrev();
  anNext(checkTotal);
  // totalResults = number(data.totalResults) / userActive.pageSize;
  newsContainer.innerHTML = "";
  data.articles.forEach((item) => {
    let html = `
  <div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img class="card-img"
      src=${item.urlToImage ? item.urlToImage : "./no_img.jpg"}
        alt="img"/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <a href="${item.url}"
          class="btn btn-primary">View</a>
      </div>
    </div>
  </div>
</div>
  `;
    newsContainer.insertAdjacentHTML("afterbegin", html);
  });
}
// Hàm hiện thị nút previous
function anPrev() {
  if (Number(pageNum.textContent) === 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}
// Hàm hiển thị nút next
function anNext(checkTotal) {
  if (Number(pageNum.textContent) === checkTotal) {
    btnNext.style.display = "none";
    return;
  }
  return (btnNext.style.display = "block");
}
// bắt sự kiện vào nút pre
btnPrev.addEventListener("click", function () {
  let count = Number(pageNum.textContent);
  count--;
  pageNum.textContent = `${count}`;
  getDataNews("us", pageNum.textContent);
});
// bắt sự kiện nút next
btnNext.addEventListener("click", function () {
  let count = Number(pageNum.textContent);
  count++;
  pageNum.textContent = `${count}`;
  getDataNews("us", pageNum.textContent);
});
// hàm lấy api
async function getDataNews(country, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=3f66b80e586e4af29b6cd65203b3107b`
    );
    const data = await res.json();
    console.log(data);
    if (data.status === "error" && data.code === "corsNotAllowed") {
      throw new Error(data.mesage);
    }
    displayNews(data);
  } catch (error) {
    alert("Error: " + error.mesage);
  }
}
getDataNews("us", 1);
