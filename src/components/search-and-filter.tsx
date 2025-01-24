import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchAndFilter({ onFilterChange }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search matches"
          onChange={(e) => onFilterChange((prev: any) => ({ ...prev, search: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="sport">Sport</Label>
        <Select onValueChange={(value) => onFilterChange((prev:  any) => ({ ...prev, sport: value }))}>
          <SelectTrigger id="sport">
            <SelectValue placeholder="Select sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="chess">Chess</SelectItem>
            <SelectItem value="taekwondo">Taekwondo</SelectItem>
            <SelectItem value="athletics">Athletics</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={(value) => onFilterChange((prev: any) => ({ ...prev, status: value }))}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

