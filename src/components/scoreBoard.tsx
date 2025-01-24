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
    <div>
      <Tabs defaultValue="Soccer" className="space-y-4">
        <TabsList className="grid grid-cols-5 md:grid-cols-5 gap-4">
          <TabsTrigger value="Soccer">Soccer</TabsTrigger>
          <TabsTrigger value="Athletics">Athletics</TabsTrigger>
          <TabsTrigger value="Chess">Chess</TabsTrigger>
          <TabsTrigger value="Gebeta">Gebeta</TabsTrigger>
          <TabsTrigger value="Taekwondo">Taekwondo</TabsTrigger>
        </TabsList>

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

