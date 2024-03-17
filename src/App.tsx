import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { isDayTime } from './utils';
import { NewsArticle } from './interfaces';
import { NewsArticleProperty } from './types';
import { DataTable, Form, Header } from './components';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState<NewsArticle[]>([]);
  const [sortProp, setSortProp] = useState<NewsArticleProperty>('points');
  const [lightOn, setLightOn] = useState(isDayTime());

  // onload > get last saved search OR get latest stories\
  useEffect(() => {
    const savedSearch = localStorage.getItem('storedSearch') || '';
    setSearchTerm(savedSearch);
    savedSearch
      ? getNewsArticles(`search?query=${savedSearch}`, 'points')
      : resetList();
  }, []);

  const getNewsArticles = (
    queryString = '',
    sort: NewsArticleProperty = sortProp
  ) => {
    return axios
      .get(`${API_ENDPOINT}${queryString}`)
      .then((res) => {
        if (res?.data?.hits) {
          const stories = applyListTransformation(res.data.hits);
          sortList(stories, sort);
        }
      })
      .catch((error) => console.log(error));
  };

  /* news article 'title' comes form either 'title' or 'story_title' property */
  const applyListTransformation = (list: NewsArticle[]) => {
    return list.map((item) => {
      item.title = item?.title || item?.story_title || 'N/A';
      return item;
    });
  };

  const sortList = (list: NewsArticle[], prop: NewsArticleProperty) => {
    const newList = [...list];
    // descending order on Points and Date
    if (prop === 'points' || prop === 'created_at')
      newList.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
    else {
      newList.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
    }
    setSortProp(prop);
    setListData(newList);
  };

  /* on search submit > use searchTerm in GET request > update data */
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('storedSearch', searchTerm);
    getNewsArticles(`search?query=${searchTerm}`);
  };

  /*  reset to default list of latest stories */
  const resetList = () => {
    getNewsArticles('search_by_date?tags=story');
    setSearchTerm('');
    setQuery('');
    localStorage.setItem('storedSearch', '');
  };

  const filteredList = listData.filter(
    (item: NewsArticle) =>
      item?.title.toLowerCase().startsWith(query) ||
      item.author.toLowerCase().startsWith(query)
  );

  return (
    <div
      className="App"
      style={{
        backgroundColor: lightOn ? 'rgb(246, 246, 239)' : '#282c34',
      }}
    >
      <Header lightOn={lightOn} setLightOn={setLightOn} onClick={resetList} />

      <Form
        onSubmit={handleSearchSubmit}
        lightOn={lightOn}
        searchTerm={searchTerm}
        setSearchTerm={(search) => setSearchTerm(search)}
        setQuery={(query) => setQuery(query)}
      />

      <DataTable
        list={filteredList}
        sortList={sortList}
        sortProp={sortProp}
        lightOn={lightOn}
      />
    </div>
  );
};

export default App;
