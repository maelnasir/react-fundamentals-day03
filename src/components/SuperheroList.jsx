import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoaderPinwheel } from 'lucide-react';
import '../css/superhero.css'

function SuperheroList() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = "e897c7640e349e0d382c4eb13b5102aa"; 
  const baseUrl = `https://superheroapi.com/api.php/${accessToken}`;
  const corsProxy = "https://corsproxy.io/?url="

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const heroIds = [70, 644, 720, 306, 263];
        const responses = await Promise.all(
          heroIds.map(id => axios.get(`${baseUrl}/${id}`))
        );
        setHeroes(responses.map(r => r.data));
      } catch (error) {
        console.error("Error fetching heroes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroes();
    return () => {};
  }, []);

  if (loading) return <p className="spinwheel"><LoaderPinwheel size={100}/></p>;

  return (
    <div>
      <h2>JLA</h2>
        {heroes.map(hero => (
            <div className="superherocard" key={hero.id}>
              <img 
                src={corsProxy+hero.image?.url} 
                alt={hero.name}
                loading="lazy"
                referrerPolicy="no-referrer"/>
              <h1>{hero.name}</h1>
              <i>{hero.biography?.["full-name"]}</i>
            </div>
        ))}
    </div>
  );
}

export default SuperheroList;
