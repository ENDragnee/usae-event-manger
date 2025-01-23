import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileSection() {
  return (
    <Card className="w-full bg-card text-card-foreground">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/placeholder.svg" alt="Profile picture" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg md:text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-muted-foreground">Phone: +1 234 567 8900</p>
            <p className="text-sm text-muted-foreground">ID: ATH-12345</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

