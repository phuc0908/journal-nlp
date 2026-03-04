import { useState, useEffect } from 'react';

/**
 * Tính số ngày ghi chép liên tục (streak) tính từ hôm nay về trước.
 * Một ngày được tính nếu có ít nhất 1 journal entry trong ngày đó.
 */
function calcStreak(journals) {
    if (!journals.length) return 0;

    // Tập hợp các ngày có entry (dạng 'YYYY-MM-DD')
    const daysWithEntry = new Set(
        journals.map(j => new Date(j.createdAt).toLocaleDateString('en-CA'))
    );

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toLocaleDateString('en-CA');
        if (daysWithEntry.has(key)) {
            streak++;
        } else {
            break; // chuỗi bị đứt
        }
    }
    return streak;
}

/**
 * Trả về số lượng entry cho 7 ngày gần nhất (index 0 = 6 ngày trước, index 6 = hôm nay).
 */
function calcWeekly(journals) {
    const counts = Array(7).fill(0);
    const today = new Date();

    journals.forEach(j => {
        const entryDate = new Date(j.createdAt);
        const diffDays = Math.floor(
            (today.setHours(0, 0, 0, 0) - entryDate.setHours(0, 0, 0, 0)) / 86400000
        );
        if (diffDays >= 0 && diffDays < 7) {
            counts[6 - diffDays]++;
        }
    });
    return counts;
}

export function useJournalStats() {
    const [streak, setStreak] = useState(0);
    const [weeklyCount, setWeeklyCount] = useState(Array(7).fill(0));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const res = await fetch('/api/journals', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) return;
                const journals = await res.json();
                setStreak(calcStreak(journals));
                setWeeklyCount(calcWeekly(journals));
            } catch (e) {
                console.error('Lỗi tải journal stats:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return { streak, weeklyCount, loading };
}
