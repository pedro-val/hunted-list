import { useState, useEffect, useCallback, useContext } from 'react'
import { filterHuntedChars } from './Utils/FilterChars'
import Char from './Components/Char';
import FilterBar from './Components/FilterBar';
import Context from './Context/Context';

function App() {
  const [intervall, setIntervall] = useState(10);
  const [allPlayers, setAllPlayers] = useState([]);
  const [punePlayers, setPunePlayers] = useState([]);
   const {
    huntedChars,
    setHuntedChars,
    isLoading,
    setIsLoading
  } = useContext(Context);
  
  const fetchAllPlayers = useCallback(async () => {
    const response = await fetch('https://api.tibiadata.com/v3/world/obscubra')
    const data = await response.json()
    setAllPlayers(data.worlds.world.online_players)
    return data.worlds.world.online_players;
  }, []);
  
  const fetchPunePlayers = useCallback(async () => {
    const response = await fetch('https://api.tibiadata.com/v3/guild/obscubra%20pune')
    const data = await response.json();
    setPunePlayers(data.guilds.guild.members);
    return data.guilds.guild.members;
  }, []);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      setIsLoading && setIsLoading(true);
      await fetchAllPlayers();
      await fetchPunePlayers();
      if (setHuntedChars === undefined) return;
      setHuntedChars(filterHuntedChars(punePlayers, allPlayers));
      setIsLoading && setIsLoading(false);
    }, intervall * 1000);
    return () => clearInterval(intervalId);
  }, [intervall, fetchAllPlayers, fetchPunePlayers, punePlayers, allPlayers])

  const handleInterval = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(e.target.value) < 5) {
      setIntervall(5)
      return
    }
    setIntervall(Number(e.target.value))
  }

  return (
    <>
      <div>Hunted List</div>
      <div>Interval: {`Intervalo de tempo para atualização automática de ${intervall} segundos`}</div>
      <input
        type='number'
        value={intervall}
        onChange={handleInterval}
      />
      <FilterBar />
      {isLoading ? 
      <div>Loading...</div> : 
      <div>
        {huntedChars?.map((char) => (
          <Char key={char.name} char={char} />
        ))}
      </div>}
    </>
  )
}

export default App
