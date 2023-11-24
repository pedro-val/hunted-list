import { createContext } from 'react';
import IAllPlayers from '../Interfaces/IAllPlayers';

interface IContext {
    huntedChars?: IAllPlayers[],
    setHuntedChars?: (huntedChars: IAllPlayers[]) => void,
    isLoading?: boolean,
    setIsLoading?: (isLoading: boolean) => void,
}

const Context = createContext<IContext>({});

export default Context;
