import React from 'react';

const Insights = ({ t, user, streak = 0 }) => {

    // Hiển thị 14 ô: streak ngày gần nhất tô màu, còn lại xám
    const totalCells = 14;
    const filledCells = Math.min(streak, totalCells);

    return (
        <aside className="w-80 border-l border-primary/10 bg-background-light dark:bg-background-dark p-6 hidden xl:block overflow-y-auto h-screen">
            <h3 className="font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">insights</span>
                {t.title}
            </h3>
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/20 to-transparent p-5 rounded-2xl border border-primary/10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                        <span className="text-sm font-bold text-primary">{t.adviceHeader}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{t.advice}"
                    </p>
                </div>
                <div className="bg-background-light dark:bg-white/5 p-5 rounded-2xl border border-primary/5">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold">{t.streak}</span>
                        <span className="text-primary font-bold">
                            {`${streak} ${t.streakUnit || 'ngày'}`}
                        </span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {[...Array(totalCells)].map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-sm ${i < filledCells ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                            />
                        ))}
                    </div>
                    <p className="text-[10px] mt-3 text-slate-500 text-center uppercase tracking-widest font-bold">{t.month}</p>
                </div>
                <div className="p-5 rounded-2xl border border-dashed border-primary/30">
                    <h4 className="text-xs font-bold text-slate-500 mb-2">{t.promptHeader}</h4>
                    <p className="text-sm font-medium">{t.prompt}</p>
                    <button className="mt-3 text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                        {t.response} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                </div>
                <div className="relative h-32 rounded-2xl overflow-hidden bg-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-primary opacity-50">spa</span>
                    </div>
                    <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(17, 196, 212, 0.1) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                </div>
            </div>
        </aside>
    );
};

export default Insights;
