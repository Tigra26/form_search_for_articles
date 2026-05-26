import { useState} from 'react';
import type { Article } from '../../types/article';
import ArticleList from '../ArticleList/ArticleList';
import SearchForm from '../SearchForm/SearchForm';
import { Bars } from 'react-loader-spinner';
import { fetchArticles } from '../../services/articleService';


export default function App () {
 const [articles, setArtciles] = useState<Article[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);

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
  <SearchForm onSubmit={handleSearch} />
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
  </>
 )
};