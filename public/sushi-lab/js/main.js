/**
 * SUSHI LAB - Entry Point
 * 
 * 【機能】
 * アプリケーションの初期化
 * Service Workerの登録
 */

import App from './app.js';

// DOMロード後に開始
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sushi-lab/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
