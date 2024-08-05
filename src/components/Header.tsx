import { NavLink, useNavigate, useParams } from 'react-router-dom'

import DarkModeButton from '../components/DarkModeButton'
import { useEffect, useState } from 'react'
import { IP_PRZEKIEROWANIE } from '../constants'
import { BadgeHelp, BookOpen, Info, LaptopMinimal, Menu, Settings, Wifi } from 'lucide-react'
// import { Container } from 'lucide-react'
import { cn } from '../lib/utils'
import { Input } from './ui/input'
import { Button } from './ui/button'


const navLinks = [
  { id: 0, to: 'informacje', icon: <Info size={20} />, label: 'Informacje' },
  { id: 1, to: 'kafejka', icon: <LaptopMinimal size={20} />, label: 'Kafejka' },
  { id: 2, to: 'ustawienia', icon: <Settings size={20} />, label: 'Ustawienia' },
  { id: 3, to: 'wifi', icon: <Wifi size={20} />, label: 'Wi-Fi' },
  { id: 4, to: 'ebooki', icon: <BookOpen size={20} />, label: 'Ebooki' },
  { id: 5, to: 'zgloszenia', icon: <BadgeHelp size={20} />, label: 'Zgłoszenia' },
  // { id: 6, to: 'dystrybucja', icon: <Container size={20} />, label: 'Dystrybucja' },
]

export default function Headers() {
  const navigate = useNavigate()
  const param = useParams()
  const { securityKey, curFilia } = param
  const [openMenu, setOpenMenu] = useState(false)

  const handleMenu = () => {
    setOpenMenu(!openMenu)
  }

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
    setOpenMenu(false)
  }
  // 'flex p-4 flex-col gap-2 items-center justify-center font-medium text-muted-foreground capitalize text-center'
  return (
    <header className='flex lg:place-content-center space-x-3 lg:gap-0 justify-end h-[78px] bg-card border-b border-slate-300 dark:border-slate-800  sticky top-0 z-[20] p-4 lg:p-0'>
      <FiliaChanger securityKey={securityKey} curFilia={curFilia} className='lg:hidden' />

      <DarkModeButton className='lg:hidden' />
      <Button variant='accent' className='lg:hidden relative z-10 border-2 rounded-lg px-2' onClick={handleMenu}>
        <Menu size={24} />
      </Button>

      <nav className={cn("lg:flex place-items-center gap-4 flex-col lg:flex-row hidden lg:static bg-card inset-0 p-8 pt-20 lg:p-0", openMenu && "fixed flex")}>

        {navLinks
          // if the ip address has 37 dont include settings
          .filter((link) => {
            if (typeof IP_PRZEKIEROWANIE !== 'undefined') {
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
        <FiliaChanger securityKey={securityKey} curFilia={curFilia} className='hidden lg:inline-flex' />
        <DarkModeButton className='hidden lg:inline-flex' />

      </nav>

    </header>
  )
}
interface FiliaChangerProps {
  securityKey?: string
  curFilia?: string
  className?: string
}

const FiliaChanger: React.FC<FiliaChangerProps> = ({ securityKey, curFilia, className }) => {
  const navigate = useNavigate();
  if (window.location.origin.includes(".37")) return null;
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilia = e.target.value;

    if (newFilia && newFilia.length > 0) {
      navigate(`/${securityKey}/${newFilia}`);
    }
  };

  return (

    <Input className={cn('w-fit max-w-16 border-2', className)} defaultValue={curFilia} onChange={handleChange} />

  )
}