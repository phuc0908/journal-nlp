import React from 'react';

const Trends = ({ t }) => {
    return (
        <section className="max-w-6xl mx-auto w-full px-8 py-10 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                <div className="lg:col-span-3 bg-white/5 dark:bg-primary/5 p-8 rounded-3xl border border-primary/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-1">{t.chartTitle}</h3>
                            <p className="text-sm text-slate-500">{t.chartSubtitle}</p>
                        </div>
                        <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-xl border border-primary/10">
                            {t.ranges.map((range, idx) => (
                                <button key={idx} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${idx === 1 ? 'bg-primary text-background-dark shadow-sm' : 'text-slate-500 hover:text-primary'}`}>
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-1 px-4 border-b border-primary/5 mb-4">
                        {[40, 60, 45, 80, 70, 90, 65, 55, 75, 85, 40, 60, 45, 80, 70, 90, 65, 55, 75, 85, 50, 65, 75, 80, 70, 95, 60, 40, 70, 85].map((val, idx) => (
                            <div
                                key={idx}
                                className={`w-full bg-primary/20 rounded-t-sm hover:bg-primary/60 transition-all cursor-crosshair group relative`}
                                style={{ height: `${val}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg">
                                    {val}% - Day {idx + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                        <span>1 May</span>
                        <span>15 May</span>
                        <span>30 May</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary/20 to-transparent p-6 rounded-3xl border border-primary/10 flex flex-col items-center text-center">
                        <div className="size-16 rounded-3xl bg-primary/20 flex items-center justify-center text-4xl mb-4 shadow-inner">
                            😊
                        </div>
                        <h4 className="font-bold text-primary mb-1">{t.dominantMood}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed italic">
                            {t.dominantText}
                        </p>
                    </div>

                    <div className="bg-white/5 dark:bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.patterns}</h4>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">wb_sunny</span>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{t.morningTask}</p>
                                <p className="text-xs text-slate-500">{t.morningDesc}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-purple-500 text-xl">event_busy</span>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{t.midWeekTask}</p>
                                <p className="text-xs text-slate-500">{t.midWeekDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { label: t.sleep, value: '0.82', desc: t.sleepDesc, icon: 'bedtime' },
                    { label: t.activity, value: '+15%', desc: t.activityDesc, icon: 'directions_run' },
                    { label: t.focus, value: '78%', desc: t.focusDesc, icon: 'center_focus_strong' },
                ].map((insight, idx) => (
                    <div key={idx} className="bg-white/5 dark:bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="material-symbols-outlined text-primary opacity-60">{insight.icon}</span>
                            <span className="text-2xl font-bold">{insight.value}</span>
                        </div>
                        <h5 className="font-bold text-sm mb-1">{insight.label}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{insight.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Trends;
