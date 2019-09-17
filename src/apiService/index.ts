import { fetchCard } from './fetchCard';
import { fetchCardBatch } from './fetchCardBatch';
import { fetchSimilarCards } from './fetchSimilarCards';

const apiService = {
    fetchCard,
    fetchCardBatch,
    fetchSimilarCards
};

export type ApiService = typeof apiService;

export default apiService;
