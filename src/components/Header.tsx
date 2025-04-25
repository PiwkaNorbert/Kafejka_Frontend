import { NavLink, useLocation, useNavigate } from 'react-router'

import { BadgeHelp, BookOpen, Info, LaptopMinimal, Menu, Settings, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'
import DarkModeButton from '../components/DarkModeButton'
import { IP_PRZEKIEROWANIE } from '../constants'
// import { Container } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-toastify'


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
  const location = useLocation()
  const [currentFilia, setCurrentFilia] = useState<string | undefined>()
  const [openMenu, setOpenMenu] = useState(false)
  
  useEffect(() => {
    // Extract curFilia from the URL path
    const pathParts = location.pathname.split('/')
    const filia = pathParts[1] // The curFilia is now the second part of the path
    
    // Only set currentFilia if it's not a direct route (like dashboard)
    if (filia && !navLinks.some(link => link.to === filia)) {
      setCurrentFilia(filia)
    }
  }, [location.pathname])

  const handleMenu = () => {
    setOpenMenu(!openMenu)
  }

  // useEffect(() => {
  //   const storedValue = localStorage.getItem('navTitle')
  //   if (storedValue) {
  //     const index = navLinks.findIndex((link) => link.label.toLowerCase() === storedValue)
  //     if (index !== -1) {
  //       if (currentFilia) {
  //         navigate(`/${currentFilia}/${navLinks[index].to}`)
  //       } else {
  //         navigate(navLinks[index].to)
  //       }
  //     }
  //   }
  // }, [navigate, currentFilia])

  const handleClick = (value: number) => {
    setOpenMenu(false)
    localStorage.setItem('navTitle', navLinks[value].label.toLowerCase())
    
    // If we have a currentFilia, navigate to the filia-specific route
    if (currentFilia) {
      navigate(`/${currentFilia}/${navLinks[value].to}`, { replace: true })
    } else {
      // If we're on a restricted address (200.40), get the stored filia
      const isRestrictedAddress = window.location.hostname.includes('200.40')
      const storedFilia = localStorage.getItem('curFilia')
      
      if (isRestrictedAddress && storedFilia) {
        navigate(`/${storedFilia}/${navLinks[value].to}`, { replace: true })
      } else {
        // Show error message if no filia is selected
        toast.error('Nie wybrano filii. Skontaktuj się z administratorem systemu.', {
          toastId: 'no-filia-error',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        // Navigate to root to show dashboard
        navigate('/', { replace: true })
      }
    }
  }
  // 'flex p-4 flex-col gap-2 items-center justify-center font-medium text-muted-foreground capitalize text-center'
  return (
    <header className='flex lg:place-content-center space-x-3 lg:gap-0 justify-end h-[78px] bg-card border-b border-slate-300 dark:border-slate-800  sticky top-0 z-[20] p-4 lg:p-0'>
      <FiliaChanger curFilia={currentFilia} className='lg:hidden' />

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
            // return true
          })
          .map((link) => (
            <div
              key={link.id}
              onClick={() => handleClick(link.id)}
            >
              <NavLink
                to={currentFilia ? `/${currentFilia}/${link.to}` : '/'}
                className={({ isActive, isPending, isTransitioning }) => cn(
                  "flex p-4 text-nonwrap flex-col space-x-2 items-center justify-center text-muted-foreground relative border-b-2 border-transparent capitalize text-center",
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
        <FiliaChanger curFilia={currentFilia} className='hidden lg:inline-flex' />
        <DarkModeButton className='hidden lg:inline-flex' />

      </nav>

    </header>
  )
}
interface FiliaChangerProps {
  curFilia?: string
  className?: string
}

const FiliaChanger: React.FC<FiliaChangerProps> = ({ curFilia, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  if (window.location.origin.includes(".37")) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilia = e.target.value;
    if (newFilia && newFilia.length > 0) {
      // Store the new filia in localStorage
      localStorage.setItem('curFilia', newFilia);
      
      // Get the current route (e.g., "informacje", "kafejka", etc.)
      const currentRoute = location.pathname.split('/')[2] || 'informacje';
      navigate(`/${newFilia}/${currentRoute}`);
    } else {
      // Show error if filia input is cleared
      toast.error('Nie wybrano filii. Skontaktuj się z administratorem systemu.', {
        toastId: 'no-filia-error',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      navigate('/', { replace: true })
    }
  };

  return (
    <Input 
      className={cn('w-fit max-w-16 border-2', className)} 
      defaultValue={curFilia} 
      onChange={handleChange} 
    />
  );
};