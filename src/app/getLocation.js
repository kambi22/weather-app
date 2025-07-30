// app/locations/LocationsClientWrapper.tsx
'use client'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

export default function LocationsClientWrapper() {
  const locations = useSelector((state) => state.locations.locations)

  useEffect(() => {
    console.log("Location from get Location component calling",locations)
  }, [locations])
}
