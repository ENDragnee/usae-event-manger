import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { ImageError } from "next/dist/server/image-optimizer";

type WeightClass = 
  | "62kg-f" | "46kg-f" | "67kg-f" | "68kg-m" 
  | "58kg-m" | "63kg-m" | "74kg-m" | "49kg-f" 
  | "57kg-f" | "54kg-m" | "53kg-f" | "80kg-m"

type TaekwondoAthlete = {
  id: number
  name: string
  gender: 'male' | 'female'
  university: string
  ranking: number
  weightClass: WeightClass
}

const taekwondoData: TaekwondoAthlete[] = [
  //67 Female
  { id: 40, name: "Zeyneba Bonta", gender: "female", university: "Jijiga University", ranking: 1, weightClass: "67kg-f" },
  { id: 41, name: "Bezawit Birhanu", gender: "female", university: "Worabe University", ranking: 2, weightClass: "67kg-f" },
  { id: 42, name: "Christina Fisiha", gender: "female", university: "Haramaya Bultum University", ranking: 3, weightClass: "67kg-f" },
  { id: 43, name: "Bethlem Sentayew", gender: "female", university: "Jimma University", ranking: 3, weightClass: "67kg-f" },
  //49 Female
  { id: 24, name: "Adawa Kassa", gender: "female", university: "Debre Tabor University", ranking: 1, weightClass: "49kg-f" },
  { id: 25, name: "Birtukan Tafese", gender: "female", university: "FTVT University", ranking: 2, weightClass: "49kg-f" },
  { id: 26, name: "Ayenalem Tegegn", gender: "female", university: "Wollo University", ranking: 3, weightClass: "49kg-f" },
  { id: 27, name: "Milise Girma", gender: "female", university: "Worabe University", ranking: 3, weightClass: "49kg-f" },
  //53 Female
  { id: 1, name: "Yabsira Bekele", gender: "female", university: "Bahirdar University", ranking: 1, weightClass: "53kg-f" },
  { id: 2, name: "Yabsira Wondesson", gender: "female", university: "Dire Dawa University", ranking: 2, weightClass: "53kg-f" },
  { id: 3, name: "Gifty Tolera", gender: "female", university: "Oda Bultum University", ranking: 3, weightClass: "53kg-f" },
  { id: 4, name: "Birtukan Mekonen", gender: "female", university: "Wachamo University", ranking: 3, weightClass: "53kg-f" },
  //57 Female 
  { id: 5, name: "Azeb Gonfa", gender: "female", university: "Salale University", ranking: 1, weightClass: "57kg-f" },
  { id: 6, name: "Mastewal Yismaw", gender: "female", university: "Jinka University", ranking: 2, weightClass: "57kg-f" },
  { id: 7, name: "Bitanya Tigabe", gender: "female", university: "Haramaya University", ranking: 3, weightClass: "57kg-f" },
  { id: 8, name: "Liyuwerk Asebe", gender: "female", university: "Arba Minch University", ranking: 3, weightClass: "57kg-f" },
  //62 Female
  { id: 28, name: "Tsigenet Gorfa", gender: "female", university: "Debre Tabor University", ranking: 1, weightClass: "62kg-f" },
  { id: 29, name: "Hanan Abdulnuri", gender: "female", university: "Debre Birhan University", ranking: 2, weightClass: "62kg-f" },
  { id: 30, name: "Senayet Weyga", gender: "female", university: "Wachamo University", ranking: 3, weightClass: "62kg-f" },
  { id: 31, name: "Hayat Gemal", gender: "female", university: "Haramaya University", ranking: 3, weightClass: "62kg-f" },
  //46 Female
  { id: 36, name: "Eyerusalem Teshome", gender: "female", university: "FTVT University", ranking: 1, weightClass: "46kg-f" },
  { id: 37, name: "Selenat Ayenew", gender: "female", university: "Samara University", ranking: 2, weightClass: "46kg-f" },
  { id: 38, name: "Chaliti Kefele", gender: "female", university: "Oda Bultum University", ranking: 3, weightClass: "46kg-f" },
  { id: 39, name: "Tinbite Daniel", gender: "female", university: "Haramaya University", ranking: 3, weightClass: "46kg-f" },
  //54 Male
  { id: 9, name: "Diraba Debela", gender: "male", university: "Jimma University", ranking: 1, weightClass: "54kg-m" },
  { id: 10, name: "Fikdau Erteban", gender: "male", university: "Debere Tabor University", ranking: 2, weightClass: "54kg-m" },
  { id: 11, name: "Abel Tezera", gender: "male", university: "Gondor University", ranking: 3, weightClass: "54kg-m" },
  { id: 12, name: "Belayneh Tewachew", gender: "male", university: "Wollo University", ranking: 3, weightClass: "54kg-m" },
  //58 Male
  { id: 13, name: "Teketay Aderaw", gender: "male", university: "Wolita Sodo University", ranking: 1, weightClass: "58kg-m" },
  { id: 14, name: "Tsion Rot", gender: "male", university: "Arsi University", ranking: 2, weightClass: "58kg-m" },
  { id: 15, name: "Remedan Osman", gender: "male", university: "Wollega University", ranking: 3, weightClass: "58kg-m" },
  { id: 16, name: "Luel Tedwross", gender: "male", university: "Haramaya University", ranking: 3, weightClass: "58kg-m" },
  //63 Male
  { id: 17, name: "Fikadu Daneil", gender: "male", university: "Hawassa University", ranking: 1, weightClass: "63kg-m" },
  { id: 18, name: "Bekalu Demeke", gender: "male", university: "Wachamo University", ranking: 2, weightClass: "63kg-m" },
  { id: 19, name: "Nahom G/Silasse", gender: "male", university: "Adigrat University", ranking: 3, weightClass: "63kg-m" },
  { id: 20, name: "Denkew Amsalu", gender: "male", university: "Debre Tabor University", ranking: 3, weightClass: "63kg-m" },
  //68 Male
  { id: 44, name: "Amanuel Daneil", gender: "male", university: "Bahir Dar University", ranking: 1, weightClass: "68kg-m" },
  { id: 45, name: "Kalid Kedir", gender: "male", university: "Haramaya University", ranking: 2, weightClass: "68kg-m" },
  { id: 46, name: "Mohamed Nuri", gender: "male", university: "Wolita Sodo University", ranking: 3, weightClass: "68kg-m" },
  { id: 47, name: "Abdulrezek Sehfa", gender: "male", university: "Worabe University", ranking: 3, weightClass: "68kg-m" },
  // 80 Male
  { id: 21, name: "Fasil Lakew", gender: "male", university: "Debre Birihan University", ranking: 1, weightClass: "80kg-m" },
  { id: 22, name: "Temam Seid", gender: "male", university: "Salale University", ranking: 2, weightClass: "80kg-m" },
  { id: 23, name: "Menewer Kedir", gender: "male", university: "Werabe University", ranking: 3, weightClass: "80kg-m" },
  // 74 Male
  { id: 32, name: "Gizachew Demisse", gender: "male", university: "Wolkite University", ranking: 1, weightClass: "74kg-m" },
  { id: 33, name: "Firaol Tamene", gender: "male", university: "Mekdella Amba University", ranking: 2, weightClass: "74kg-m" },
  { id: 34, name: "Changoz Kuad", gender: "male", university: "Addis Ababa University", ranking: 3, weightClass: "74kg-m" },
  { id: 35, name: "Kemal Ibrahim", gender: "male", university: "Bule Hora University", ranking: 3, weightClass: "74kg-m" },
]

