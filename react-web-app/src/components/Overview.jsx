import React from 'react';

const Overview = ({ t }) => {
    const stats = [
        { label: t.stats.total, value: '148', icon: 'description', color: 'text-blue-500' },
        { label: t.stats.streak, value: '12', icon: 'local_fire_department', color: 'text-orange-500' },
        { label: t.stats.mood, value: '😊', icon: 'face', color: 'text-green-500' },
        { label: t.stats.time, value: '15p', icon: 'timer', color: 'text-purple-500' },
    ];

    const recentItems = [
        { date: '23 May', title: 'Energized day', mood: '🤩', preview: 'Today I finished my class project...' },
        { date: '22 May', title: 'Exam anxiety', mood: '😕', preview: 'Feeling a bit pressured thinking about upcoming exams...' },
        { date: '21 May', title: 'Peaceful afternoon', mood: '😊', preview: 'Sat at a cafe alone and finished my favorite book...' },
    ];

    return (
        <section className="max-w-6xl mx-auto w-full px-8 py-10 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/5 dark:bg-primary/5 p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`material-symbols-outlined ${stat.color} opacity-80 group-hover:scale-110 transition-transform`}>{stat.icon}</span>
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-sm">more_horiz</span>
                        </div>
                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">{t.recent}</h3>
                        <button className="text-sm text-primary font-bold hover:underline italic">{t.viewAll}</button>
                    </div>
                    <div className="space-y-4">
                        {recentItems.map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/5 dark:bg-primary/5 border border-primary/5 hover:border-primary/20 transition-all cursor-pointer group">
                                <div className="size-12 rounded-xl bg-background-light dark:bg-background-dark flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                                    {item.mood}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold truncate">{item.title}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-1">{item.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6">{t.classification}</h3>
                    <div className="bg-white/5 dark:bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <div className="space-y-6">
                            {[
                                { label: t.positive, percent: 65, color: 'bg-green-500' },
                                { label: t.neutral, percent: 25, color: 'bg-blue-500' },
                                { label: t.attention, percent: 10, color: 'bg-orange-500' },
                            ].map((mood, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{mood.label}</span>
                                        <span className="text-xs font-bold text-slate-400">{mood.percent}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${mood.color} rounded-full`} style={{ width: `${mood.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-primary/5">
                            <p className="text-xs text-slate-500 leading-relaxed italic">
                                "{t.trendSummary}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
