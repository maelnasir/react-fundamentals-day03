import { NavLink } from 'react-router-dom'

function Navbar(){

    return (
        <ul className='navbar'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
          <li><NavLink to='/pokemon'>Pokemon</NavLink></li>
          <li><NavLink to='/superhero'>Superheroes</NavLink></li>
          <li><NavLink to='/window'>Window</NavLink></li>
          <li><NavLink to='/counter'>Counter</NavLink></li>
          <li><NavLink to='/fetchusers'>FetchUsers</NavLink></li>
          <li><NavLink to='/namesaver'>NameSaver</NavLink></li>
        </ul>
    )
}

export default Navbar