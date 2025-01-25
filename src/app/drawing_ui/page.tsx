"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CompetitionDraw() {
  const [groups, setGroups] = useState(
    Array(16).fill(null).map(() => Array(3).fill(""))
  );
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    let ws : any;
    let reconnectTimeout :any;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket("https://usae-ws.onrender.com");

        ws.onopen = () => {
          console.log("WebSocket connection established");
          setConnectionStatus("connected");
          setRetryCount(0);
        };

        ws.onmessage = (event: any) => {
          try {
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
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        };

        ws.onerror = () => {
          setConnectionStatus("error");
          if (retryCount < MAX_RETRIES) {
            reconnectTimeout = setTimeout(() => {
              setRetryCount(prev => prev + 1);
              connectWebSocket();
            }, 3000);
          }
        };

        ws.onclose = () => {
          setConnectionStatus("disconnected");
        };
      } catch (error) {
        console.error("WebSocket connection error:", error);
        setConnectionStatus("error");
      }
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [retryCount]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-gray-800">
            USAE FOOTBALL CHAMPIONSHIP
          </span>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-gray-800">
            GROUP STAGE DRAW
          </div>
        </h1>

        {connectionStatus === "error" && retryCount >= MAX_RETRIES && (
          <div className="mb-8 text-center p-4 bg-red-100 text-red-700 rounded-lg">
            Unable to connect to the server. Please try refreshing the page.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
              className="bg-white rounded-lg shadow-lg border border-amber-600 hover:border-gray-800 transition-colors duration-300"
            >
              <div className="p-3 border-b border-amber-600">
                <h3 className="text-lg font-semibold text-amber-600">
                  Group {groupIndex + 1}
                </h3>
              </div>
              <div className="p-3">
                {group.map((slot, slotIndex) => (
                  <motion.div
                    key={slotIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-2 bg-gray-50 border border-amber-600 text-gray-800 font-medium rounded-md p-2 text-sm whitespace-normal break-words">
                      {slot || "Team"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}