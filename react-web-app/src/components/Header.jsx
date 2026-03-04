import React from 'react';

const Header = ({ activeView, t }) => {
    const getHeaderContent = () => {
        switch (activeView) {
            case 'journal':
                return { title: t.journalTitle, subtitle: t.journalSubtitle };
            case 'overview':
                return { title: t.overviewTitle, subtitle: t.overviewSubtitle };
            case 'trends':
                return { title: t.trendsTitle, subtitle: t.trendsSubtitle };
            case 'vault':
                return { title: t.vaultTitle, subtitle: t.vaultSubtitle };
            case 'settings':
                return { title: t.settingsTitle, subtitle: t.settingsSubtitle };
            default:
                return { title: t.defaultTitle, subtitle: t.defaultSubtitle };
        }
    };

    const { title, subtitle } = getHeaderContent();

    return (
        <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-4 border-b border-primary/5 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background-dark font-bold text-sm hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                    {t.aiAnalysis}
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
