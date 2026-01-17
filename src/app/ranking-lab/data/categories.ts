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
        image: '/ranking-lab/images/economy.png',
        rankings: ['gdp-nominal', 'gdp-per-capita'],
    },
    {
        id: 'population',
        name: { jp: '人口', en: 'Population' },
        icon: '👥',
        color: '#3B82F6',
        image: '/ranking-lab/images/population.png',
        rankings: ['population', 'population-density'],
    },
    {
        id: 'geography',
        name: { jp: '地理', en: 'Geography' },
        icon: '🌍',
        color: '#8B5CF6',
        image: '/ranking-lab/images/geography.png',
        rankings: ['area', 'coastline'],
    },
    {
        id: 'technology',
        name: { jp: '技術', en: 'Technology' },
        icon: '💻',
        color: '#EC4899',
        image: '/ranking-lab/images/technology.png',
        rankings: ['patent-applications', 'internet-penetration'],
    },
    {
        id: 'life',
        name: { jp: '生活', en: 'Life' },
        icon: '❤️',
        color: '#F59E0B',
        image: '/ranking-lab/images/life.png',
        rankings: ['life-expectancy', 'happiness-index'],
    },
    {
        id: 'energy',
        name: { jp: 'エネルギー', en: 'Energy' },
        icon: '⚡',
        color: '#06B6D4',
        image: '/ranking-lab/images/energy.png',
        rankings: ['co2-emissions', 'renewable-energy'],
    },
];
