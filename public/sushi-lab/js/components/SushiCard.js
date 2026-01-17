/**
 * SUSHI LAB - Sushi Card Component
 * 
 * 【機能】
 * 寿司ネタデータからカードDOM要素を生成する
 */

import i18n from '../utils/i18n.js';

/**
 * 寿司カード要素を作成
 * Create sushi card element
 * @param {Object} sushi - 寿司データオブジェクト
 * @param {Function} onClick - クリック時のハンドラ
 * @returns {HTMLElement} カード要素
 */
export function createSushiCard(sushi, onClick) {
    const card = document.createElement('div');
    card.className = 'sushi-card card-hover-lift scroll-trigger scale-in';
    card.dataset.id = sushi.id;
    card.dataset.category = sushi.category;

    // 現在の言語を取得
    const lang = i18n.getCurrentLang();

    // 画像パス（プレースホルダー対応）
    // 実際の実装では assets/sushi/ に画像がある想定
    // ここでは画像のロードエラーをハンドリングしてプレースホルダーを表示
    const imagePath = `assets/sushi/${sushi.id}.webp`;

    // カテゴリ名を取得
    const categoryName = i18n.t(`filter.${sushi.category}`);

    card.innerHTML = `
    <div class="sushi-card-image">
      <img src="${imagePath}" alt="${sushi.name[lang]}" loading="lazy" onerror="this.src='data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22300%22 height%3D%22200%22 viewBox%3D%220 0 300 200%22%3E%3Crect width%3D%22300%22 height%3D%22200%22 fill%3D%22%23F5F5F5%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 font-family%3D%22sans-serif%22 font-size%3D%2224%22 text-anchor%3D%22middle%22 fill%3D%22%23BDBDBD%22%3E${sushi.id}%3C%2Ftext%3E%3C%2Fsvg%3E'">
      <span class="sushi-card-category">${categoryName}</span>
    </div>
    <div class="sushi-card-body">
      <h3 class="sushi-card-name">${sushi.name[lang]}</h3>
      <div class="sushi-card-name-en">${sushi.name.en}</div>
      <div class="sushi-card-pronunciation">/${sushi.pronunciation}/</div>
      <p class="sushi-card-description">${sushi.description[lang]}</p>
      
      <div class="sushi-card-taste">
        <div class="taste-bar">
          <span class="taste-bar-label" data-i18n="taste.fatty">${i18n.t('taste.fatty')}</span>
          <div class="taste-bar-track">
            <div class="taste-bar-fill" style="width: ${sushi.taste.fatty * 20}%"></div>
          </div>
        </div>
        <div class="taste-bar">
          <span class="taste-bar-label" data-i18n="taste.light">${i18n.t('taste.light')}</span>
          <div class="taste-bar-track">
            <div class="taste-bar-fill" style="width: ${sushi.taste.light * 20}%"></div>
          </div>
        </div>
        <div class="taste-bar">
          <span class="taste-bar-label" data-i18n="taste.sweet">${i18n.t('taste.sweet')}</span>
          <div class="taste-bar-track">
            <div class="taste-bar-fill" style="width: ${sushi.taste.sweet * 20}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

    if (onClick) {
        card.addEventListener('click', () => onClick(sushi));
    }

    return card;
}

/**
 * 詳細モーダルの内容を生成
 * Create content for detail modal
 * @param {Object} sushi - 寿司データ
 * @returns {string} HTML文字列
 */
export function createSushiDetailContent(sushi) {
    const lang = i18n.getCurrentLang();
    const imagePath = `assets/sushi/${sushi.id}.webp`;

    // 旬の情報を整形
    const seasons = sushi.season.map(s => i18n.t(`sushi.season.${s}`)).join('・');

    // 価格帯
    const price = i18n.t(`sushi.price.${sushi.priceRange}`);

    return `
    <div class="sushi-detail">
      <div class="sushi-detail-image">
        <img src="${imagePath}" alt="${sushi.name[lang]}" onerror="this.src='data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22800%22 height%3D%22450%22 viewBox%3D%220 0 800 450%22%3E%3Crect width%3D%22800%22 height%3D%22450%22 fill%3D%22%23F5F5F5%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 font-family%3D%22sans-serif%22 font-size%3D%2248%22 text-anchor%3D%22middle%22 fill%3D%22%23BDBDBD%22%3E${sushi.name[lang]}%3C%2Ftext%3E%3C%2Fsvg%3E'">
      </div>
      <div class="sushi-detail-body">
        <div class="sushi-detail-header">
          <h2 class="sushi-detail-name">${sushi.name[lang]}</h2>
          <div class="sushi-detail-name-en">${sushi.name.en}</div>
          <div class="sushi-detail-pronunciation">Pronunciation: /${sushi.pronunciation}/</div>
          
          <div class="sushi-detail-meta">
            <span class="sushi-detail-tag">
              <span class="icon">🌸</span>
              <span data-i18n="sushi.season">${i18n.t('sushi.season')}</span>: ${seasons}
            </span>
            <span class="sushi-detail-tag">
              <span class="icon">💰</span>
              <span data-i18n="sushi.price">${i18n.t('sushi.price')}</span>: ${price}
            </span>
          </div>
        </div>
        
        <p class="sushi-detail-description">${sushi.description[lang]}</p>
        
        <div class="sushi-detail-taste">
          <div class="taste-meter">
            <span class="taste-meter-label" data-i18n="taste.fatty">${i18n.t('taste.fatty')}</span>
            <span class="taste-meter-value">${sushi.taste.fatty}</span>
            <div class="taste-meter-bar">
              <div class="taste-meter-bar-fill" style="width: ${sushi.taste.fatty * 20}%"></div>
            </div>
          </div>
          <div class="taste-meter">
            <span class="taste-meter-label" data-i18n="taste.light">${i18n.t('taste.light')}</span>
            <span class="taste-meter-value">${sushi.taste.light}</span>
            <div class="taste-meter-bar">
              <div class="taste-meter-bar-fill" style="width: ${sushi.taste.light * 20}%"></div>
            </div>
          </div>
          <div class="taste-meter">
            <span class="taste-meter-label" data-i18n="taste.sweet">${i18n.t('taste.sweet')}</span>
            <span class="taste-meter-value">${sushi.taste.sweet}</span>
            <div class="taste-meter-bar">
              <div class="taste-meter-bar-fill" style="width: ${sushi.taste.sweet * 20}%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
