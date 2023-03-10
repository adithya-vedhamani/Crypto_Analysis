import { useEffect, useState } from "react";
import "../css/News.css";
import "../css/App.css";
import { nanoid } from "nanoid";
import logo from "./assets/logo.png";


export default function News(props: any) {
  const news = props.news;

  const [articles, setArticles] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState();
  const coingeckoUrl = "https://www.coingecko.com/en/coins/";


 
 
  function getNews() {
    let articles: any = [];
    let videos: any = [];

    if (news) {
      console.log(news);
      let cropped = news.slice(0, 200);
      cropped.forEach((item: any) => {
        if (item.type === "Article") {
          articles.push(item);
        } else if (item.type === "Video") {
          videos.push(item);
        }
      });
    }
    setArticles(articles);
    setVideos(videos);
  }

  useEffect(getNews, []);
  useEffect(() => {
    setCurrentVideo(videos[0]);
  }, [videos]);

  const [bookmarks, setBookmarks] = useState(loadBookmarks);

  function loadBookmarks() {
    let saved: any = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (saved != undefined) {
      return saved;
    } else {
      localStorage.setItem("bookmarks", JSON.stringify([]));
      return false;
    }
  }

  function bookmarkArticle(article: any) {
    let fav = bookmarks.slice();
    if (fav.includes(article)) {
      fav = fav.filter((e: any) => e !== article);
    } else {
      fav.push(article);
    }
    setBookmarks(fav);
    localStorage.setItem("bookmarks", JSON.stringify(fav));
  }



  return (
    <div className="News">
      <div className="news-video">
        <div className="video-showcase">
          {videos.slice(0, 1).map((article) => {
            let videoLink = article.news_url.replace("watch?v=", "embed/");

            return (
              <div key={nanoid()} className="">
                <iframe className="video-frame" src={videoLink}></iframe>
              </div>
            );
          })}

          {/* <iframe
            className="video-frame"
            src={currentVideo.news_url.replace("watch?v=", "embed/")}
          ></iframe> */}
        </div>
      </div>
      <div className="news-latest">
        <p className="news-heading">Latest News</p>
        <div className="news-list">
          {articles.map((article) => {
            return (
              <div key={nanoid()} className="news-card">
                <a
                  className="news-img-box"
                  href={article.news_url}
                  target="_blank"
                  rel="noopener"
                >
                  <img className="news-img" src={article.image_url} />
                </a>

                <div className="news-info">
                  <a href={article.news_url} target="_blank" rel="noopener">
                    <p className="news-title">{article.title}</p>
                  </a>
                  <div className="news-subheader">
                    <p className="news-source">{article.source_name}</p>
                    <p className="news-date">{article.date}</p>
                  </div>
                  <p className="news-text">{article.text}</p>

                  <div className="news-tickers">
                    {article.tickers.map((ticker: any) => {
                      return <p key={nanoid()}>{ticker}</p>;
                    })}
                  </div>
                </div>
                <button
                  className="news-bookmark"
                  onClick={() => {
                    bookmarkArticle(article.news_url);
                  }}
                >
                  {bookmarks.includes(article.news_url) ? (
                    <i className="fa-solid fa-bookmark bookmarked"></i>
                  ) : (
                    <i className="fa-regular fa-bookmark"></i>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
