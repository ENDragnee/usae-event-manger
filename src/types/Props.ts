export interface MatchCardProps {
    players: any;
    Status: any;
    _id: any;
    Result: any;
    metadata: any;
    match: {
      id: string;
      type: string[];
      players: string[];
      playersId: string[];
      date: string;
      teams?: string[];
      event?: string;
      status: string;
      metadata: {
        type: string;
        date: string;
        startTime: string;
        endTime: string;
      };
    };
    onResultSubmit: (matchId: string, result: any) => void;
  }