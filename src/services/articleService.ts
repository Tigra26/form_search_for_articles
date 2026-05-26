import axios from 'axios';
import type { Article} from '../types/article';

// const myKey = import.meta.env.VITE_API_KEY;

interface Articles {
    hits: Article[];
}

export const fetchArticles = async(query: string): Promise<Article[]> => {
    const res = await axios.get<Articles>(`http://hn.algolia.com/api/v1/search?query=${query}`);
    return res.data.hits;
}