/**
 * SUSHI LAB - Manner Step Component
 * 
 * 【機能】
 * マナーステップのカードを生成
 */

import i18n from '../utils/i18n.js';

/**
 * マナーステップ要素を作成
 * @param {Object} manner - マナーデータ
 * @param {number} index - インデックス（アニメーション遅延用）
 * @returns {HTMLElement} 要素
 */
export function createMannerStep(manner, index = 0) {
    const step = document.createElement('div');
    step.className = `manner-step animate-on-scroll slide-in-right`;
    // 遅延を設定（CSSクラスで管理できない動的な遅延）
    step.style.transitionDelay = `${index * 0.1}s`;

    const lang = i18n.getCurrentLang();

    // Do/Don't リストの生成
    const doList = manner.tips.do.map(tip => `
    <div class="manner-tip manner-tip-do">
      <span class="manner-tip-icon">⭕</span>
      <span>${tip[lang]}</span>
    </div>
  `).join('');

    const dontList = manner.tips.dont.map(tip => `
    <div class="manner-tip manner-tip-dont">
      <span class="manner-tip-icon">❌</span>
      <span>${tip[lang]}</span>
    </div>
  `).join('');

    step.innerHTML = `
    <div class="manner-step-number">${manner.step}</div>
    <div class="manner-step-content">
      <h3 class="manner-step-title">${manner.title[lang]}</h3>
      <p class="manner-step-description">${manner.description[lang]}</p>
      
      <div class="manner-step-tips">
        <div class="tips-group">
          ${doList}
        </div>
        <div class="tips-group">
          ${dontList}
        </div>
      </div>
    </div>
  `;

    return step;
}
