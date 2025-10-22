import { NavLink } from 'react-router-dom'
import { House, ArrowDownRight, SquareDashedBottomCode } from 'lucide-react';

function Navbar(){

  const homeIcon = () => <House size={14} style={{paddingRight:"5px"}}/>
  const arrowIcon = () => <ArrowDownRight size={14} style={{paddingRight:"5px"}}/>
  const specialIcon = () => <SquareDashedBottomCode size={14} style={{paddingRight:"5px"}}/>

    return (
        <ul className='navbar animate__animated animate__bounce'>
          <li><NavLink to='/'>{homeIcon()}Home</NavLink></li>
          <li><NavLink to='/about'>{arrowIcon()}About</NavLink></li>
          <li><NavLink to='/contact'>{arrowIcon()}Contact</NavLink></li>
          <li><NavLink to='/pokemon'>{specialIcon()}Pokemon</NavLink></li>
          <li><NavLink to='/superhero'>{specialIcon()}Superheroes</NavLink></li>
          <li><NavLink to='/window'>{specialIcon()}WindowSize</NavLink></li>
          <li><NavLink to='/counter'>{specialIcon()}Counter</NavLink></li>
          <li><NavLink to='/fetchusers'>{specialIcon()}FetchUsers</NavLink></li>
          <li><NavLink to='/namesaver'>{specialIcon()}NameSaver</NavLink></li>
        </ul>
    )
}

export default Navbar