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
      fetch(
        `https://pixabay.com/api/?q=${searchFor}&page=${page}&key=${apiKEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(data => data.json())
        .then(data => {
          handleImageList(data.hits);
        })
        .catch(err => console.log(err));
    },
    [searchFor]
  );

  useEffect(
    function () {
      fetch(
        `https://pixabay.com/api/?q=${searchFor}&page=${page}&key=${apiKEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(data => data.json())
        .then(data => {
          setImageList(list => [...list, ...data.hits]);
        })
        .catch(err => console.log(err));
    },
    [page]
  );

  function handleLoadMore() {
    setPage(curr => curr + 1);
  }

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Is loading</p>}
      {!loading && <Images gallery={imageList} />}
      {!loading && (
        <button
          onClick={handleLoadMore}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '50px',
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Load more
        </button>
      )}
    </>
  );
}

function unice(gallery) {
  // vreau sa returnez o lista de elemente unice din gallery
  // fac un hashmap pt elementele din gallery
  // in timp ce fac hashmapul creez o noua lista
  // adaug un element in noua lista, doar daca apare o singura data

  // am aflat ca nu exista un hashmap built in
  // super
  // fac eu un obiect pe modelul unui hashmap
  // cheia va fi id-ul pozei, deoarece este unic
  // valoarea va fi frecventa pozei, contorizez de cate ori apare in gallery (de max 2 ori din cauza unui cacat pe care nu il inteleg)
  // cand frecventa este 1, adaug poza (obiectul ce reprezinta poza) in lista noua
  // returnez lista noua yay

  const hashmap = {};
  // initializez hashmapul cu 0
  for (let i = 0; i < gallery.length; i++) {
    let key = gallery[i].id;
    hashmap[key] = 0;
  }

  // acum calculez frecventa si creez lista noua
  let newList = [];
  for (let i = 0; i < gallery.length; i++) {
    let key = gallery[i].id;
    hashmap[key] = hashmap[key] + 1;
    if (hashmap[key] === 1) newList.push(gallery[i]);
  }

  return newList;
}

function Images({ gallery }) {
  let list = unice(gallery);
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
      {list.map(image => {
        return (
          <img
            style={{ width: '150px', height: '99px' }}
            key={image.id}
            src={image.previewURL}
            alt={image.user}
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
