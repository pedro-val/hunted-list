import { ReactNode, useState } from 'react';
import Context from './Context';
import IAllPlayers from '../Interfaces/IAllPlayers';

interface HuntedProviderProps {
    children: ReactNode;
  }

export default function HuntedProvider({ children }: HuntedProviderProps) {
    const [huntedChars, setHuntedChars] = useState<IAllPlayers[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const state = {
        huntedChars,
        setHuntedChars,
        isLoading,
        setIsLoading
    };
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
}