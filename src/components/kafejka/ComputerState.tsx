import { StateData } from '@/types/computer';
import { Button } from '../ui/button'
import { Lock, LockOpen, Power, RotateCcw } from 'lucide-react'
import { toast } from 'react-toastify'

// Define specific types for each onClick function signature
interface HandleStateChange {
  (params: StateData): void;
}


interface ComputerStateProps {
  computerID: number
  computerFlag: 0 | 1 | 2 | 5
  handleClick: HandleStateChange
  isPending: boolean
}

const ComputerState = ({
  computerID,
  computerFlag,
  handleClick,
  isPending,
}: ComputerStateProps) => {
  const handleButtonClick = () => {
    if (typeof handleClick !== 'function') {
      toast.error("handleClick is not a function");
      return;
    }

    switch (computerFlag) {
      case 0:
        handleClick({ id: computerID, flag: 1 });
        break;
      case 1:
        handleClick({ id: computerID, flag: 0 });
        break;
      case 2:
        handleClick({ id: computerID, flag: 2 });
        break;
      case 5:
        handleClick({ id: computerID, flag: 5 });
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
              : computerFlag === 5
                ? 'accent'
                : undefined
      }
      className="space-x-2 min-w-[116px]"
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
        <RotateCcw size={16} />
        <span>
          Restartuj
        </span>
      </>
      )}
      {computerFlag === 5 && (
        <>
          <Power size={16} />
          <span>
            Wyłącz
          </span>
        </>
      )}
    </Button>
  );
};

export default ComputerState;
