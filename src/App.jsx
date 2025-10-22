import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import RandomPokemon from './components/RandomPokemon'
import Navbar from './components/Navbar'
import SuperheroList from './components/SuperheroList'
import WindowSize from './components/WindowSize'
import Counter from './components/Counter'
import FetchUsers from './components/FetchUsers'
import NameSaver from './components/NameSaver'
import NestedPages from './nested_routes/NestedPages'

function App() {

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/pokemon' element={<RandomPokemon />}></Route>
          <Route path='/superhero' element={<SuperheroList />}></Route>
          <Route path='/window' element={<WindowSize />}></Route>
          <Route path='/counter' element={<Counter />}></Route>
          <Route path='/fetchusers' element={<FetchUsers />}></Route>
          <Route path='/namesaver' element={<NameSaver />}></Route>
        </Routes>
      </Router>
      {/*  */}
      {/* <NestedPages/> */}
    </>
  )
}

export default App
