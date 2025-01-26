"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SoccerScoreBoard from "@/components/soccerScoreBoard"
import AthleticsScoreBoard from "@/components/AthleticsScoreBoard"
import ChessScoreBoard from "@/components/ChessScoreBoard"
import GebetaScoreBoard from "@/components/GebetaScoreBoard"
import TaekwondoScoreBoard from "@/components/TaekwondoScoreBoard"

const ScoreBoard = () => {
  return (
    <div className="w-full overflow-x-auto">
      <Tabs defaultValue="Soccer" className="space-y-4">
        <div className="overflow-x-auto scrollbar-hide">
          <TabsList className="flex gap-4 min-w-max px-4 md:justify-around">
            <TabsTrigger value="Soccer" className="flex-shrink-0">
              Soccer
            </TabsTrigger>
            <TabsTrigger value="Athletics" className="flex-shrink-0">
              Athletics
            </TabsTrigger>
            <TabsTrigger value="Chess" className="flex-shrink-0">
              Chess
            </TabsTrigger>
            <TabsTrigger value="Gebeta" className="flex-shrink-0">
              Gebeta
            </TabsTrigger>
            <TabsTrigger value="Taekwondo" className="flex-shrink-0">
              Taekwondo
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="Soccer" className="space-y-4">
          <SoccerScoreBoard />
        </TabsContent>

        <TabsContent value="Athletics">
          <AthleticsScoreBoard />
        </TabsContent>

        <TabsContent value="Chess">
          <ChessScoreBoard />
        </TabsContent>

        <TabsContent value="Gebeta">
          <GebetaScoreBoard />
        </TabsContent>

        <TabsContent value="Taekwondo">
          <TaekwondoScoreBoard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ScoreBoard

