import { useContext, useState } from "react"
import Context from "../Context/Context";

function FilterBar() {
    const {
      huntedChars,
      setHuntedChars,
      setIsLoading
      } = useContext(Context);
    const [filterType, setFilterType] = useState("level");
  
    const handleAlphabetic = (order: string) => {
        setIsLoading && setIsLoading(true);
        if (huntedChars === undefined) return;
        const list = [...huntedChars];
        switch (order) {
            case "DESC": {
                const alphabeticDesc = list?.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
                });
                if (setHuntedChars === undefined || alphabeticDesc === undefined) return;
                setHuntedChars(alphabeticDesc);
                break;
            }
            default: {
                const alphabetic = list?.sort((a, b) => {
                    if (a.name > b.name) {
                    return 1;
                    }
                    if (b.name > a.name) {
                    return -1;
                    }
                    return 0;
                });
                if (setHuntedChars === undefined || alphabetic === undefined) return;
                setHuntedChars(alphabetic);
                break;
            }

        }
        setFilterType("alphabetic");
        setIsLoading && setIsLoading(false);        
    };
    const handleLevel = (order:string) => {
        setIsLoading && setIsLoading(true);
        if (huntedChars === undefined) return;
        const list = [...huntedChars];
        switch (order) {
            case "DESC": {
                const levelDesc = list?.sort((a, b) => {
                if (a.level > b.level) {
                    return -1;
                }
                if (b.level > a.level) {
                    return 1;
                }
                return 0;
                });
                if (setHuntedChars === undefined || levelDesc === undefined) return;
                setHuntedChars(levelDesc);
                break;
            }
            default: {
                const level = list?.sort((a, b) => {
                    if (a.level > b.level) {
                    return 1;
                    }
                    if (b.level > a.level) {
                    return -1;
                    }
                    return 0;
                });
                if (setHuntedChars === undefined || level === undefined) return;
                setHuntedChars(level);            
                break;
            }
        }
        setFilterType("level");
        setIsLoading && setIsLoading(false);
    }
    const handleVocation = (order:string) => {
        setIsLoading && setIsLoading(true);
        if (huntedChars === undefined) return;
        const list = [...huntedChars];
        switch (order) {
            case "DESC": {
                const vocationDesc = list?.sort((a, b) => {
                if (a.vocation > b.vocation) {
                    return -1;
                }
                if (b.vocation > a.vocation) {
                    return 1;
                }
                return 0;
                });
                if (setHuntedChars === undefined || vocationDesc === undefined) return;
                setHuntedChars(vocationDesc);
                break;
            }
            default: {
                const vocation = list?.sort((a, b) => {
                    if (a.vocation > b.vocation) {
                    return 1;
                    }
                    if (b.vocation > a.vocation) {
                    return -1;
                    }
                    return 0;
                });
                if (setHuntedChars === undefined || vocation === undefined) return;
                setHuntedChars(vocation);            
                break;
            }
        }
        setFilterType("vocation");
        setIsLoading && setIsLoading(false);
    }
    const handleClick = (order:string) => {
        switch (filterType) {
            case "alphabetic": {
                handleAlphabetic(order);
                break;
            }
            case "level": {
                handleLevel(order);
                break;
            }
            case "vocation": {
                handleVocation(order);
                break;
            }
            default: {
                break;
            }
        }
    }

  return (
    <>
        <button
            onClick={() => handleAlphabetic("ASC")}
        >Alfabético</button>
        <button
            onClick={() => handleLevel("ASC")}
        >Level</button>
        <button
            onClick={() => handleVocation("ASC")}
        >Vocação</button>
        <button
            onClick={() => handleClick("ASC")}
        >Ascendente</button>
        <button
            onClick={() => handleClick("DESC")}
        >Descendente</button>
    </>
  )
}

export default FilterBar
