/**
 * SUSHI LAB - Application Logic
 * 
 * 【機能】
 * アプリケーションの全体ロジックを管理
 * - 状態管理
 * - コンポーネントのレンダリング
 * - イベントハンドリング
 * - 初期化
 */

import sushiData, { filterSushi } from './data/sushi.js';
import mannersData from './data/manners.js';
import phrasesData, { filterPhrasesByCategory } from './data/phrases.js';
import i18n from './utils/i18n.js';
import filterUtils, { getInitialFilterState, getFilterSummary } from './utils/filter.js';
import speech from './utils/speech.js';
import { createSushiCard, createSushiDetailContent } from './components/SushiCard.js';
import { createMannerStep } from './components/MannerStep.js';
import { createPhraseCard } from './components/PhraseCard.js';

class App {
    constructor() {
        this.state = {
            filter: getInitialFilterState(),
            currentPhraseCategory: 'order',
            isMenuOpen: false
        };

        // DOM Elements
        this.elements = {
            langToggle: document.getElementById('lang-toggle'),
            sushiGrid: document.getElementById('sushi-grid'),
            mannerSteps: document.getElementById('manner-steps'),
            phraseCards: document.getElementById('phrase-cards'),
            phraseCategories: document.getElementById('phrase-categories'),
            categoryFilters: document.getElementById('category-filters'),
            tasteSliders: {
                fatty: document.getElementById('filter-fatty'),
                light: document.getElementById('filter-light'),
                sweet: document.getElementById('filter-sweet')
            },
            norenOverlay: document.getElementById('noren-overlay'),
            modalOverlay: document.getElementById('modal-overlay'),
            modalContent: document.getElementById('modal-content'),
            sushiModalOverlay: document.getElementById('sushi-modal-overlay'),
            sushiModalContent: document.getElementById('sushi-modal-content'),
            toastContainer: document.getElementById('toast-container')
        };
    }

    /**
     * 初期化
     */
    init() {
        // 言語設定の初期化
        i18n.initLang();
        this.updateLanguageUI();

        // 音声機能の初期化
        speech.initSpeech();

        // イベントリスナの設定
        this.setupEventListeners();

        // 初回レンダリング
        this.renderSushiGrid();
        this.renderManners();
        this.renderPhrases();

        // エントリーアニメーション
        this.playEntryAnimation();

        // スクロールアニメーションの監視開始
        this.initIntersectionObserver();
    }

