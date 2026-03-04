import React from 'react';

const moods = [
    { emoji: '😢', label: 'Buồn' },
    { emoji: '😕', label: 'Bất an' },
    { emoji: '😊', label: 'Ổn', active: true },
    { emoji: '😁', label: 'Vui' },
    { emoji: '🤩', label: 'Tuyệt' },
];

const JournalEntry = ({ t }) => {
    const moods = [
        { emoji: '😢', label: t.moods[0] },
        { emoji: '😕', label: t.moods[1] },
        { emoji: '😊', label: t.moods[2], active: true },
        { emoji: '😁', label: t.moods[3] },
        { emoji: '🤩', label: t.moods[4] },
    ];

    return (
        <section className="max-w-4xl mx-auto w-full px-8 py-12 flex-1 flex flex-col">
            <div className="mb-10">
                <h3 className="text-lg font-medium mb-4 text-center">{t.question}</h3>
                <div className="flex justify-center gap-6">
                    {moods.map((mood, idx) => (
                        <button key={idx} className="group flex flex-col items-center gap-2">
                            <div className={`size-14 rounded-full flex items-center justify-center text-3xl transition-all border ${mood.active ? 'bg-primary/20 ring-2 ring-primary' : 'bg-primary/5 border-transparent hover:border-primary/30 group-hover:bg-primary/20'}`}>
                                {mood.emoji}
                            </div>
                            <span className={`text-xs font-medium ${mood.active ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}>{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 bg-white/5 dark:bg-primary/5 rounded-3xl p-8 border border-primary/10 shadow-sm relative group focus-within:ring-2 ring-primary/20 transition-all">
                <div className="absolute top-4 right-6 flex gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-2 py-1 rounded bg-background-light dark:bg-background-dark">{t.private}</span>
                </div>
                <textarea
                    className="w-full h-full bg-transparent border-none focus:ring-0 resize-none text-lg leading-relaxed placeholder:text-slate-500/50 outline-none"
                    placeholder={t.placeholder}
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
                    <span className="text-xs text-slate-500">{t.saveTime}</span>
                    <button className="px-8 py-2.5 rounded-full bg-primary/20 text-primary font-bold hover:bg-primary/30 transition-all border border-primary/20">
                        {t.finish}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default JournalEntry;
