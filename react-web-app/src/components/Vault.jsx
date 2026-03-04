import React from 'react';

const Vault = ({ t }) => {
    const archives = [
        { month: 'May, 2024', count: 24, icon: 'folder_open', color: 'text-primary' },
        { month: 'April, 2024', count: 30, icon: 'folder', color: 'text-slate-400' },
        { month: 'March, 2024', count: 28, icon: 'folder', color: 'text-slate-400' },
        { month: 'February, 2024', count: 15, icon: 'folder', color: 'text-slate-400' },
        { month: 'January, 2024', count: 31, icon: 'folder', color: 'text-slate-400' },
        { month: 'December, 2023', count: 20, icon: 'folder', color: 'text-slate-400' },
    ];

    return (
        <section className="max-w-6xl mx-auto w-full px-8 py-10 flex-1 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 dark:bg-primary/5 border border-primary/10 focus:border-primary/40 focus:ring-4 ring-primary/10 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 dark:bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        {t.filterYear}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 dark:bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
                        {t.lockSettings}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {archives.map((item, idx) => (
                    <div key={idx} className="group p-6 rounded-3xl bg-white/5 dark:bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <span className={`material-symbols-outlined text-4xl ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-background-light dark:bg-background-dark border border-primary/5 uppercase">
                                {item.count} {t.entries}
                            </span>
                        </div>
                        <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{item.month}</h4>
                        <p className="text-xs text-slate-500">{t.viewDetail}</p>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-gradient-to-tr from-primary/10 to-transparent p-10 rounded-3xl border border-dashed border-primary/20 flex flex-col items-center text-center">
                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary animate-pulse">lock</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t.encryptedHeader}</h3>
                <p className="max-w-md text-sm text-slate-500 leading-relaxed mb-6">
                    {t.encryptedDesc}
                </p>
                <button className="px-8 py-3 rounded-full bg-primary text-background-dark font-bold hover:opacity-90 transition-opacity">
                    {t.backup}
                </button>
            </div>
        </section>
    );
};

export default Vault;
