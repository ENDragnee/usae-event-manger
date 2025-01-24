import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export function ResultInput({ match }: any) {
  const [result, setResult] = useState({})
  const { toast } = useToast()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Here you would typically send the result to your backend
    console.log("Submitting result:", result)
    toast({
      title: "Result submitted successfully",
      description: "The match result has been recorded.",
    })
  }

  const renderInputFields = () => {
    switch (match.sport) {
      case "Football":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team1Score">{match.teams[0]} Score</Label>
                <Input
                  id="team1Score"
                  type="number"
                  min="0"
                  onChange={(e) => setResult({ ...result, team1Score: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="team2Score">{match.teams[1]} Score</Label>
                <Input
                  id="team2Score"
                  type="number"
                  min="0"
                  onChange={(e) => setResult({ ...result, team2Score: e.target.value })}
                />
              </div>
            </div>
          </>
        )
      case "Chess":
        return (
          <RadioGroup onValueChange={(value) => setResult({ outcome: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="win1" id="win1" />
              <Label htmlFor="win1">{match.players[0]} Wins</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="win2" id="win2" />
              <Label htmlFor="win2">{match.players[1]} Wins</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="draw" id="draw" />
              <Label htmlFor="draw">Draw</Label>
            </div>
          </RadioGroup>
        )
      case "Taekwondo":
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((round) => (
              <div key={round} className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`player1Round${round}`}>
                    {match.players[0]} Round {round}
                  </Label>
                  <Input
                    id={`player1Round${round}`}
                    type="number"
                    min="0"
                    onChange={(e) => setResult({ ...result, [`player1Round${round}`]: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor={`player2Round${round}`}>
                    {match.players[1]} Round {round}
                  </Label>
                  <Input
                    id={`player2Round${round}`}
                    type="number"
                    min="0"
                    onChange={(e) => setResult({ ...result, [`player2Round${round}`]: e.target.value })}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      case "Athletics":
        return (
          <div className="space-y-4">
            {match.participants.map((participant : any, index : any) => (
              <div key={index}>
                <Label htmlFor={`participant${index}`}>{participant} Finish Time</Label>
                <Input
                  id={`participant${index}`}
                  type="text"
                  placeholder="MM:SS.ms"
                  onChange={(e) => setResult({ ...result, [participant]: e.target.value })}
                />
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">{match.sport} Result</h2>
      <div className="text-sm text-gray-500 mb-4">
        {match.date} {match.time}
      </div>
      {renderInputFields()}
      <Button type="submit" className="w-full">
        Submit Result
      </Button>
    </form>
  )
}

