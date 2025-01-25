"use client"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AdminUI() {
  const [groups, setGroups] = useState<string[][]>([]);
  const [newTeam, setNewTeam] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [groupCount, setGroupCount] = useState(16);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState<string[]>([]); // Store the list of teams
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store matching suggestions
  const [newSlotCount, setNewSlotCount] = useState(3); // Default to 3 slots
  const [selectedGroupForSlots, setSelectedGroupForSlots] = useState(0); // Default to Group 1

  useEffect(() => {
    fetchGroups();
    fetchTeams(); // Fetch the list of teams when the component mounts
  }, []);

  // Fetch initial groups data
  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://usae-ws.onrender.com/api/groups");
      const data = await response.json();
      setGroups(data.groups);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch groups: ${err.message}`);
      } else {
        setError("Failed to fetch groups: Unknown error occurred");
      }
    }
    setIsLoading(false);
  };

  // Fetch the list of teams from teams.json
  const fetchTeams = async () => {
    try {
      const response = await fetch("/teams.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTeams(data); // Set the list of teams
    } catch (err) {
      console.error("Failed to fetch teams:", err);
      setError("Failed to load team names.");
    }
  };

  // Handle input change and update suggestions
  const handleInputChange = (value: string) => {
    setNewTeam(value);
    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions if the input is empty
    } else {
      // Filter teams that match the input value
      const matchingTeams = teams.filter((team) =>
        team.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchingTeams);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (team: string) => {
    setNewTeam(team); // Populate the input field with the selected team
    setSuggestions([]); // Clear the suggestions
  };

  // Add a team to a specific slot in a group
  const handleAddTeam = async () => {
    if (!newTeam) return;
    setIsLoading(true);
    try {
      const response = await fetch("https://usae-ws.onrender.com/api/update-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupIndex: selectedGroup,
          slotIndex: selectedSlot,
          value: newTeam,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      setGroups(data.groups);
      setNewTeam(""); // Clear the input field after adding the team
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to add team: ${err.message}`);
      } else {
        setError("Failed to add team: Unknown error occurred");
      }
    }
    setIsLoading(false);
  };

  // Update the number of groups
  const handleUpdateGroupCount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://usae-ws.onrender.com/api/groups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newGroupCount: groupCount }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      setGroups(data.groups);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to update group count: ${err.message}`);
      } else {
        setError("Failed to update group count: Unknown error occurred");
      }
    }
    setIsLoading(false);
  };

  // Update the number of slots in a group
  const handleUpdateSlotCount = async () => {
    if (!newSlotCount || newSlotCount < 1 || newSlotCount > 10) {
      setError("Slot count must be between 1 and 10");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://usae-ws.onrender.com/api/update-slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupIndex: selectedGroupForSlots,
          newSlotCount: newSlotCount,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      setGroups(data.groups); // Update the groups state with the response
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to update slot count: ${err.message}`);
      } else {
        setError("Failed to update slot count: Unknown error occurred");
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary text-white">
          Competition Draw Admin
        </h1>

        {/* Update Group Count */}
        <div className="mb-8 flex justify-center space-x-4">
          <Input
            type="number"
            value={groupCount}
            onChange={(e) => setGroupCount(Number(e.target.value))}
            className="w-20 bg-gray-700 border-gray-600 text-gray-100"
          />
          <Button onClick={handleUpdateGroupCount}>Update Group Count</Button>
        </div>

        {/* Update Slot Count */}
        <div className="mb-8 flex justify-center space-x-4">
          <Input
            type="number"
            value={newSlotCount}
            onChange={(e) => setNewSlotCount(Number(e.target.value))}
            placeholder="New slot count"
            className="w-40 bg-gray-700 border-gray-600 text-gray-100"
            min="1"
            max="10"
          />
          <select
            value={selectedGroupForSlots}
            onChange={(e) => setSelectedGroupForSlots(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100 rounded-md"
          >
            {groups.map((_, index) => (
              <option key={index} value={index}>
                Group {String.fromCharCode(65 + index)}
              </option>
            ))}
          </select>
          <Button onClick={handleUpdateSlotCount}>Update Slot Count</Button>
        </div>

        {/* Add Team to a Slot */}
        <div className="mb-8 flex justify-center space-x-4">
          <div className="relative">
            <Input
              value={newTeam}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="New team name"
              className="w-64 bg-gray-700 border-gray-600 text-gray-100"
            />
            {/* Display suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                {suggestions.map((team, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelectSuggestion(team)}
                  >
                    {team}
                  </div>
                ))}
              </div>
            )}
          </div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100 rounded-md"
          >
            {groups.map((_, index) => (
              <option key={index} value={index}>
                Group {String.fromCharCode(65 + index)}
              </option>
            ))}
          </select>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100 rounded-md"
          >
            {[0, 1, 2].map((slotIndex) => (
              <option key={slotIndex} value={slotIndex}>
                Slot {slotIndex + 1}
              </option>
            ))}
          </select>
          <Button onClick={handleAddTeam}>Add Team</Button>
        </div>

        {/* Display Groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
            >
              <Card className="w-full bg-gray-800 border-gray-700 hover:border-primary transition-colors duration-300">
                <CardHeader className="bg-gray-700 rounded-t-lg p-3">
                  <CardTitle className="text-lg font-semibold text-primary">
                    Group {String.fromCharCode(65 + groupIndex)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <AnimatePresence>
                    {group.map((slot, slotIndex) => (
                      <motion.div
                        key={slotIndex}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md p-2 text-sm">
                          {slot || "Team"}{" "}
                          {/* Display "Team" if the slot is empty */}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}