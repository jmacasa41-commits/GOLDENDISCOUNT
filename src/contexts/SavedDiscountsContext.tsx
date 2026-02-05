import React, { createContext, useContext, useState, useEffect } from "react";

interface SavedDiscountsContextType {
    savedIds: Set<string>;
    toggleSave: (id: string) => void;
    isSaved: (id: string) => boolean;
}

const SavedDiscountsContext = createContext<SavedDiscountsContextType | undefined>(undefined);

export function SavedDiscountsProvider({ children }: { children: React.ReactNode }) {
    const [savedIds, setSavedIds] = useState<Set<string>>(() => {
        const saved = localStorage.getItem("savedDiscounts");
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    useEffect(() => {
        localStorage.setItem("savedDiscounts", JSON.stringify(Array.from(savedIds)));
    }, [savedIds]);

    const toggleSave = (id: string) => {
        setSavedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const isSaved = (id: string) => savedIds.has(id);

    return (
        <SavedDiscountsContext.Provider value={{ savedIds, toggleSave, isSaved }}>
            {children}
        </SavedDiscountsContext.Provider>
    );
}

export function useSavedDiscounts() {
    const context = useContext(SavedDiscountsContext);
    if (context === undefined) {
        throw new Error("useSavedDiscounts must be used within a SavedDiscountsProvider");
    }
    return context;
}
