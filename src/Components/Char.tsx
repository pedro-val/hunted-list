import IAllPlayers from "../Interfaces/IAllPlayers"
import "../Styles/Char.css"

function Char({ char }: { char: IAllPlayers }) {
  return (
    <div className="charBox">
        <div>{char.name}</div>
        <div>{char.level}</div>
        <div>{char.vocation}</div>
    </div>
  )
}

export default Char
