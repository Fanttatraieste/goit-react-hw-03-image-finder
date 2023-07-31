import { useEffect, useState } from 'react';
const apiKEY = '36919577-7ad47e31187d43bcd77a6384d';

export default function App() {
  const [searchWord, setSearchWord] = useState('');
  function handleSetSearch(word) {
    setSearchWord(word);
    // console.log(searchWord);
  }
  return (
    <>
      <Header handleSearch={handleSetSearch} />
      {searchWord && <Results searchFor={searchWord} />}
    </>
  );
}

function Results({ searchFor }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState([]);

  function handleImageList(list) {
    setImageList(list);

    setLoading(false);
  }

  useEffect(
    function () {
      //
      (async () => {
        const results = await fetch(
          `https://pixabay.com/api/?q=${searchFor}&page=${page}&key=${apiKEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await results.json();
        console.log(data);
        handleImageList(data.hits);
      })();
      //
    },
    [searchFor, page]
  );

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Is loading</p>}
      {!loading && <Images gallery={imageList} />}
    </>
  );
}

function Images({ gallery }) {
  return (
    <ul
      style={{
        display: 'flex',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexWrap: 'wrap',
        gap: '25px',
        justifyContent: 'center',
      }}
    >
      {gallery.map(image => {
        return (
          <img
            style={{ width: '150px', height: '99px' }}
            key={image.id}
            src={image.previewURL}
          />
        );
      })}
    </ul>
  );
}

function Header({ handleSearch }) {
  return (
    <div
      style={{
        backgroundColor: 'blueviolet',
        height: '60px',
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form
        handleSearch={handleSearch}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </div>
  );
}

function Form({ handleSearch }) {
  const [search, setSearch] = useState('');
  function handleSubmit() {
    handleSearch(search);
  }
  return (
    <>
      <button
        onClick={handleSubmit}
        style={{
          outline: 'none',
          border: 'none',
          backgroundColor: 'white',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
        }}
      >
        <svg
          style={{
            width: '20px',
            height: '20px',
            fill: 'black',
          }}
        >
          <use href="./svgs/symbol-defs.svg#icon-search"></use>
        </svg>
      </button>
      <input
        type="text"
        style={{ outline: 'none' }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      ></input>
    </>
  );
}
