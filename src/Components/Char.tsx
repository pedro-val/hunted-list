import IAllPlayers from "../Interfaces/IAllPlayers"
import "../Styles/Char.css"

function Char({ char }: { char: IAllPlayers }) {

    const handleClick = (name:string) => {
        window.open(`https://www.tibia.com/community/?name=${name}`, '_blank');
    };

    const handleCopy = (name:string) => {
        navigator.clipboard.writeText(name);
    };
  return (
    <div className="charBox">
      <span
        className="copy"
        onClick={() => handleCopy(char.name)}
      >Copiar</span>
        <div
          onClick={() => handleClick(char.name)}
          >&nbsp;&nbsp;{char.name}</div>
        <div>{char.level}</div>
        <div>{char.vocation}</div>
    </div>
  )
}

export default Char
