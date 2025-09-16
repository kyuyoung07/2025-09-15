//75d1a11f74da431c96b8561eff36187a
//`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=kr&Size=${PAGE_SIZE}`
let newsList = [];
const API_KEY = `75d1a11f74da431c96b8561eff36187a`;
const PAGE_SIZE=10;
//뉴스 띄우는 함수
const getLatestNews = async () => {
  const url = new URL(
    `https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=kr&Size=${PAGE_SIZE}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

getLatestNews();
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
  const newsHTML = newsList.map(
    (news) => `<div class="row news">
          <div class="col-lg-4">
            <image
              class="news-img-size"
              src="${news.urlToImage || 'https://lh5.googleusercontent.com/proxy/PJk4q2iFO9VchixKNMHKqyrBb7cMBiDMZ4r04BlR38EycpWKNs6S9FIXs7qtsMzLa45nzIHrH71DhNyAHo3lqCZ4E1U67C5OogfI039rnoAmX2FVw76fm1mc9QwFAC4qTQYe9BsE33WXuJ8'}"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${news.description==null || news.description==""
                ?"내용없음"
                :news.description.length>200
                ?news.description.substring(0,200)+"..."
                :news.description
              }
            </p>
            <div>${news.source.name || "no source"} * ${moment(news.publishedAt_date).fromNow()}</div>
          </div>
        </div>`
  ).join("");
  console.log("html",newsList)

  document.getElementById("news-board").innerHTML = newsHTML;
};
