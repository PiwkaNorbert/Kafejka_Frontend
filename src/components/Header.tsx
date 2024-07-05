import { NavLink, useNavigate } from 'react-router-dom'

// import DarkModeButton from '../components/DarkModeButton'

import { useEffect } from 'react'
import { IP_PRZEKIEROWANIE } from '../constants'
import { BadgeHelp, BookOpen, Info, LaptopMinimal, Settings, Wifi } from 'lucide-react'
// import { Container } from 'lucide-react'
import { cn } from '../lib/utils'


const navLinks = [
  { id: 0, to: 'informacje', icon: <Info size={20} />, label: 'Informacje' },
  { id: 1, to: 'kafejka', icon: <LaptopMinimal size={20} />, label: 'Kafejka' },
  { id: 2, to: 'ustawienia', icon: <Settings size={20} />, label: 'Ustawienia' },
  { id: 3, to: 'wifi', icon: <Wifi size={20} />, label: 'Wi-Fi' },
  { id: 4, to: 'ebooki', icon: <BookOpen size={20} />, label: 'Ebooki' },
  { id: 5, to: 'zgloszenia', icon: <BadgeHelp size={20} />, label: 'Zgłoszenia' },
  // { id: 6, to: 'makulatura', icon: <Container size={20} />, label: 'Makulatura' },
]

export default function Headers() {
  const navigate = useNavigate()


  useEffect(() => {
    const storedValue = localStorage.getItem('navTitle')
    if (storedValue) {
      const index = navLinks.findIndex((link) => link.label.toLowerCase() === storedValue)
      if (index !== -1) {
        navigate(navLinks[index].to)
      }
    }
  }, [navigate])

  const handleClick = (value: number) => {
    localStorage.setItem('navTitle', navLinks[value].label.toLowerCase())
    navigate(navLinks[value].to)
  }
  // 'flex p-4 flex-col gap-2 items-center justify-center font-medium text-muted-foreground capitalize text-center'
  return (
    <header className='flex place-content-center bg-[var(--white)] border-b border-slate-300 dark:border-slate-800  sticky top-0 z-[20]'>

      <nav className="flex place-items-center  gap-4 ">

        {navLinks
          // if the ip address has 37 dont include settings
          .filter((link) => {
            if (typeof IP_PRZEKIEROWANIE !== 'undefined' ) {
              const splitIP = IP_PRZEKIEROWANIE?.split(".")
              const lastSector = splitIP[3]
              return window.location.hostname.includes(lastSector) ? link.to !== 'ustawienia' : link
            } 
          })
          .map((link) => (
            <div
              key={link.id}
              onClick={() => handleClick(link.id)}
            >
              <NavLink
                to={link.to}
                className={({ isActive, isPending, isTransitioning }) => cn("flex p-4 text-nonwrap flex-col space-x-2 items-center justify-center text-muted-foreground relative border-b-2 border-transparent capitalize text-center",
                  isPending ? "border-primary" : "",
                  isActive ? "font-medium text-primary border-primary" : "",
                  isTransitioning ? "border-primary" : "",
                )}
              >
                {link.icon}
                {link.label}
              </NavLink>
            </div>

          ))}

        {/* <div className='' >
          <DarkModeButton />
        </div> */}
      </nav>
    </header>
  )
}
