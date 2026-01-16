'use client';

interface PostProps {
    post: {
        id: number;
        author: string;
        role: string;
        content: { jp: string; en: string };
        time: string;
        type: 'official' | 'rumor' | 'citizen' | 'emergency';
        appare: number; // いいね→天晴
        kairanban: number; // リポスト→回覧板
    };
    lang: 'jp' | 'en';
}

const typeStyles = {
    official: 'border-l-4 border-amber-800 bg-amber-100/50',
    citizen: 'border-l-4 border-amber-600 bg-amber-50/50',
    rumor: 'border-l-4 border-orange-500 bg-orange-50/50',
    emergency: 'border-l-4 border-red-800 bg-red-100/50',
};

const typeBadge = {
    official: { jp: '御触書', en: 'OFFICIAL', color: 'bg-amber-800 text-white' },
    citizen: { jp: '町人', en: 'CITIZEN', color: 'bg-amber-600 text-white' },
    rumor: { jp: '風聞', en: 'RUMOR', color: 'bg-orange-600 text-white' },
    emergency: { jp: '急報', en: 'URGENT', color: 'bg-red-800 text-white' },
};

const labels = {
    jp: { appare: '天晴', kairanban: '回覧板' },
    en: { appare: 'Praise', kairanban: 'Share' },
};

export function Post({ post, lang }: PostProps) {
    const badge = typeBadge[post.type];
    const l = labels[lang];

    return (
        <article
            className={`p-5 ${typeStyles[post.type]} mb-4 rounded shadow-sm`}
            style={{ fontFamily: 'serif' }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="w-12 h-12 rounded-full border-2 border-amber-800 flex items-center justify-center text-lg font-bold text-amber-900"
                    style={{ backgroundColor: '#e8d5b0' }}
                >
                    {post.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="font-bold text-amber-900">{post.author}</span>
                        <span className="text-amber-700 text-sm">（{post.role}）</span>
                        <span className="text-amber-600 text-sm">・{post.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${badge.color}`}>
                            {badge[lang]}
                        </span>
                    </div>
                    <p className="text-amber-900 whitespace-pre-wrap leading-relaxed">
                        {post.content[lang]}
                    </p>
                    <div className="flex items-center gap-6 mt-3 text-amber-700 text-sm">
                        <span>☆ {l.appare} {post.appare.toLocaleString()}</span>
                        <span>📜 {l.kairanban} {post.kairanban.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
