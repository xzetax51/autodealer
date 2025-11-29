'use client';

import { useState, useCallback } from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    return { toasts, showToast };
}

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`px-4 py-3 rounded-lg shadow-lg text-white animate-pulse ${toast.type === 'success'
                            ? 'bg-emerald-500'
                            : toast.type === 'error'
                                ? 'bg-rose-500'
                                : 'bg-blue-500'
                        }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}
