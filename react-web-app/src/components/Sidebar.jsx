import React from 'react';

const Sidebar = ({ activeView, setActiveView, t }) => {
    const navItems = [
        { id: 'journal', label: t.journal, icon: 'edit_note' },
        { id: 'overview', label: t.overview, icon: 'grid_view' },
        { id: 'trends', label: t.trends, icon: 'analytics' },
        { id: 'vault', label: t.vault, icon: 'lock' },
    ];

    return (
        <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark flex flex-col h-screen">
            <div className="p-6 flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-background-dark">
                    <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight">{t.title}</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeView === item.id ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="p-6 border-t border-primary/10">
                <div className="bg-primary/5 rounded-xl p-4">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{t.weekHeader}</p>
                    <div className="flex justify-between items-end h-16 gap-1">
                        <div className="w-full bg-primary/20 rounded-t-sm h-[40%]" title="Mon"></div>
                        <div className="w-full bg-primary/20 rounded-t-sm h-[60%]" title="Tue"></div>
                        <div className="w-full bg-primary/40 rounded-t-sm h-[85%]" title="Wed"></div>
                        <div className="w-full bg-primary/20 rounded-t-sm h-[30%]" title="Thu"></div>
                        <div className="w-full bg-primary/60 rounded-t-sm h-[70%]" title="Fri"></div>
                        <div className="w-full bg-primary rounded-t-sm h-[95%]" title="Sat"></div>
                        <div className="w-full bg-primary/10 rounded-t-sm h-[10%]" title="Sun"></div>
                    </div>
                    <p className="text-[10px] mt-2 text-slate-500 dark:text-slate-400">{t.insightText}</p>
                </div>
            </div>
            <div className="p-4 flex items-center gap-3 mt-auto">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                    <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsnLX2ECEa2hVCHz98BhH5nR5-K4vCjGrXOdHMCQ1Z-Q5K-zj2o49V6_3ol7AZIFfnYd7jSuzujVvQK0bEFrOlNiNnxR1f6cd0aaV0yQ5g7V-1jaBOB8IC8W2F0_mnO6SqAIgGS4lGR8VImiL1cRmEjMa3I8gjeXwGM_DuXFBNd_U0yNLYOOazeBwuzXSTGXDyThFeFvNMiYIy1EZYeTPVXOAkNgNHkeQPqGxdPpX9exmOQHH9edbSudbJQSINpaJ-jTtKSodWnZHo" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{t.username}</p>
                    <p className="text-xs text-slate-500">{t.userRole}</p>
                </div>
                <button
                    onClick={() => setActiveView('settings')}
                    className={`material-symbols-outlined transition-colors ${activeView === 'settings' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                >
                    settings
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
