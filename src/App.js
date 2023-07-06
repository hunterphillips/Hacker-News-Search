import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { isDayTime } from './utils';
import { DataTable, Form, Header } from './components';
import './App.css';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState([]);
  const [sortProp, setSortProp] = useState('');
  const [lightOn, setLightOn] = useState(isDayTime());

  // onload > get last saved search OR get latest stories\
  useEffect(() => {
    const savedSearch = localStorage.getItem('storedSearch') || '';
    setSearchTerm(savedSearch);
    savedSearch
      ? getStories(`search?query=${savedSearch}`, 'points')
      : resetList();
  }, []);

  const getStories = (queryString = '', sort = sortProp) => {
    return axios
      .get(`${API_ENDPOINT}${queryString}`)
      .then((res) => {
        if (res?.data?.hits) {
          const stories = applyListTransformation(res.data.hits);
          sortList(stories, sort)();
        }
      })
      .catch((error) => console.log(error));
  };

  // standardize 'title' attribute
  const applyListTransformation = (list) => {
    return list.map((item) => {
      item.title = item?.title || item?.story_title || 'N/A';
      return item;
    });
  };

  const sortList = (list, prop) => () => {
    let newList = [...list];
    if (prop !== sortProp) {
      // descending order on Points and Date
      if (prop === 'points' || prop === 'created_at')
        newList.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
      else {
        newList.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
      }
      setSortProp(prop);
    }
    setListData(newList);
  };

  // on search submit > use searchTerm in GET request > update data
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('storedSearch', searchTerm);
    getStories(`search?query=${searchTerm}`);
  };

  // reset to default list of latest stories
  const resetList = () => {
    getStories('search_by_date?tags=story');
    setSearchTerm('');
    setQuery('');
    localStorage.setItem('storedSearch', '');
  };

  const filteredList = listData.filter(
    (item) =>
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
