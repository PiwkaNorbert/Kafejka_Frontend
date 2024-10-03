import { StateData } from '@/types/computer';
import { Button } from '../ui/button'
import { Lock, LockOpen, LogOut, Power, RotateCw } from 'lucide-react'
import { toast } from 'react-toastify'
import { cn } from '../../lib/utils';

// Define specific types for each onClick function signature
interface HandleStateChange {
  (params: StateData): void;
}


interface ComputerStateProps {
  computerID: number
  computerFlag: 0 | 1 | 2 | 3 | 6
  handleClick: HandleStateChange
  isPending: boolean
  className?: string
}

const ComputerState = ({
  computerID,
  computerFlag,
  handleClick,
  isPending,
  className
}: ComputerStateProps) => {
  const handleButtonClick = () => {
    if (typeof handleClick !== 'function') {
      toast.error("handleClick is not a function");
      return;
    }

    switch (computerFlag) {
      case 0: 
        handleClick({ id: computerID, flag: 1 }); //odblokowany
        break;
      case 1:
        handleClick({ id: computerID, flag: 0 }); //zablokowany
        break;
      case 2:
        handleClick({ id: computerID, flag: 2 }); //reset czasowy
        break;
      case 3:
        handleClick({ id: computerID, flag: 3 }); //wyloguj
        break;
      case 6:
        handleClick({ id: computerID, flag: 6 }); //shutdown czasowy
        break;
      default:
        toast.error('Nieprawidłowa flaga komputera. Nie można zmienić stanu.');
    }
  };

  return (
    <Button
      disabled={isPending}
      variant={
        computerFlag === 1
          ? 'secondary'
          : computerFlag === 0
            ? 'destructive'
            : computerFlag === 2
              ? 'tertiary'
              : computerFlag === 6
                ? 'accent'
                : computerFlag === 3
                ? 'quaternary'
                : "accent"
      }
      className={cn("space-x-2 min-w-[116px] group", className)}
      onClick={handleButtonClick}
    >
      {computerFlag === 0 && (
        <>
          <LockOpen size={16} />
          <span>
            Odblokuj
          </span>
        </>
      )}
      {computerFlag === 1 && (
        <>
          <Lock size={16} />
          <span>
            Zablokuj
          </span>
        </>
      )}
      {computerFlag === 2 && (<>
        <RotateCw size={16} className='group-hover:animate-spin' />
        <span>
          Restartuj
        </span>
      </>
      )}
      {computerFlag === 6 && (
        <>
          <Power size={16} />
          <span>
            Wyłącz
          </span>
        </>
      )}
       {computerFlag === 3 && (
        <>
          <LogOut size={16} className='' />
          <span>
            Wyloguj
          </span>
        </>
      )}
    </Button>
  );
};

export default ComputerState;
