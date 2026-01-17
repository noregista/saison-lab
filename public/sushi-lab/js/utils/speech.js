/**
 * SUSHI LAB - 音声合成ユーティリティ
 * 
 * 【機能】
 * Web Speech APIを使用した日本語テキストの音声読み上げ
 */

// 音声合成の状態
// Speech synthesis state
let isSpeaking = false;
let currentUtterance = null;

/**
 * 音声合成が利用可能か確認
 * Check if speech synthesis is available
 * @returns {boolean}
 */
export function isSpeechSupported() {
    return 'speechSynthesis' in window;
}

/**
 * 日本語ボイスを取得
 * Get Japanese voice
 * @returns {SpeechSynthesisVoice|null}
 */
function getJapaneseVoice() {
    const voices = window.speechSynthesis.getVoices();

    // 日本語ボイスを優先度順に検索
    // Search for Japanese voice in priority order
    const jaVoice = voices.find(voice =>
        voice.lang === 'ja-JP' ||
        voice.lang === 'ja' ||
        voice.lang.startsWith('ja-')
    );

    return jaVoice || null;
}

/**
 * テキストを音声で読み上げ
 * Speak text using speech synthesis
 * @param {string} text - 読み上げるテキスト
 * @param {Object} options - オプション
 * @returns {Promise<void>}
 */
export function speak(text, options = {}) {
    return new Promise((resolve, reject) => {
        // 音声合成が非対応の場合
        // If speech synthesis is not supported
        if (!isSpeechSupported()) {
            reject(new Error('Speech synthesis is not supported'));
            return;
        }

        // 既に発話中の場合はキャンセル
        // Cancel if already speaking
        if (isSpeaking) {
            stop();
        }

        // 発話オブジェクトを作成
        // Create utterance object
        const utterance = new SpeechSynthesisUtterance(text);
        currentUtterance = utterance;

        // オプションを設定
        // Set options
        utterance.lang = options.lang || 'ja-JP';
        utterance.rate = options.rate || 0.9; // やや遅め for clarity
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        // 日本語ボイスを設定（利用可能な場合）
        // Set Japanese voice if available
        const japaneseVoice = getJapaneseVoice();
        if (japaneseVoice) {
            utterance.voice = japaneseVoice;
        }

        // イベントハンドラを設定
        // Set event handlers
        utterance.onstart = () => {
            isSpeaking = true;
            if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
            isSpeaking = false;
            currentUtterance = null;
            if (options.onEnd) options.onEnd();
            resolve();
        };

        utterance.onerror = (event) => {
            isSpeaking = false;
            currentUtterance = null;
            if (options.onError) options.onError(event);
            reject(new Error(event.error));
        };

        // 発話を開始
        // Start speaking
        window.speechSynthesis.speak(utterance);
    });
}

/**
 * 音声を停止
 * Stop speaking
 */
export function stop() {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        currentUtterance = null;
    }
}

/**
 * 現在発話中か確認
 * Check if currently speaking
 * @returns {boolean}
 */
export function getIsSpeaking() {
    return isSpeaking;
}

/**
 * ボイスリストを取得（デバッグ用）
 * Get voice list (for debugging)
 * @returns {Promise<SpeechSynthesisVoice[]>}
 */
export function getVoices() {
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();

        if (voices.length > 0) {
            resolve(voices);
            return;
        }

        // voiceschangedイベントを待つ
        // Wait for voiceschanged event
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            resolve(voices);
        };
    });
}

/**
 * 音声機能を初期化
 * Initialize speech module
 */
export function initSpeech() {
    // ボイスリストを事前ロード
    // Preload voice list
    if (isSpeechSupported()) {
        getVoices();
    }
}

export default { speak, stop, isSpeechSupported, getIsSpeaking, initSpeech };
