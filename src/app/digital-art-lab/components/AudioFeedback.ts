/**
 * オーディオフィードバック
 * 
 * Web Audio APIを使用して、タッチ/クリック時に
 * 音響フィードバックを提供するモジュール。
 * 
 * 設計意図:
 * - デフォルトはミュート（ユーザーが有効化する設計）
 * - Y座標で音程、X座標でパンニングを制御
 * - モバイルでは振動API（navigator.vibrate）も併用
 */

// ============================================================
// オーディオ設定
// ============================================================
export interface AudioConfig {
    /** ベース周波数（Hz） */
    baseFrequency: number;
    /** 周波数範囲（Hz） */
    frequencyRange: number;
    /** マスターボリューム（0-1） */
    volume: number;
    /** アタック時間（秒） */
    attack: number;
    /** リリース時間（秒） */
    release: number;
    /** 振動を有効にするか */
    enableVibration: boolean;
}

// ============================================================
// デフォルト設定
// ============================================================
export const DEFAULT_AUDIO_CONFIG: AudioConfig = {
    baseFrequency: 220,      // A3
    frequencyRange: 660,     // 220Hz〜880Hzの範囲
    volume: 0.3,             // 控えめな音量
    attack: 0.01,            // 素早いアタック
    release: 0.3,            // 適度なリリース
    enableVibration: true,   // 振動を有効
};

// ============================================================
// オーディオフィードバッククラス
// ============================================================
export class AudioFeedback {
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private config: AudioConfig;
    private enabled: boolean = false;
    private initialized: boolean = false;

    constructor(config: Partial<AudioConfig> = {}) {
        this.config = { ...DEFAULT_AUDIO_CONFIG, ...config };
    }

    /**
     * オーディオコンテキストを初期化
     * ユーザーインタラクション後に呼び出す必要がある
     */
    public async init(): Promise<void> {
        if (this.initialized) return;

        try {
            // AudioContextを作成
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            this.context = new AudioContextClass();

            // マスターゲインノードを作成
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = this.config.volume;
            this.masterGain.connect(this.context.destination);

            // サスペンド状態ならレジュームを試みる
            if (this.context.state === 'suspended') {
                await this.context.resume();
            }

            this.initialized = true;
        } catch (error) {
            console.warn('Audio initialization failed:', error);
        }
    }

    /**
     * オーディオを有効/無効にする
     */
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (this.masterGain) {
            this.masterGain.gain.value = enabled ? this.config.volume : 0;
        }
    }

    /**
     * オーディオが有効かどうか
     */
    public isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * トリガー音を再生
     * 
     * @param normX - X座標（0-1）→ パンニング
     * @param normY - Y座標（0-1）→ 音程
     */
    public trigger(normX: number, normY: number): void {
        if (!this.enabled || !this.context || !this.masterGain || !this.initialized) {
            return;
        }

        const now = this.context.currentTime;

        // オシレーターを作成
        const oscillator = this.context.createOscillator();
        oscillator.type = 'sine';

        // Y座標に応じて周波数を設定
        // 上が高音、下が低音
        const frequency = this.config.baseFrequency + normY * this.config.frequencyRange;
        oscillator.frequency.value = frequency;

        // エンベロープ用ゲインノードを作成
        const envelope = this.context.createGain();
        envelope.gain.value = 0;
        envelope.gain.setValueAtTime(0, now);
        envelope.gain.linearRampToValueAtTime(1, now + this.config.attack);
        envelope.gain.exponentialRampToValueAtTime(0.01, now + this.config.attack + this.config.release);

        // パンナーノードを作成（ステレオ効果）
        const panner = this.context.createStereoPanner();
        panner.pan.value = (normX - 0.5) * 2; // -1〜1の範囲

        // ノードを接続
        oscillator.connect(envelope);
        envelope.connect(panner);
        panner.connect(this.masterGain);

        // 再生
        oscillator.start(now);
        oscillator.stop(now + this.config.attack + this.config.release + 0.1);

        // クリーンアップ
        oscillator.onended = () => {
            oscillator.disconnect();
            envelope.disconnect();
            panner.disconnect();
        };

        // 振動フィードバック（モバイル）
        this.vibrate();
    }

    /**
     * 持続音を開始
     * ドラッグ中に使用
     */
    public startContinuous(normX: number, normY: number): OscillatorNode | null {
        if (!this.enabled || !this.context || !this.masterGain || !this.initialized) {
            return null;
        }

        const oscillator = this.context.createOscillator();
        oscillator.type = 'sine';

        const frequency = this.config.baseFrequency + normY * this.config.frequencyRange;
        oscillator.frequency.value = frequency;

        const envelope = this.context.createGain();
        envelope.gain.value = 0;
        envelope.gain.linearRampToValueAtTime(0.5, this.context.currentTime + this.config.attack);

        const panner = this.context.createStereoPanner();
        panner.pan.value = (normX - 0.5) * 2;

        oscillator.connect(envelope);
        envelope.connect(panner);
        panner.connect(this.masterGain);

        oscillator.start();

        // oscillatorに追加情報を保持（更新用）
        (oscillator as OscillatorNode & { _envelope?: GainNode; _panner?: StereoPannerNode }).
            _envelope = envelope;
        (oscillator as OscillatorNode & { _panner?: StereoPannerNode })._panner = panner;

        return oscillator;
    }

    /**
     * 持続音を更新
     */
    public updateContinuous(oscillator: OscillatorNode, normX: number, normY: number): void {
        if (!oscillator || !this.context) return;

        const frequency = this.config.baseFrequency + normY * this.config.frequencyRange;
        oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);

        const extended = oscillator as OscillatorNode & { _panner?: StereoPannerNode };
        if (extended._panner) {
            extended._panner.pan.setValueAtTime((normX - 0.5) * 2, this.context.currentTime);
        }
    }

    /**
     * 持続音を停止
     */
    public stopContinuous(oscillator: OscillatorNode): void {
        if (!oscillator || !this.context) return;

        const extended = oscillator as OscillatorNode & { _envelope?: GainNode };
        if (extended._envelope) {
            extended._envelope.gain.exponentialRampToValueAtTime(
                0.01,
                this.context.currentTime + this.config.release
            );
        }

        oscillator.stop(this.context.currentTime + this.config.release + 0.1);
    }

    /**
     * 振動フィードバック
     */
    private vibrate(): void {
        if (!this.config.enableVibration) return;

        if ('vibrate' in navigator) {
            navigator.vibrate(10); // 10ミリ秒の短い振動
        }
    }

    /**
     * ボリュームを設定
     */
    public setVolume(volume: number): void {
        this.config.volume = Math.max(0, Math.min(1, volume));
        if (this.masterGain && this.enabled) {
            this.masterGain.gain.value = this.config.volume;
        }
    }

    /**
     * リソースを解放
     */
    public dispose(): void {
        if (this.context) {
            this.context.close();
            this.context = null;
        }
        this.masterGain = null;
        this.initialized = false;
        this.enabled = false;
    }
}
