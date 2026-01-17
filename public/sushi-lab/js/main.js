/**
 * SUSHI LAB - Entry Point
 * 
 * 【機能】
 * アプリケーションの初期化
 * Service Workerの登録
 */

import App from './app.js';
import { RegisterSW } from 'virtual:pwa-register';

// DOMロード後に開始
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// PWA Service Worker Registration
// Vite PWA プラグインを使用する場合は 'virtual:pwa-register' が使えるが、
// ここでは手動登録のコードも記載しておく（プラグインなしでも動くように）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
