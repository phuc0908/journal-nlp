import React, { useState } from 'react';

const JournalEntry = ({ t, user }) => {
    const [content, setContent] = useState('');
    const [activeMoodIdx, setActiveMoodIdx] = useState(2); // Mặc định là 'Ổn'
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });


    const moodData = [
        { emoji: '😢', label: t.moods[0] },
        { emoji: '😕', label: t.moods[1] },
        { emoji: '😊', label: t.moods[2] },
        { emoji: '😁', label: t.moods[3] },
        { emoji: '🤩', label: t.moods[4] },
    ];

    const handleSave = async () => {
        if (!content.trim()) return;

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/journals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content,
                    mood: moodData[activeMoodIdx]
                })
            });

            if (!response.ok) throw new Error('Không thể lưu nhật ký');


            setMessage({ type: 'success', text: 'Đã lưu nhật ký thành công!' });
            setContent('');
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto w-full px-8 py-12 flex-1 flex flex-col">
            <div className="mb-10">
                <h3 className="text-lg font-medium mb-4 text-center">{t.question}</h3>
                <div className="flex justify-center gap-6">
                    {moodData.map((mood, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveMoodIdx(idx)}
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className={`size-14 rounded-full flex items-center justify-center text-3xl transition-all border ${activeMoodIdx === idx ? 'bg-primary/20 ring-2 ring-primary' : 'bg-primary/5 border-transparent hover:border-primary/30 group-hover:bg-primary/20'}`}>
                                {mood.emoji}
                            </div>
                            <span className={`text-xs font-medium ${activeMoodIdx === idx ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {message.text && (
                <div className={`mb-4 p-3 rounded-xl text-center text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex-1 bg-white/5 dark:bg-primary/5 rounded-3xl p-8 border border-primary/10 shadow-sm relative group focus-within:ring-2 ring-primary/20 transition-all">
                <div className="absolute top-4 right-6 flex gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-2 py-1 rounded bg-background-light dark:bg-background-dark">{t.private}</span>
                </div>
                <textarea
                    className="w-full h-full bg-transparent border-none focus:ring-0 resize-none text-lg leading-relaxed placeholder:text-slate-500/50 outline-none"
                    placeholder={t.placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">image</span>
                        {t.addImage}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                        {t.record}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">sell</span>
                        {t.tag}
                    </button>
                </div>
                <div className="flex items-center gap-4">

                    <button
                        onClick={handleSave}
                        disabled={loading || !content.trim()}
                        className={`px-8 py-2.5 rounded-full bg-primary/20 text-primary font-bold hover:bg-primary/30 transition-all border border-primary/20 ${(loading || !content.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {t.finish}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default JournalEntry;
