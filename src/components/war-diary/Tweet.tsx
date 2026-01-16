'use client';

interface TweetProps {
    post: {
        id: number;
        user: string;
        handle: string;
        content: { jp: string; en: string };
        time: string;
        type: 'official' | 'citizen' | 'rumor' | 'emergency';
        likes: number;
        retweets: number;
    };
    lang: 'jp' | 'en';
}

const typeStyles = {
    official: 'border-l-4 border-blue-500 bg-blue-500/10',
    citizen: 'border-l-4 border-gray-600 bg-gray-800/50',
    rumor: 'border-l-4 border-yellow-500 bg-yellow-500/10',
    emergency: 'border-l-4 border-red-500 bg-red-500/10 animate-pulse',
};

const typeBadge = {
    official: { jp: '公式', en: 'OFFICIAL', color: 'bg-blue-600' },
    citizen: { jp: '一般', en: 'CITIZEN', color: 'bg-gray-600' },
    rumor: { jp: '未確認', en: 'UNVERIFIED', color: 'bg-yellow-600' },
    emergency: { jp: '緊急', en: 'EMERGENCY', color: 'bg-red-600' },
};

export function Tweet({ post, lang }: TweetProps) {
    const badge = typeBadge[post.type];

    return (
        <article className={`p-4 ${typeStyles[post.type]} hover:bg-gray-900/50 transition-colors`}>
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
                    {post.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white">{post.user}</span>
                        <span className="text-gray-500">@{post.handle}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 text-sm">{post.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${badge.color}`}>
                            {badge[lang]}
                        </span>
                    </div>
                    <p className="mt-2 text-gray-100 whitespace-pre-wrap">{post.content[lang]}</p>
                    <div className="flex items-center gap-6 mt-3 text-gray-500 text-sm">
                        <span>♡ {post.likes.toLocaleString()}</span>
                        <span>🔁 {post.retweets.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
