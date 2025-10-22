import { NavLink } from 'react-router-dom'
import { ArrowBigRight } from 'lucide-react';

function Navbar(){

  const icon = () => <ArrowBigRight size={14} style={{paddingRight:"5px"}}/>

    return (
        <ul className='navbar'>
          <li><NavLink to='/'>{icon()}Home</NavLink></li>
          <li><NavLink to='/about'>{icon()}About</NavLink></li>
          <li><NavLink to='/contact'>{icon()}Contact</NavLink></li>
          <li><NavLink to='/pokemon'>{icon()}Pokemon</NavLink></li>
          <li><NavLink to='/superhero'>{icon()}Superheroes</NavLink></li>
          <li><NavLink to='/window'>{icon()}Window</NavLink></li>
          <li><NavLink to='/counter'>{icon()}Counter</NavLink></li>
          <li><NavLink to='/fetchusers'>{icon()}FetchUsers</NavLink></li>
          <li><NavLink to='/namesaver'>{icon()}NameSaver</NavLink></li>
        </ul>
    )
}

export default Navbar