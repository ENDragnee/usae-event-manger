import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TournamentInfo() {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Tournament Information</CardTitle>
        <CardDescription>Basketball Tournament - Quarter Finals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Next Match</div>
            <div className="mt-1 flex items-center justify-between">
              <span>vs Team Eagles</span>
              <Badge variant="secondary">14:00</Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Court</div>
            <div className="mt-1">Main Court A</div>
          </div>
          <div>
            <div className="text-sm font-medium">Tournament Progress</div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div className="h-full w-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