    /**
     * イベントリスナの設定
     */
    setupEventListeners() {
        // 言語切替
        this.elements.langToggle.addEventListener('click', () => {
            i18n.toggleLang();
            this.updateLanguageUI();
            // 全再レンダリング
            this.renderSushiGrid();
            this.renderManners();
            this.renderPhrases();
        });

        // カテゴリフィルター
        this.elements.categoryFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.dataset.category;

                // アクティブクラスの更新
                this.elements.categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === category);
                });

                // ステート更新と再レンダリング
                this.state.filter.category = category;
                this.renderSushiGrid();
            }
        });

        // 味覚スライダー
        Object.keys(this.elements.tasteSliders).forEach(key => {
            const slider = this.elements.tasteSliders[key];
            const valueDisplay = slider.nextElementSibling;

            slider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                valueDisplay.textContent = value;
                this.state.filter.taste[key] = value;
                this.renderSushiGrid();
            });
        });

        // フレーズカテゴリ
        this.elements.phraseCategories.addEventListener('click', (e) => {
            if (e.target.classList.contains('phrase-cat-btn')) {
                const category = e.target.dataset.phraseCat;

                // アクティブクラスの更新
                this.elements.phraseCategories.querySelectorAll('.phrase-cat-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.phraseCat === category);
                });

                // ステート更新と再レンダリング
                this.state.currentPhraseCategory = category;
                this.renderPhrases();
            }
        });

        // ナビゲーションスクロール
        document.querySelectorAll('[data-section]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionId = e.target.closest('[data-section]').dataset.section;
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // モーダル閉じるボタン
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target === el || el.classList.contains('modal-close')) {
                    this.closeModals();
                }
            });
        });

        // フッターリンク（モーダル）
        document.querySelectorAll('[data-modal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalType = e.target.dataset.modal;
                this.openLegalModal(modalType);
            });
        });

        // 広告閉じるボタン
        const adClose = document.querySelector('.ad-close');
        if (adClose) {
            adClose.addEventListener('click', () => {
                document.querySelector('.ad-sticky').style.display = 'none';
                document.querySelector('.footer').style.paddingBottom = '3rem';
            });
        }
    }

    /**
     * 言語UIの更新
     */
    updateLanguageUI() {
        // data-i18n属性の更新
        i18n.updateAllTranslations();

        // ボディの属性更新（フォント切替用）
        document.body.setAttribute('data-lang', i18n.getCurrentLang());
    }

    /**
     * 寿司グリッドのレンダリング
     */
    renderSushiGrid() {
        const { category, taste } = this.state.filter;
        const filteredSushi = filterSushi(category, taste);
        const container = this.elements.sushiGrid;

        container.innerHTML = '';

        if (filteredSushi.length === 0) {
            container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍣</div>
          <p class="empty-state-title" data-i18n="encyclopedia.empty">${i18n.t('encyclopedia.empty')}</p>
          <p class="empty-state-description" data-i18n="encyclopedia.empty.desc">${i18n.t('encyclopedia.empty.desc')}</p>
        </div>
      `;
            return;
        }

        filteredSushi.forEach((sushi, index) => {
            const card = createSushiCard(sushi, (clickedSushi) => {
                this.openSushiDetail(clickedSushi);
            });
            // アニメーション用
            card.style.animationDelay = `${index * 0.05}s`;
            container.appendChild(card);
        });
    }

    /**
     * マナーセクションのレンダリング
     */
    renderManners() {
        const container = this.elements.mannerSteps;
        container.innerHTML = '';

        mannersData.forEach((manner, index) => {
            const step = createMannerStep(manner, index);
            container.appendChild(step);
        });

        // Intersection Observerでアニメーションを発火させるため、再監視
        this.refreshIntersectionObserver();
    }

    /**
     * フレーズセクションのレンダリング
     */
    renderPhrases() {
        const category = this.state.currentPhraseCategory;
        const filteredPhrases = filterPhrasesByCategory(category);
        const container = this.elements.phraseCards;

        container.innerHTML = '';

        filteredPhrases.forEach((phrase, index) => {
            const card = createPhraseCard(phrase, (text, onComplete) => {
                this.speakPhrase(text, onComplete);
            });
            card.style.animationDelay = `${index * 0.05}s`;
            container.appendChild(card);
        });
    }

    /**
     * 寿司詳細モーダルを開く
     */
    openSushiDetail(sushi) {
        const content = createSushiDetailContent(sushi);
        this.elements.sushiModalContent.innerHTML = content;
        this.elements.sushiModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 背景スクロール禁止
    }

    /**
     * 法的モーダルを開く
     */
    openLegalModal(type) {
        let title = '';
        let body = '';

        const lang = i18n.getCurrentLang();

        switch (type) {
            case 'privacy':
                title = i18n.t('footer.privacy');
                body = `
          <div class="legal-content">
            <h2>${title}</h2>
            <p>This Privacy Policy describes how Saison Lab collects, uses, and discloses your Personal Information when you visit or use the Service.</p>
            <h3>Information Collection</h3>
            <p>We do not collect any personal data through this application. All preferences (language settings) are stored locally on your device.</p>
            <h3>Cookies</h3>
            <p>Checking local storage for user preferences only.</p>
          </div>
        `;
                break;
            case 'disclaimer':
                title = i18n.t('footer.disclaimer');
                body = `
          <div class="legal-content">
            <h2>${title}</h2>
            <p>The information provided by Saison Lab on SUSHI LAB is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>
          </div>
        `;
                break;
            case 'contact':
                title = i18n.t('footer.contact');
                body = `
          <div class="legal-content">
            <h2>${title}</h2>
            <p>Contact us at: support@saison-lab.com</p>
          </div>
        `;
                break;
        }

        this.elements.modalContent.innerHTML = body;
        this.elements.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * モーダルを全て閉じる
     */
    closeModals() {
        this.elements.modalOverlay.classList.remove('active');
        this.elements.sushiModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * フレーズを読み上げ
     */
    async speakPhrase(text, onComplete) {
        if (!speech.isSpeechSupported()) {
            this.showToast(i18n.t('toast.speech.unsupported'), 'error');
            if (onComplete) onComplete();
            return;
        }

        try {
            await speech.speak(text, {
                onEnd: onComplete,
                onError: (e) => {
                    console.error(e);
                    this.showToast(i18n.t('toast.speech.error'), 'error');
                    if (onComplete) onComplete();
                }
            });
        } catch (e) {
            this.showToast(i18n.t('toast.speech.error'), 'error');
            if (onComplete) onComplete();
        }
    }

    /**
     * トースト通知を表示
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        this.elements.toastContainer.appendChild(toast);

        // 3秒後に消去
        setTimeout(() => {
            toast.classList.add('toast-exit');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }

    /**
     * エントリーアニメーション再生
     */
    playEntryAnimation() {
        // ページロード完了後に暖簾を開く
        setTimeout(() => {
            this.elements.norenOverlay.classList.add('open');

            // アニメーション完了後に要素を削除（パフォーマンスのため）
            setTimeout(() => {
                this.elements.norenOverlay.style.display = 'none';
            }, 1500);

            // ヒーローセクションのアニメーション開始
            document.querySelector('.hero-content').classList.add('fade-in');
        }, 500);
    }

    /**
     * Intersection Observerの設定（スクロールアニメーション用）
     */
    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 一度表示されたら監視を停止（ワンショットアニメーション）
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.refreshIntersectionObserver();
    }

    /**
     * 監視対象を更新
     */
    refreshIntersectionObserver() {
        if (!this.observer) return;

        document.querySelectorAll('.animate-on-scroll, .scroll-trigger, .slide-in-left, .slide-in-right').forEach(el => {
            this.observer.observe(el);
        });
    }
}

export default App;
