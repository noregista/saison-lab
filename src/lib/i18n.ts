export const translations = {
    en: {
        // Header
        brand: "Saison Lab",
        otherTools: "Card Generator",

        // Main
        title: "Splitter",
        subtitle: "Split images for SNS posts",

        // Upload
        uploadTitle: "Drop your image here",
        uploadSubtitle: "or click to browse",
        uploadFormats: "Supports JPG, PNG, WEBP",

        // Mode selector
        modeLabel: "Split Mode",
        mode2x2: "2×2 Grid",
        mode1x4: "1×4 Vertical",

        // Preview
        previewTitle: "Preview",

        // Download
        downloadBtn: "Download ZIP",
        downloading: "Creating ZIP...",

        // How to use
        howToTitle: "How to Use",
        step1Title: "1. Upload",
        step1Desc: "Drag and drop your image or click to select a file",
        step2Title: "2. Choose Mode",
        step2Desc: "Select 2×2 grid or 1×4 vertical split",
        step3Title: "3. Download",
        step3Desc: "Click the button to download all 4 images as a ZIP file",

        // Footer
        backToPortal: "Back to Portal",
        followUs: "Follow us",
        copyright: "© 2024 Saison Lab. All rights reserved.",

        // Ad
        adLabel: "AD SPACE",
    },
    ja: {
        // Header
        brand: "Saison Lab",
        otherTools: "カード生成",

        // Main
        title: "Splitter",
        subtitle: "SNS投稿用の分割画像を生成",

        // Upload
        uploadTitle: "ここに画像をドロップ",
        uploadSubtitle: "またはクリックして選択",
        uploadFormats: "JPG, PNG, WEBP 対応",

        // Mode selector
        modeLabel: "分割モード",
        mode2x2: "田の字（2×2）",
        mode1x4: "縦4等分（1×4）",

        // Preview
        previewTitle: "プレビュー",

        // Download
        downloadBtn: "ZIPでダウンロード",
        downloading: "ZIP作成中...",

        // How to use
        howToTitle: "使い方",
        step1Title: "1. アップロード",
        step1Desc: "画像をドラッグ＆ドロップするか、クリックして選択",
        step2Title: "2. モードを選択",
        step2Desc: "田の字（2×2）か縦4等分（1×4）を選択",
        step3Title: "3. ダウンロード",
        step3Desc: "ボタンをクリックして4枚の画像をZIPでダウンロード",

        // Footer
        backToPortal: "ポータルに戻る",
        followUs: "フォローする",
        copyright: "© 2024 Saison Lab. All rights reserved.",

        // Ad
        adLabel: "広告枠",
    },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
