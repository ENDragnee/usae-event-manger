import { useState } from "react"

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
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all')
  const [selectedWeightClass, setSelectedWeightClass] = useState<'all' | WeightClass>('all')

  const filteredAthletes = taekwondoData.filter(athlete => {
    if (selectedGender !== 'all' && athlete.gender !== selectedGender) return false
    if (selectedWeightClass !== 'all' && athlete.weightClass !== selectedWeightClass) return false
    return true
  }).sort((a, b) => {
    // First sort by weight class
    if (a.weightClass < b.weightClass) return -1
    if (a.weightClass > b.weightClass) return 1
    // Then by ranking within weight class
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
      case 1: return "bg-yellow-100"
      case 2: return "bg-gray-100"
      case 3: return "bg-orange-100"
      default: return ""
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-4">
        <select 
          value={selectedGender}
          onChange={(e) => {
            setSelectedGender(e.target.value as 'all' | 'male' | 'female')
            setSelectedWeightClass('all')
          }}
          className="block w-full max-w-xs p-2 border rounded-md"
        >
          <option value="all">All Athletes</option>
          <option value="male">Male Athletes</option>
          <option value="female">Female Athletes</option>
        </select>

        <select 
          value={selectedWeightClass}
          onChange={(e) => setSelectedWeightClass(e.target.value as 'all' | WeightClass)}
          className="block w-full max-w-xs p-2 border rounded-md"
        >
          <option value="all">All Weight Classes</option>
          {displayWeightClasses.map(weightClass => (
            <option key={weightClass} value={weightClass}>
              {weightClass.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ranking
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAthletes.map((athlete) => (
              <tr key={athlete.id} className={getRankingColor(athlete.ranking)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {athlete.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {athlete.weightClass.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {athlete.university}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{athlete.ranking}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaekwondoTable