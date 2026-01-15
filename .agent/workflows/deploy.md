---
description: 開発からデプロイまでの標準ワークフロー
---

# 開発フロー

## ブランチ構成
- `main` - 本番環境（GitHub Pagesに自動デプロイ）
- `dev` - 開発用ブランチ（レビュー前の作業用）

## 標準ワークフロー

### 1. 開発作業
// turbo
```bash
# devブランチで作業（既にdevにいる場合はスキップ）
git checkout dev
```

### 2. ローカル確認
// turbo
```bash
# 開発サーバー起動
npm run dev
```
→ http://localhost:3000 で確認

### 3. コミット
// turbo
```bash
git add .
git commit -m "変更内容の説明"
git push origin dev
```

### 4. ユーザー確認依頼
- 変更内容をユーザーに報告
- ローカルで `npm run dev` を実行して確認してもらう
- **本番反映の許可を得る**

### 5. 本番反映（ユーザー承認後のみ）
```bash
git checkout main
git merge dev
git push origin main
git checkout dev
```

## 注意事項
- `main`への直接プッシュは原則禁止
- 必ずユーザー確認後に本番反映
- ビルドエラーがないことを確認してからコミット

// turbo-all
