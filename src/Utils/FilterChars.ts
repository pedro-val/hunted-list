import IPunePlayers from "../Interfaces/IPunePlayers";
import IAllPlayers from "../Interfaces/IAllPlayers";

export const filterHuntedChars = (puneChars: IPunePlayers[], allChars: IAllPlayers[]) => {
    const huntedChars: IAllPlayers[] = [];
    const allNames = allChars.map((char) => char.name);
    const puneNames = puneChars.map((char) => char.name);
    for (let i = 0; i < allNames.length; i++) {
        if (!puneNames.includes(allNames[i])) {
            huntedChars.push(allChars[i]);
        }
    }
    const response = allChars.filter((char) => huntedChars.includes(char));
    return response;    
};