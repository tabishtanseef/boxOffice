import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setsearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setsearchOption(ev.target.value);
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No result</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows{' '}
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actor-search">
          Actors{' '}
          <input
            id="actor-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;