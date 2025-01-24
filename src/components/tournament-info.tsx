import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  _id: { $oid: string };
  PlayersId: { $oid: string }[];
  Result: { PID: { $oid: string }; score?: number }[];
  Status: string;
  metadata: {
    type: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

interface TournamentInfoProps {
  matches?: Event[]; // Made matches optional
}

export function TournamentInfo({ matches = [] }: TournamentInfoProps) {
  // Normalize the status string for consistent filtering
  const completedMatches = matches.filter(
    (match) => match.Status.toLowerCase() === "completed"
  );

  return (
    <div className="space-y-6">
      {completedMatches.length > 0 ? (
        completedMatches.map((match) => (
          <Card key={match._id.$oid} className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>{match.metadata.type} - Completed</CardTitle>
              <CardDescription>
                Date: {match.metadata.date} | Time: {match.metadata.startTime} - {match.metadata.endTime}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Players</div>
                  <ul className="mt-1 list-disc ml-6">
                    {match.PlayersId.map((player) => (
                      <li key={player.$oid} className="text-sm">
                        Player ID: {player.$oid}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium">Results</div>
                  <ul className="mt-1 list-disc ml-6">
                    {match.Result.map((result, index) => (
                      <li key={index} className="text-sm">
                        Player ID: {result.PID.$oid} - Score: {result.score ?? "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant="default">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-muted-foreground">No completed matches available.</p>
      )}
    </div>
  );
}
