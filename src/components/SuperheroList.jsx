import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, ShieldUser } from 'lucide-react';
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

  // Best practice is early return and then React exits the component
  // So else is not required
  if (loading) return <p className="spinwheel"><Loader size={100}/></p>
  return (
    <div className="animate__animated animate__slideInRight">
      <h1><ShieldUser size={40} /> JLA</h1>
        {heroes.map(hero => (
            <div className="superherocard" key={hero.id}>
              <img 
                src={corsProxy+hero.image?.url} 
                alt={hero.name}
                loading="lazy"
                referrerPolicy="no-referrer"/>
              <h1>{hero.name == "Hal Jordan" ? "Green Lantern" : hero.name}</h1>
              <i>{hero.biography?.["full-name"]}</i>
            </div>
        ))}
    </div>
  )
}

export default SuperheroList;
