import React from 'react';

const Settings = ({ theme, setTheme, language, setLanguage, t, onLogout }) => {
    return (
        <section className="max-w-4xl mx-auto w-full px-8 py-10 flex-1 overflow-y-auto">
            <div className="space-y-10">
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">{t.personalization}</h3>
                    <div className="bg-white/5 dark:bg-primary/5 rounded-3xl border border-primary/10 overflow-hidden">
                        <div className="p-6 flex items-center justify-between border-b border-primary/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">palette</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{t.interface}</h4>
                                    <p className="text-xs text-slate-500">{t.interfaceDesc}</p>
                                </div>
                            </div>
                            <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-xl border border-primary/10">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${theme === 'light' ? 'bg-primary text-background-dark shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                                >
                                    {t.light}
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${theme === 'dark' ? 'bg-primary text-background-dark shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                                >
                                    {t.dark}
                                </button>
                            </div>
                        </div>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">translate</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{t.language}</h4>
                                    <p className="text-xs text-slate-500">{t.languageDesc}</p>
                                </div>
                            </div>
                            <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-xl border border-primary/10">
                                <button
                                    onClick={() => setLanguage('vi')}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${language === 'vi' ? 'bg-primary text-background-dark shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                                >
                                    Tiếng Việt
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${language === 'en' ? 'bg-primary text-background-dark shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                                >
                                    English
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">{t.security}</h3>
                    <div className="bg-white/5 dark:bg-primary/5 rounded-3xl border border-primary/10 overflow-hidden">
                        <div className="p-6 flex items-center justify-between border-b border-primary/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">lock</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{t.lock}</h4>
                                    <p className="text-xs text-slate-500">{t.lockDesc}</p>
                                </div>
                            </div>
                            <div className="size-6 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer group">
                                <div className="size-4 bg-white rounded-full absolute top-1 left-1 group-hover:left-3 transition-all"></div>
                            </div>
                        </div>
                        <div className="p-6 flex items-center justify-between border-b border-primary/5">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">cloud_sync</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{t.sync}</h4>
                                    <p className="text-xs text-slate-500">{t.syncDesc}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{t.active}</span>
                        </div>
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">file_download</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{t.export}</h4>
                                    <p className="text-xs text-slate-500">{t.exportDesc}</p>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-primary hover:underline">{t.download}</button>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">{t.system}</h3>
                    <div className="bg-white/5 dark:bg-primary/5 rounded-3xl border border-primary/10 overflow-hidden">
                        <button className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-colors border-b border-primary/5">
                            <div className="flex items-center gap-4 text-left">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">help</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{t.help}</h4>
                                    <p className="text-xs text-slate-500">{t.helpDesc}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full p-6 flex items-center justify-between hover:bg-red-500/5 transition-colors group"
                        >
                            <div className="flex items-center gap-4 text-left">
                                <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-500">logout</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-red-500 group-hover:text-red-400 transition-colors">{t.logout}</h4>
                                    <p className="text-xs text-red-500/50">{t.logoutDesc}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-red-500/50 group-hover:text-red-400 transition-colors">chevron_right</span>
                        </button>
                    </div>
                </section>

                <div className="text-center pb-10">
                    <p className="text-xs text-slate-500">{t.version}</p>
                    <p className="text-[10px] text-slate-500/50 mt-1 uppercase tracking-widest font-bold">{t.footer}</p>
                </div>
            </div>
        </section>
    );
};

export default Settings;
