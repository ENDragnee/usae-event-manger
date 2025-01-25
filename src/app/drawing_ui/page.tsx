"use client"; // Required for client-side functionality

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CompetitionDraw() {
  const [groups, setGroups] = useState(
    Array(16)
      .fill(null)
      .map(() => Array(3).fill("")) // Initialize with empty slots
  );

  useEffect(() => {
    const ws = new WebSocket("ws://usae-ws.onrender.com/");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      switch (message.type) {
        case "INITIAL_DATA":
        case "UPDATE_GROUPS":
          setGroups(message.data);
          break;
        default:
          console.warn("Unknown message type:", message.type);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    console.log("Groups updated:", groups);
  }, [groups]);

  useEffect(() => {
    document.body.style.backgroundColor = "#fcfcfc";
    document.body.style.color = "#2d3955";
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#2d3955] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b49041] to-[#2d3955]">
            USAE FOOTBALL CHAMPIONSHIP
          </span>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#b49041] to-[#2d3955]">
            GROUP STAGE DRAW
          </div>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
            >
              <Card className="w-full bg-white border border-[#b49041] hover:border-[#2d3955] transition-colors duration-300 shadow-lg hover:shadow-[#b49041]/50">
                <CardHeader className="bg-[#fcfcfc] rounded-t-lg p-3">
                  <CardTitle className="text-lg font-semibold text-[#b49041]">
                    Group {groupIndex + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  {group.map((slot, slotIndex) => (
                    <motion.div
                      key={slotIndex}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-2 bg-[#f0f0f0] border border-[#b49041] text-[#2d3955] font-medium rounded-md p-2 text-sm whitespace-normal break-words shadow-md">
                        {slot || "Team"}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
