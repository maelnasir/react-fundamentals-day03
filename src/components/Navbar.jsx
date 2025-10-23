import { NavLink, Link } from 'react-router-dom'
import { House, ArrowDownRight, SquareDashedBottomCode, Cat, Palette, Clapperboard, Newspaper } from 'lucide-react';

function Navbar(){

  const homeIcon = () => <House size={14} style={{paddingRight:"5px"}}/>
  const arrowIcon = () => <ArrowDownRight size={14} style={{paddingRight:"5px"}}/>
  const catIcon = () => <Cat size={14} style={{paddingRight:"5px"}}/>
  const paletteIcon = () => <Palette size={14} style={{paddingRight:"5px"}}/>
  const filmIcon = () => <Clapperboard size={14} style={{paddingRight:"5px"}}/>
  const newsIcon = () => <Newspaper size={14} style={{paddingRight:"5px"}}/>
  const specialIcon = () => <SquareDashedBottomCode size={14} style={{paddingRight:"5px"}}/>

    return (
        <ul className='navbar animate__animated animate__bounce'>
          <li><NavLink to='/'>{homeIcon()}Home</NavLink></li>
          <li><NavLink to='/about'>{arrowIcon()}About</NavLink></li>
          <li><NavLink to='/contact'>{arrowIcon()}Contact</NavLink></li>
          <li><NavLink to='/randomcatgallery'>{catIcon()}Random Cat Gallery</NavLink></li>
          <li><NavLink to='/color'>{paletteIcon()}Color Fetcher</NavLink></li>
          <li><NavLink to='/ghibli'>{filmIcon()}Ghibli Films</NavLink></li>
          <li><NavLink to='/newsgallery'>{newsIcon()}News Gallery</NavLink></li>
          <li><NavLink to='/pokemon'>{specialIcon()}Pokemon</NavLink></li>
          <li><NavLink to='/superhero'>{specialIcon()}Superheroes</NavLink></li>
          <li><Link to='/window'>{specialIcon()}WindowSize</Link></li>
          <li><NavLink to='/counter'>{specialIcon()}Counter</NavLink></li>
          <li><NavLink to='/fetchusers'>{specialIcon()}FetchUsers</NavLink></li>
          <li><NavLink to='/namesaver'>{specialIcon()}NameSaver</NavLink></li>
        </ul>
    )
}

export default Navbar