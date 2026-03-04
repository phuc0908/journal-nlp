import React, { useState, useEffect } from 'react';

const Vault = ({ t }) => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/journals', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Không thể tải nhật ký');
                const data = await response.json();
                setJournals(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJournals();
    }, []);

    const filteredJournals = journals.filter(j =>
        j.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="max-w-6xl mx-auto w-full px-8 py-10 flex-1 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 dark:bg-primary/5 border border-primary/10 focus:border-primary/40 focus:ring-4 ring-primary/10 outline-none transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : filteredJournals.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    <span className="material-symbols-outlined text-6xl mb-4 block opacity-20">folder_open</span>
                    {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Bạn chưa có nhật ký nào.'}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredJournals.map((item, idx) => (
                        <div key={item._id || idx} className="group p-6 rounded-3xl bg-white/5 dark:bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-3xl group-hover:scale-110 transition-transform">{item.mood?.emoji || '😊'}</span>
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-background-light dark:bg-background-dark border border-primary/5 uppercase">
                                    {new Date(item.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-sm line-clamp-4 flex-1 mb-4 text-slate-300 group-hover:text-white transition-colors">
                                {item.content}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/5">
                                <span className="text-[10px] font-bold text-primary uppercase">{item.mood?.label || 'Ổn'}</span>
                                <span className="material-symbols-outlined text-slate-500 text-sm">visibility</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
