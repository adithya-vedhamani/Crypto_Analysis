import { useEffect, useState } from "react";
import "../css/Cryptos.css";
import { Percent } from "../components/Percent";
import { nanoid } from "nanoid";
import { Sparklines, SparklinesLine } from "react-sparklines";


export default function Cryptos(props: any) {
const cryptos = props.cryptos;

  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
  // useEffect(getCryptoData, [pageNum]);

    const [pageNum, setPageNum] = useState(1);
    const [favorites, setFavorites] = useState(loadFavorites);


  function loadFavorites() {
    let saved: any = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (saved != undefined) {
      return saved;
    } else {
      localStorage.setItem("favorites", JSON.stringify([]));
      return false;
    }
  }

  function favoriteCrypto(crypto: any) {
    let fav = favorites.slice();
    if (fav.includes(crypto)) {
      fav = fav.filter((e: any) => e !== crypto);
    } else {
      fav.push(crypto);
    }
    setFavorites(fav);
    localStorage.setItem("favorites", JSON.stringify(fav));
  }

  function nextPage() {
    setPageNum((prevPage) => prevPage + 1);
  }
  function prevPage() {
    if (pageNum > 1) {
      setPageNum((prevPage) => prevPage - 1);
    }
  }
  function goToPage(page: any) {
    setPageNum(page);
  }

  function renderPagination() {
    let pages = Array.from({ length: 10 }, (x, i) => i + (pageNum - 5));
    pages = pages.filter((page) => page > 0);

    if (!pages.includes(1)) {
      pages.unshift(1);
    }

    let pageEl = pages.map((page) => {
      return (
        <button
          key={nanoid()}
          className={page === pageNum ? "page-btn current-page" : "page-btn"}
          onClick={() => {
            goToPage(page);
          }}
        >
          {page}
        </button>
      );
    });
    return pageEl;
  }

  return (
    <div className="Cryptos">
      <table>
        <thead>
          <tr className="table-head">
            <th className="center">#</th>
            <th className="left">Coin</th>
            <th className="center">Price</th>
            <th className="right">1h</th>
            <th className="right">24h</th>
            <th className="right">7d</th>
            <th className="center">24h Volume</th>
            <th className="center">Market Cap</th>
            <th className="center">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto: any) => (
            <tr key={nanoid()} className="crypto-row">
              <td className="">
                <p>
                  <button
                    className="star-btn"
                    onClick={() => {
                      favoriteCrypto(crypto.id);
                    }}
                  >
                    {favorites.includes(crypto.id) ? (
                      <i className="starred fa-solid fa-star"></i>
                    ) : (
                      <i className="fa-regular fa-star"></i>
                    )}
                  </button>
                  {crypto.market_cap_rank}.
                </p>
              </td>

              <td>
                <a
                  href={`${coingeckoUrl}${crypto.id}`}
                  target="_blank"
                  rel="noopener"
                >
                  <div className="coin-data">
                    <img className="crypto-img" src={crypto.image} />
                    <p className="crypto-name">{crypto.name}</p>
                    <p className="crypto-symbol">{crypto.symbol}</p>
                  </div>
                </a>
              </td>

              <td>
                <p className="right">
                  $
                  {crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </td>

              <td>
                <Percent
                  data={crypto.price_change_percentage_1h_in_currency}
                  className="right"
                >
                  {Number(
                    crypto.price_change_percentage_1h_in_currency
                  ).toFixed(1)}
                  %
                </Percent>
              </td>

              <td>
                <Percent
                  data={crypto.price_change_percentage_24h_in_currency}
                  className="right"
                >
                  {Number(
                    crypto.price_change_percentage_24h_in_currency
                  ).toFixed(1)}
                  %
                </Percent>
              </td>

              <td>
                <Percent
                  data={crypto.price_change_percentage_7d_in_currency}
                  className="right"
                >
                  {Number(
                    crypto.price_change_percentage_7d_in_currency
                  ).toFixed(1)}
                  %
                </Percent>
              </td>

              <td>
                <p className="right">${crypto.total_volume.toLocaleString()}</p>
              </td>

              <td>
                <p className="right">${crypto.market_cap.toLocaleString()}</p>
              </td>

              <td className="center">
                <Sparklines data={crypto.sparkline_in_7d.price} margin={0}>
                  <SparklinesLine
                    color={
                      crypto.sparkline_in_7d.price[0] >
                      crypto.sparkline_in_7d.price[
                        crypto.sparkline_in_7d.price.length - 1
                      ]
                        ? "var(--clr-loss)"
                        : "var(--clr-gain)"
                    }
                    style={{ fill: "none", strokeWidth: 3 }}
                  />
                </Sparklines>
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>

      <div className="Pagination">
        <button className="page-btn" onClick={prevPage}>
          <i className="fa-solid fa-angle-left"></i>Back
        </button>

        <>{renderPagination()}</>

        <button className="page-btn" onClick={nextPage}>
          Next<i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}





