/**
 * RANKING LAB - Categories Master Data
 */

import { Category } from './types';

export const categories: Category[] = [
    {
        id: 'economy',
        name: { jp: '経済', en: 'Economy' },
        icon: '💰',
        color: '#10B981',
        rankings: ['gdp-nominal', 'gdp-per-capita'],
    },
    {
        id: 'population',
        name: { jp: '人口', en: 'Population' },
        icon: '👥',
        color: '#3B82F6',
        rankings: ['population', 'population-density'],
    },
    {
        id: 'geography',
        name: { jp: '地理', en: 'Geography' },
        icon: '🌍',
        color: '#8B5CF6',
        rankings: ['area', 'coastline'],
    },
    {
        id: 'technology',
        name: { jp: '技術', en: 'Technology' },
        icon: '💻',
        color: '#EC4899',
        rankings: ['patent-applications', 'internet-penetration'],
    },
    {
        id: 'life',
        name: { jp: '生活', en: 'Life' },
        icon: '❤️',
        color: '#F59E0B',
        rankings: ['life-expectancy', 'happiness-index'],
    },
    {
        id: 'energy',
        name: { jp: 'エネルギー', en: 'Energy' },
        icon: '⚡',
        color: '#06B6D4',
        rankings: ['co2-emissions', 'renewable-energy'],
    },
];
