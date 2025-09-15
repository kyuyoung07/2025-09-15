//75d1a11f74da431c96b8561eff36187a
let newsList = [];
const API_KEY = `75d1a11f74da431c96b8561eff36187a`;
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

getLatestNews();

/*뉴스타임즈html미션*/
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
/*검색창 보이고 숨기기*/
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
/*render함수*/
const render = () => {
  const newsHTML = newsList.map(
    (news) => `<div class="row news">
          <div class="col-lg-4">
            <image
              class="news-img-size"
              src=${news.urlToImage}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${news.description}
            </p>
            <div>${news.source.name} * ${news.puclishdAt}</div>
          </div>
        </div>`
  ).join("");
  console.log("html",newsList)

  document.getElementById("news-board").innerHTML = newsHTML;
};
