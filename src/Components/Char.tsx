import IAllPlayers from "../Interfaces/IAllPlayers"
import "../Styles/Char.css"

function Char({ char }: { char: IAllPlayers }) {

    const handleClick = (name:string) => {
        window.open(`https://www.tibia.com/community/?name=${name}`, '_blank');
    };
  return (
    <div className="charBox">
        <div
          onClick={() => handleClick(char.name)}
        >{char.name}</div>
        <div>{char.level}</div>
        <div>{char.vocation}</div>
    </div>
  )
}

export default Char
