import React, { useState } from 'react';

const Login = ({ t, setIsLoggedIn }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
        const body = isRegister
            ? { username, nickname, password }
            : { username, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Có lỗi xảy ra');
            }

            if (isRegister) {
                alert(t.registerSuccess || 'Đăng ký thành công!');
                setIsRegister(false);
            } else {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsLoggedIn(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 size-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 size-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-md p-8 relative">
                <div className="bg-white/5 dark:bg-primary/5 backdrop-blur-2xl rounded-[40px] border border-primary/10 p-10 shadow-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="size-16 bg-primary rounded-2xl flex items-center justify-center text-background-dark mx-auto mb-6 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">
                            {isRegister ? t.registerTitle : t.loginTitle}
                        </h2>
                        <p className="text-slate-500 text-sm italic">AI Journal Service</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl animate-in fade-in slide-in-from-top-1 duration-200">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                                {t.username}
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-background-light dark:bg-background-dark border border-primary/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/40 focus:ring-4 ring-primary/5 transition-all text-sm"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        {isRegister && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                                    {t.nickname}
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">face</span>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        className="w-full bg-background-light dark:bg-background-dark border border-primary/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/40 focus:ring-4 ring-primary/5 transition-all text-sm"
                                        placeholder="Minh Anh"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                                {t.password}
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-background-light dark:bg-background-dark border border-primary/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/40 focus:ring-4 ring-primary/5 transition-all text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-background-dark font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="size-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {isRegister ? t.registerBtn : t.loginBtn}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Toggle */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-xs font-bold text-primary hover:underline transition-all"
                        >
                            {isRegister ? t.hasAccount : t.noAccount}
                        </button>
                    </div>

                    {/* Subtle Decoration */}
                    <div className="absolute -bottom-10 -right-10 size-40 bg-primary/5 rounded-full blur-2xl"></div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                        AI Journal © 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
