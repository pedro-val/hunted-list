import IAllPlayers from "../Interfaces/IAllPlayers"

function Char({ char }: { char: IAllPlayers }) {
  return (
    <div>
        <div>{char.name}</div>
        <div>{char.level}</div>
        <div>{char.vocation}</div>
    </div>
  )
}

export default Char
