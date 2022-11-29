import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import lightOnImg from '../assets/lightbulb_on.png';
import lightOffImg from '../assets/lightbulb_off.png';
import { isDayTime } from '../utils';
import { DataTable, Form } from '../components';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/';

export const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [sortProp, setSortProp] = useState('points');
  const [lightOn, setLightOn] = useState(isDayTime());

  // onload > get last saved search OR get latest stories\
  useEffect(() => {
    const savedSearch = localStorage.getItem('storedSearch') || '';
    setSearchTerm(savedSearch);
    savedSearch ? getStories(`search?query=${savedSearch}`) : resetList();
  }, []);

  const getStories = (queryString = '') => {
    return axios
      .get(`${API_ENDPOINT}${queryString}`)
      .then((res) => {
        res.data.hits && setData(res.data.hits);
      })
      .catch((error) => console.log(error));
  };

  // on search submit > use searchTerm in GET request > update data
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('storedSearch', searchTerm);
    getStories(`search?query=${searchTerm}`).then(() => {
      // sortList(data, sortProp);
    });
  };

  // reset to default list of latest stories
  const resetList = () => {
    getStories('search_by_date?tags=story').then(() => {
      // sortList(data, sortProp);
    });
    setSearchTerm('');
    setQuery('');
    localStorage.setItem('storedSearch', '');
  };

  const sortList = (list, prop) => {
    let newList = [...list];
    // descending order on Points and Date
    if (prop === 'points' || prop === 'created_at')
      newList.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
    else {
      newList.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
    }
    setData(newList);
    setSortProp(prop);
  };

  const filteredList = data.filter(
    (item) =>
      item.title.toLowerCase().startsWith(query) ||
      item.author.toLowerCase().startsWith(query)
  );

  return (
    <div
      className="App"
      // light/dark mode
      style={{
        backgroundColor: lightOn ? 'rgb(246, 246, 239)' : '#282c34',
      }}
    >
      <div style={{ position: 'relative' }}>
        <h1 className="AppHeader" onClick={resetList}>
          Search
        </h1>
        <img
          className="lightBulb"
          onClick={() => setLightOn(!lightOn)}
          src={lightOn ? lightOnImg : lightOffImg}
          alt="lightbulb"
        />
      </div>

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
