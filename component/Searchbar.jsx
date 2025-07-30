"use client";
import axios from 'axios'
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addLocation } from '../src/app/redux/slice';




const Seachbar = (props) => {
  const [currentCityInput, setCurrentCityInput] = useState(''); // State for the current city input
    const dispatch = useDispatch()


  const handleChange = (e) => {
      setCurrentCityInput(e.target.value); // Update the current city input
  }

// Your page component
const handleSearch = () => {
  if (currentCityInput.trim() === '') {
    return;
  }
  // Dispatch each location individually
  dispatch(addLocation(currentCityInput));

}



const locations = ['London', 'New York', 'Moga'];
const handlelocationdata = () => {
    return locations;
}


  return (

    <div className="bg-amber- mx-auto sm:w-md md:flex gap-2">
      <div className="w-full   bg-white/30 shadow-2xl rounded-sm backdrop-blur-lg border border-white/30 ">
      <TextField
        className="w-full mx-auto text-center outline-blue-400"
        type="text"
        placeholder="Enter Location Name..."
        id="location"
        name='location'
        value={currentCityInput} // Bind the input value to the state
        onChange={handleChange}
      />
      </div>

      <Button variant="contained" onClick={handleSearch} className="sm:w-30 h-14 mt-1 w-full">Search</Button>
    </div>
  )
};
export default Seachbar;
