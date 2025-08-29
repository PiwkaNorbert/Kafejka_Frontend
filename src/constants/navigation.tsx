import {
  Info,
  LaptopMinimal,
  Settings,
  Wifi,
  BookOpen,
  BadgeHelp,
} from 'lucide-react'

export const navLinks = [
  { id: 0, to: 'informacje', icon: <Info size={20} />, label: 'Informacje' },
  { id: 1, to: 'kafejka', icon: <LaptopMinimal size={20} />, label: 'Kafejka' },
  {
    id: 2,
    to: 'ustawienia',
    icon: <Settings size={20} />,
    label: 'Ustawienia',
  },
  { id: 3, to: 'wifi', icon: <Wifi size={20} />, label: 'Wi-Fi' },
  { id: 4, to: 'ebooki', icon: <BookOpen size={20} />, label: 'Ebooki' },
  {
    id: 5,
    to: 'zgloszenia',
    icon: <BadgeHelp size={20} />,
    label: 'Zgłoszenia',
  },
]
