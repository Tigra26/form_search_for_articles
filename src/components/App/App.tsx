import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Article } from '../../types/article';
import ArticleList from '../ArticleList/ArticleList';
import SearchForm from '../SearchForm/SearchForm';
import { Bars } from 'react-loader-spinner';
import { fetchArticles } from '../../services/articleService';
import OrderForm from '../OrderForm/OrderForm';
import Timer from '../Timer/Timer';
import Modal from '../Modal/Modal';

export default function App () {
 const [articles, setArtciles] = useState<Article[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [person, setPerson] = useState(null);
 console.log('App rendered!');
 const [counter, setCounter] = useState(1);
 const [isOpen, setIsOpen] = useState(false);
 const [isShown, setIsShown] = useState(false);
 const [clicks, setClicks] = useState(() => {
  const savedClicks = localStorage.getItem("saved-clicks");
  if (savedClicks !== null) {
    return JSON.parse(savedClicks);
  }
  return 0;
 });

 const openModal = () => setIsShown(true);
 const closeModal = () => setIsShown(false);
 
 useEffect (()=> {
  console.log('Effect ran!');
   async function fetchCharacter() {
      const res = await axios.get(`https://swapi.info/api/people/${counter}`);
      setPerson(res.data)
    };
    fetchCharacter();
    }, [counter]);


    useEffect(() => {
       localStorage.setItem('saved-clicks', JSON.stringify(clicks));
    }, [clicks])

 

 const handleSearch = async (query: string) => {
  try {
    setIsLoading(true);
    setIsError(false);

      const data = await fetchArticles(query);
     setArtciles(data);
  } catch {
    setIsError(true);
  } finally {
    setIsLoading(false);
  } 
 }

 return (
  <>
   <div>
      <button onClick={() => setClicks(clicks + 1)}>
        You clicked {clicks} times
      </button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </div>
  <div>
      <h1>Main content of the page</h1>
      <button onClick={openModal} type='button'></button>
      {isShown && (<Modal onClose={closeModal}><h2>Custom Modal Content</h2>
          <p>This is a reusable modal with dynamic content.</p>
          </Modal>)}
    </div>
  <SearchForm onSubmit={handleSearch} />
  <button onClick={() => setIsOpen(!isOpen)}>{isOpen? 'Hide timer' : 'Show timer'}</button>
  {isOpen && <Timer />}
  {isLoading && (<Bars
height="20"
width="20"
color="#4fa94d"
ariaLabel="bars-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>)}
{isError && <p>Whoops, something went wrong! Please try again!</p>}
  {articles.length > 0 && (<ArticleList articles={articles}/>)}
  <OrderForm  />
  <button type="button" onClick={() => setCounter(counter + 1)}>Get next character</button>
  <pre>{JSON.stringify(person, null, 2)}</pre>
  </>
 )
};