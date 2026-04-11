"use client"

import { useState } from "react"
import { Home, BedDouble, Bath, CookingPot, PawPrint } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CounterInput } from "@/components/schedule/counter-input"

export function HomeDetailsSection() {
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [kitchens, setKitchens] = useState(1)
  const [pets, setPets] = useState(0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Home className="size-5 text-secondary" aria-hidden="true" />
          Home Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CounterInput
            label="Bedrooms"
            icon={<BedDouble className="size-5" />}
            value={bedrooms}
            onChange={setBedrooms}
            min={1}
            max={10}
          />
          <CounterInput
            label="Bathrooms"
            icon={<Bath className="size-5" />}
            value={bathrooms}
            onChange={setBathrooms}
            min={1}
            max={5}
          />
          <CounterInput
            label="Kitchens"
            icon={<CookingPot className="size-5" />}
            value={kitchens}
            onChange={setKitchens}
            min={1}
            max={3}
          />
          <CounterInput
            label="Pets"
            icon={<PawPrint className="size-5" />}
            value={pets}
            onChange={setPets}
            min={0}
            max={5}
          />
        </div>
      </CardContent>
    </Card>
  )
}
