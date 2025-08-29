import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../lib/utils'

export default function DarkModeButton({ className }: { className: string }) {
  const { theme, handleToggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      className={cn('rounded-lg border-2 px-2', className)}
      // className="darkmode-bg"
      onClick={() => handleToggleTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  )
}
