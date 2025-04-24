import { useEffect, useRef } from 'react';
import { Computer } from '@/types/computer';
import { Input } from '../ui/input';
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation';
import { cn } from '../../lib/utils';

const ComputerAssignFilia = ({ computer, url }: { computer: Computer; url: string; }) => {
  const computerID = computer.id;
  const { filia } = computer;
  const formRef = useRef<HTMLFormElement>(null);
  const { onStateChange } = useChangeStateByIDMutation(url);


  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [computerID]);

  return (
    <form ref={formRef} onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const filia = formData.get('assigned-filia') as string;

      onStateChange({ id: computerID, filia });

      if (formRef.current) formRef.current.reset();

    }}>
      <section className="flex flex-col ">
        <label
          htmlFor="assigned-filia"
          className="pb-2 text-sm text-muted-foreground  flex items-center justify-between"
        >
          Filia <span className='text-xs text-muted-foreground text-end"'>
           ID {computerID}

          </span>
        </label>
        <Input name='assigned-filia' placeholder={filia.toString()} className={cn( computer.katalog === 1 && 'bg-border border-card')} />
      </section>
    </form>
  );
};
export default ComputerAssignFilia