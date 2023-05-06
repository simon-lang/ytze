import { range } from 'lodash'
import { KeyboardEventHandler, useState } from 'react'

const game: Record<string, Array<number | null>> = {
  Ones: [null, 0, 1, 2, 3, 4, 5, 6],
  Twos: [null, 0, 2, 4, 6, 8, 10],
  Threes: [null, 0, 3, 6, 9, 12, 15],
  Fours: [null, 0, 4, 8, 12, 16, 20],
  Fives: [null, 0, 5, 10, 15, 20, 25],
  Sixes: [null, 0, 6, 12, 18, 24, 30],
  'Three of a Kind': [null, ...range(0, 30)],
  'Four of a Kind': [null, ...range(0, 30)],
  'Full House': [null, 0, 25],
  'Small Straight': [null, 0, 30],
  'Large Straight': [null, 0, 40],
  Yahtzee: [null, 0, 50],
  Chance: [null, ...range(0, 30)]
}

function App() {
  const [current, setCurrent] = useState(0)
  const [players, setPlayers] = useState(['Lucy', 'Simon', 'Violet', 'Lotus'])

  const initialScores = Object.fromEntries(players.map((player) => [player, 0]))

  const [scores, setScores] = useState<{ [key: string]: number }>(initialScores)

  const updateScore = (_item: string, value: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [players[current]]: prevScores[players[current]] + value
    }))
    setTimeout(next, 500)
  }

  const updatePlayers: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      reset(e.currentTarget?.value)
    }
  }

  const reset = (playersString: string) => {
    setPlayers(playersString.split(',').map((s) => s.trim()))
    // setStores(initialScores)
  }

  const next = () => {
    setCurrent(current + 1 >= players.length ? 0 : current + 1)
  }
  return (
    <div>
      <div className={`grid grid-cols-4 mb-4`}>
        {players.map((player, i) => (
          <div className={`text-center p-1 border ${current === i ? 'bg-slate-100' : ''}`}>
            {player} <span className="text-slate-400 text-sm">({scores[player]})</span>
          </div>
        ))}
      </div>
      <div className="flex justify-around">
        {players.map((player, i) => (
          <div className={`border p-4 ${current === i ? 'bg-slate-50' : 'hidden'}`}>
            <h2 className="text-4xl mb-4 text-center">{player}</h2>
            <div>
              {Object.keys(game).map((item) => (
                <div className="flex justify-between w-64">
                  <div>{item}</div>
                  <select
                    className="w-20"
                    onChange={(e) => updateScore(item, Number(e.target.value))}
                    disabled={i !== current}
                  >
                    {game[item].map((value) => {
                      // @ts-ignore
                      return <option value={value}>{value}</option>
                    })}
                  </select>
                </div>
              ))}
              <div className="mt-4 flex justify-between w-64">
                Total: <span>{scores[player]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-2 mt-16">
        <input onKeyUp={updatePlayers} placeholder="Set Players" className="border p-2" />
      </div>
    </div>
  )
}

export default App
