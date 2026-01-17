/**
 * RANKING LAB - Rankings Index
 * すべてのランキングデータをエクスポート
 */

import { RankingData } from './types';

// 経済
import { gdpNominal, gdpPerCapita } from './rankings/economy';
// 人口
import { population, populationDensity } from './rankings/population';
// 地理
import { area, coastline } from './rankings/geography';
// 技術
import { patentApplications, internetPenetration } from './rankings/technology';
// 生活
import { lifeExpectancy, happinessIndex } from './rankings/life';
// エネルギー
import { co2Emissions, renewableEnergy } from './rankings/energy';

// ============================================================
// 全ランキングデータ（IDでアクセス可能）
// ============================================================
export const allRankings: Record<string, RankingData> = {
    // 経済
    'gdp-nominal': gdpNominal,
    'gdp-per-capita': gdpPerCapita,
    // 人口
    'population': population,
    'population-density': populationDensity,
    // 地理
    'area': area,
    'coastline': coastline,
    // 技術
    'patent-applications': patentApplications,
    'internet-penetration': internetPenetration,
    // 生活
    'life-expectancy': lifeExpectancy,
    'happiness-index': happinessIndex,
    // エネルギー
    'co2-emissions': co2Emissions,
    'renewable-energy': renewableEnergy,
};

// カテゴリ別にグループ化
export const rankingsByCategory: Record<string, RankingData[]> = {
    economy: [gdpNominal, gdpPerCapita],
    population: [population, populationDensity],
    geography: [area, coastline],
    technology: [patentApplications, internetPenetration],
    life: [lifeExpectancy, happinessIndex],
    energy: [co2Emissions, renewableEnergy],
};

// 個別エクスポート
export {
    gdpNominal,
    gdpPerCapita,
    population,
    populationDensity,
    area,
    coastline,
    patentApplications,
    internetPenetration,
    lifeExpectancy,
    happinessIndex,
    co2Emissions,
    renewableEnergy,
};
