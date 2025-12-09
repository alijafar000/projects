import React, { useState } from 'react'
import { useEffect, useTransition } from 'react'
import { getCountryData } from '../api/postApi'
import Loader from '../components/Ui/Loader';
import CountryCard from '../components/layout/CountryCard';
import SearchFilter from '../components/Ui/SearchFilter';

const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState();

  useEffect(()=>{
    startTransition(async()=>{
      const res = await getCountryData();
      // console.log(res);
      setCountries(res.data)
      
    })
  }, [])
  if(isPending) return <Loader/>

  //search filter logics

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };


   // here is the main logic
  const filterCountries = countries.filter((country)=> searchCountry(country))

  return (
    <section className='country-section'>

      <SearchFilter search={search}
      setSearch={setSearch}
      />
      <ul className='grid grid-four-cols'>
        {filterCountries.map((curCountry, index) =>{
          return <CountryCard country={curCountry} key={index}/>
        })}
      </ul>
    </section>
  )
}

export default Country