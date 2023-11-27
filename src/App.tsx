import { useState, useEffect, useCallback, useContext } from 'react'
import { filterHuntedChars } from './Utils/FilterChars'
import Char from './Components/Char';
import FilterBar from './Components/FilterBar';
import Context from './Context/Context';
import './Styles/Main.css'

function App() {
  const [intervall, setIntervall] = useState(10);
  const [allPlayers, setAllPlayers] = useState([]);
  const [punePlayers, setPunePlayers] = useState([]);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [numOnline, setNumOnline] = useState(0);
  const [alarmChecked, setAlarmChecked] = useState(false);
  const [audio] = useState(new Audio('/buzina.mp3'));
  const [minLevel, setMinLevel] = useState(2);
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

  const firstFetch = useCallback(async () => {
    const allPlayers = await fetchAllPlayers();
    const punePlayers = await fetchPunePlayers();
    if (setHuntedChars === undefined) return;
    setHuntedChars(filterHuntedChars(punePlayers, allPlayers, minLevel));
    setIsLoading !== undefined && setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAllPlayers, fetchPunePlayers]);

  useEffect(() => {
    firstFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (huntedChars === undefined) return;
    if (alarmChecked && huntedChars.length >= numOnline) {
      audio.loop = true;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alarmChecked, huntedChars, numOnline]);

  useEffect(() => {
    const id = setInterval(async () => {
      setIsLoading && setIsLoading(true);
      await fetchAllPlayers();
      await fetchPunePlayers();
      if (setHuntedChars === undefined) return;
      setHuntedChars(filterHuntedChars(punePlayers, allPlayers, minLevel));
      setIsLoading && setIsLoading(false);
    }, intervall * 1000) as unknown as number;
    setIntervalId(id);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervall, fetchAllPlayers, fetchPunePlayers, punePlayers, allPlayers])

  const handleInterval = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(e.target.value) < 5) {
      setIntervall(5)
      return
    }
    setIntervall(Number(e.target.value))
  }

  const stopUpdate = (): void => {
    intervalId && clearInterval(intervalId)
  };
  return (
    <>
      <div>Hunted List - {huntedChars?.length} Online</div>
      <div>Interval: {`Intervalo de tempo para atualização automática de ${intervall} segundos`}</div>
      <input
        type='number'
        value={intervall}
        onChange={handleInterval}
      />
      <button
        onClick={stopUpdate}
      >
        Parar Atualização
      </button>
      <br />
      <p>
        Level Mínimo para Filtragem
      </p>
      <input
        type='number'
        min={2}
        value={minLevel}
        onChange={(e) => setMinLevel(Number(e.target.value))}
      />
      <p>
        Alarme de Players Online - Selecione a quantidade e marque a caixa para ativar o alarme!
      </p>
      <input
        type='number'
        min={1}
        placeholder='Quantos Online?'
        value={numOnline}
        onChange={(e) => setNumOnline(Number(e.target.value))}
      />
      <input
        type='checkbox'
        checked={alarmChecked}
        onChange={() => setAlarmChecked(!alarmChecked)}
      />
      <br/>
      <FilterBar />
      {isLoading ? 
      <img 
      className='loading'
      src='/loading.jpg'
      alt='loading'      
      /> : 
      <div>
        {huntedChars?.map((char) => (
          <Char key={char.name} char={char} />
        ))}
      </div>}
      <footer>By Leozin Pokazideia e Nescau do Hetai</footer>
    </>
  )
}

export default App