const TaekwondoTable = () => {
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('male')
  const [selectedWeightClass, setSelectedWeightClass] = useState<'all' | WeightClass>('54kg-m')

  const filteredAthletes = taekwondoData.filter(athlete => {
    if (selectedGender !== 'all' && athlete.gender !== selectedGender) return false
    if (selectedWeightClass !== 'all' && athlete.weightClass !== selectedWeightClass) return false
    return true
  }).sort((a, b) => {
    if (a.weightClass < b.weightClass) return -1
    if (a.weightClass > b.weightClass) return 1
    return a.ranking - b.ranking
  })

  const weightClasses = {
    female: ["46kg-f", "49kg-f", "53kg-f", "57kg-f", "62kg-f", "67kg-f"],
    male: ["54kg-m", "58kg-m", "63kg-m", "68kg-m", "74kg-m", "80kg-m"]
  }

  const displayWeightClasses = selectedGender === 'all' 
    ? [...weightClasses.female, ...weightClasses.male]
    : weightClasses[selectedGender]

  const getRankingColor = (ranking: number) => {
    switch(ranking) {
      case 1: return "bg-yellow-100 dark:bg-yellow-600"
      case 2: return "bg-gray-100 dark:bg-gray-400"
      case 3: return "bg-orange-100 dark:bg-orange-300"
      default: return ""
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-4">
        {/* Gender Select */}
        <Select onValueChange={(value) => setSelectedGender(value as 'all' | 'male' | 'female')} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Weight Class Select */}
        <Select 
          onValueChange={(value) => setSelectedWeightClass(value as 'all' | WeightClass)} 
          value={selectedWeightClass}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Weight Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Weight Classes</SelectItem>
            {displayWeightClasses.map(weightClass => (
              <SelectItem key={weightClass} value={weightClass}>
                {weightClass.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6"> {/* Increased vertical spacing between tables */}
      {Object.entries(
        filteredAthletes.reduce((acc, athlete) => {
          const key = athlete.weightClass;
          if (!acc[key]) acc[key] = [];
          acc[key].push(athlete);
          return acc;
        }, {} as Record<string, TaekwondoAthlete[]>)
      ).map(([weightClass, athletes]) => (
        <div key={weightClass} className="rounded-lg border shadow-sm overflow-hidden"> {/* Added border and rounding */}
          <div className="bg-gray-50 dark:bg-gray-700 p-2 font-medium"> {/* Header for weight class */}
            {weightClass.toUpperCase()} Category
          </div>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Weight Class</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Ranking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {athletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell>{athlete.name}</TableCell>
                  <TableCell>{athlete.weightClass.toUpperCase()}</TableCell>
                  <TableCell>{athlete.university}</TableCell>
                  <TableCell>{athlete.ranking == 1 ? (<Image src="/images/medal.png" alt={"gold medal"} width={30} height={30}/>) : (athlete.ranking === 2 ? (<Image src={"/images/silver.png"} alt={"silver medal"} width={30} height={30}/>) : (<Image src={"/images/bronze.png"} alt={"bronze medal"} width={30} height={30}/>))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
    </div>
  )
}

export default TaekwondoTable