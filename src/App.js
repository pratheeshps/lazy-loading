import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [listItems, setListItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setTimeout(async () => {
      const result = await fetch(`https://picsum.photos/v2/list?page=${page}`);
      const data = await result.json();
      setPage(page + 1);
      setListItems(() => {
        return [...listItems, ...data];
      });
      setIsFetching(false);
    }, 1000);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="main-container" onScroll={handleScroll}>
        {listItems.map(({ id, download_url, author }) => (
          <div className="card" key={id}>
            <div>
              <h4>
                <b>{author}</b>
              </h4>
              <p>{download_url}</p>
            </div>
          </div>
        ))}
        {isFetching && <b>Loading list...</b>}
      </div>
    </div>
  );
}
