import { useState, useEffect, useCallback } from 'react'
import { filterHuntedChars } from './Utils/FilterChars'
import IAllPlayers from './Interfaces/IAllPlayers';

function App() {
  const [intervall, setIntervall] = useState(10);
  const [allPlayers, setAllPlayers] = useState([]);
  const [punePlayers, setPunePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [huntedChars, setHuntedChars] = useState<IAllPlayers[]>([]);
  
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
      setIsLoading(true);
      await fetchAllPlayers();
      await fetchPunePlayers();
      setHuntedChars(filterHuntedChars(punePlayers, allPlayers));
      setIsLoading(false);
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
      {isLoading ? 
      <div>Loading...</div> : 
      <div>
        {huntedChars.map((char) => (
          <div key={char.name}>
            <div>{char.name}</div>
            <div>{char.level}</div>
            <div>{char.vocation}</div>
          </div>
        ))}
      </div>}
    </>
  )
}

export default App
