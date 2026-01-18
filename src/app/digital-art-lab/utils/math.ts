/**
 * ベクトル演算・物理計算ユーティリティ
 * 
 * パーティクルシステムと流体シミュレーションで使用する
 * 数学的な計算関数を提供します。
 */

// ============================================================
// 2Dベクトル型定義
// パーティクルの位置・速度を表現するための基本型
// ============================================================
export interface Vector2D {
  x: number;
  y: number;
}

// ============================================================
// ベクトル演算
// ベクトルの加算・減算・スカラー乗算などの基本演算
// ============================================================

/**
 * ベクトルの加算
 * 2つのベクトルを足し合わせる
 */
export function add(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * ベクトルの減算
 * ベクトルaからベクトルbを引く
 */
export function subtract(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * スカラー乗算
 * ベクトルにスカラー値を掛ける
 */
export function scale(v: Vector2D, scalar: number): Vector2D {
  return { x: v.x * scalar, y: v.y * scalar };
}

/**
 * ベクトルの大きさ（長さ）を計算
 * ピタゴラスの定理: |v| = √(x² + y²)
 */
export function magnitude(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * ベクトルの正規化
 * 長さを1に変換（方向のみを保持）
 */
export function normalize(v: Vector2D): Vector2D {
  const mag = magnitude(v);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

/**
 * 2点間の距離を計算
 */
export function distance(a: Vector2D, b: Vector2D): number {
  return magnitude(subtract(a, b));
}

/**
 * 内積（ドット積）
 * 2つのベクトルの類似度を計算
 * 結果が正なら同じ方向、負なら逆方向
 */
export function dot(a: Vector2D, b: Vector2D): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * 線形補間 (lerp)
 * tが0のときaを、1のときbを返す
 * 滑らかな遷移アニメーションに使用
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * 2Dベクトルの線形補間
 */
export function lerpVector(a: Vector2D, b: Vector2D, t: number): Vector2D {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  };
}

// ============================================================
// 範囲制限・マッピング
// 値を特定の範囲内に収める関数群
// ============================================================

/**
 * 値を指定範囲内に制限
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * 値を0〜1の範囲に正規化
 */
export function normalize01(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
}

/**
 * 値を別の範囲にマッピング
 * 例: map(0.5, 0, 1, 100, 200) → 150
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = normalize01(value, inMin, inMax);
  return lerp(outMin, outMax, t);
}

// ============================================================
// ランダム生成
// パーティクル生成時のランダム値生成に使用
// ============================================================

/**
 * 指定範囲内のランダムな数値を生成
 */
export function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * ランダムな2Dベクトルを生成
 * 指定範囲内のx, y座標を持つ
 */
export function randomVector(
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number
): Vector2D {
  return {
    x: random(xMin, xMax),
    y: random(yMin, yMax),
  };
}

/**
 * ランダムな方向の単位ベクトルを生成
 * 円周上の一点を指すベクトル
 */
export function randomDirection(): Vector2D {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

// ============================================================
// 色変換
// HSLからRGBへの変換など、色関連の計算
// ============================================================

/**
 * HSLからRGBへ変換
 * h: 色相 (0-360)
 * s: 彩度 (0-100)
 * l: 輝度 (0-100)
 * 
 * 理由: HSLは色相のシフトが容易で、
 * パーティクルの虹色エフェクトに最適
 */
export function hslToRgb(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  const rFinal = Math.round((r + m) * 255);
  const gFinal = Math.round((g + m) * 255);
  const bFinal = Math.round((b + m) * 255);

  return `rgb(${rFinal}, ${gFinal}, ${bFinal})`;
}

/**
 * HSLAからRGBA文字列を生成
 * a: 透明度 (0-1)
 */
export function hslaToRgba(h: number, s: number, l: number, a: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  const rFinal = Math.round((r + m) * 255);
  const gFinal = Math.round((g + m) * 255);
  const bFinal = Math.round((b + m) * 255);

  return `rgba(${rFinal}, ${gFinal}, ${bFinal}, ${a})`;
}

// ============================================================
// イージング関数
// アニメーションの滑らかさを制御
// ============================================================

/**
 * イーズアウト（減速）
 * 終わりに向かって遅くなる
 * パーティクルの減衰に使用
 */
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * イーズイン（加速）
 * 最初は遅く、徐々に速くなる
 */
export function easeInQuad(t: number): number {
  return t * t;
}

/**
 * イーズインアウト（加速→減速）
 * 滑らかな開始と終了
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * イーズアウトキュービック（より強い減速）
 * 流体のような自然な動きに使用
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
