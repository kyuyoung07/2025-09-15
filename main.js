//75d1a11f74da431c96b8561eff36187a
let news=[];
const API_KEY = `75d1a11f74da431c96b8561eff36187a`;
const getLatestNews = async() => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response=await fetch(url);
  const data=await response.json();
  news=data.articles;
  console.log("dddd",news);
};

getLatestNews();
