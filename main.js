//75d1a11f74da431c96b8561eff36187a
//`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
//`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
//`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
// `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
// `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
let newsList = [];
const API_KEY = `75d1a11f74da431c96b8561eff36187a`;
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
//코드 리펙토링
const getNews = async () => {
  try {
    url.searchParams.set("page", page); //=>  &page=page
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);

    const data = await response.json();
    console.log("ddd", data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No matches for your search.");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};
//뉴스 띄우는 함수
const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  getNews();
};

getLatestNews();
//카테고리별 뉴스 함수
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};
//키워드별 뉴스
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};
//뉴스타임즈html미션
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
//검색창 보이고 숨기기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
//render함수
const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <image
              class="news-img-size"
              src="${
                news.urlToImage ||
                "https://lh5.googleusercontent.com/proxy/PJk4q2iFO9VchixKNMHKqyrBb7cMBiDMZ4r04BlR38EycpWKNs6S9FIXs7qtsMzLa45nzIHrH71DhNyAHo3lqCZ4E1U67C5OogfI039rnoAmX2FVw76fm1mc9QwFAC4qTQYe9BsE33WXuJ8"
              }"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${
                news.description == null || news.description == ""
                  ? "내용없음"
                  : news.description.length > 200
                  ? news.description.substring(0, 200) + "..."
                  : news.description
              }
            </p>
            <div>${news.source.name || "no source"} * ${moment(
        news.publishedAt
      ).fromNow()}</div>
          </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger center" role="alert">${errorMessage}</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  //totalResult
  //page
  //pageSize
  //groupSize

  //totalPages
  const totalPages = Math.ceil(totalResults / pageSize);
  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  let lastPage = pageGroup * groupSize;
  //첫페이지가 5이하일 경우 5개 페이지가 아닌 뭐 3개라면 3개 보여주기. 페이지그룹이 그룹사이즈보다 작다? lastPage=totalPage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  //firstPage, 마지막이 5개로 안떨어지는 경우, 마지막 페이지 숫자에 맞춰서 5개 보여주기
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  //버튼
  let paginationHTML="";
  if(page>1){
    paginationHTML += `<li class="page-item" onclick="moveToPage(1)"><a href="#" class="page-link">&lt;&lt;</a></li>
  <li class="page-item" onclick="moveToPage(${page-1})"><a href="#" class="page-link">&lt;</a></li>`;
  }
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i===page? "active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  if(page<totalPages){
    paginationHTML+=`<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">&gt;</a></li>
  <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link" href="#">&gt;&gt;</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
};
//페이지 이동시키는 함수
const moveToPage = (pageNum) => {
  if(pageNum<1) pageNum=1;
  if(pageNum>Math.ceil(totalResults/pageSize)) pageNum=Math.ceil(totalResults/pageSize);
  console.log("moveToPage", pageNum);
  page = pageNum;
  getNews(page);
};