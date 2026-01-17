/**
 * SUSHI LAB - Phrase Card Component
 * 
 * 【機能】
 * 指差しフレーズカードを生成し、音声再生イベントを処理
 */

import i18n from '../utils/i18n.js';
import speech from '../utils/speech.js';

/**
 * フレーズカード要素を作成
 * @param {Object} phrase - フレーズデータ
 * @param {Function} onSpeak - 再生ボタンクリック時のコールバック
 * @returns {HTMLElement} カード要素
 */
export function createPhraseCard(phrase, onSpeak) {
    const card = document.createElement('div');
    card.className = 'phrase-card scale-in';
    card.dataset.category = phrase.category;

    const lang = i18n.getCurrentLang();

    // コンテキスト（使用場面）の説明
    const context = phrase.context[lang];

    card.innerHTML = `
    <div class="phrase-card-japanese">${phrase.japanese}</div>
    <div class="phrase-card-romaji">${phrase.romaji}</div>
    <div class="phrase-card-english">"${phrase.english}"</div>
    <div style="font-size: 0.8rem; color: #888; margin-bottom: 1rem;">
      <span class="icon">💡</span> ${context}
    </div>
    
    <div class="phrase-card-actions">
      <button class="phrase-speak-btn" aria-label="Play audio">
        <span class="speak-icon">🔊</span>
        <span class="speak-text" data-i18n="phrases.speak">${i18n.t('phrases.speak')}</span>
      </button>
    </div>
  `;

    // 再生ボタンのイベントリスナ
    const speakBtn = card.querySelector('.phrase-speak-btn');
    speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        // アニメーション用クラス追加
        speakBtn.classList.add('speaking');
        const speakText = speakBtn.querySelector('.speak-text');
        const originalText = speakText.textContent;
        speakText.textContent = i18n.t('phrases.speaking');

        if (onSpeak) {
            onSpeak(phrase.japanese, () => {
                // 再生終了時のコールバック
                speakBtn.classList.remove('speaking');
                speakText.textContent = originalText;
            });
        }
    });

    return card;
}
