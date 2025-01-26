"use client"
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchAndFilter({ onFilterChange }: any) {
  // Initialize default filters
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    onFilterChange((prev: any) => ({
      ...prev,
      status: "Pending", // Default status
      day: currentDate,  // Default to the current day
    }));
  }, [onFilterChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Search Field */}
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search matches"
          onChange={(e) =>
            onFilterChange((prev: any) => ({
              ...prev,
              search: e.target.value,
            }))
          }
        />
      </div>

      {/* Sport Filter */}
      <div>
        <Label htmlFor="sport">Sport</Label>
        <Select
          onValueChange={(value) =>
            onFilterChange((prev: any) => ({
              ...prev,
              type: value,
            }))
          }
        >
          <SelectTrigger id="sport">
            <SelectValue placeholder="Select sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="soccer">Football</SelectItem>
            <SelectItem value="chess">Chess</SelectItem>
            <SelectItem value="taekwondo">Taekwondo</SelectItem>
            <SelectItem value="athletics">Athletics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          defaultValue="Pending" // Set default value
          onValueChange={(value) =>
            onFilterChange((prev: any) => ({
              ...prev,
              status: value,
            }))
          }
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Day Filter */}
      <div>
        <Label htmlFor="day">Day</Label>
        <Select
          defaultValue={new Date().toISOString().split("T")[0]} // Set default to today's date
          onValueChange={(value) =>
            onFilterChange((prev: any) => ({
              ...prev,
              day: value,
            }))
          }
        >
          <SelectTrigger id="date">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date(2025, 0, 26 + i)
                .toISOString()
                .split("T")[0];
              return (
                <SelectItem key={date} value={date}>
                  {new Date(date).toDateString()}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
