import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react'
import { useChangeCodes } from '../hooks/mutations/useChangeCodes';

const ChangeCodeButtons = ({ url, amount, type, children } : { url:string, amount: number, type: "legimi" | "empik", children?: React.ReactNode }) => {

  const { onChange, changeCodesMutation } = useChangeCodes(url)

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-center first:pt-0 pt-2">
      <h1 className="align-middle font-medium text-muted-foreground capitalize  text-center" >
        {type}
      </h1>
      <div className="flex space-x-2 items-center justify-center">
        <Button
          disabled={changeCodesMutation.isPending || amount === 0}
          variant='destructive'
          type="submit"
          onClick={() => {
            onChange({action:'sub', type});
          }}
        > 
          <Minus size={16} />
        </Button>

        {children}

        <Button
          disabled={changeCodesMutation.isPending}
          variant='secondary'
          type="submit"
          onClick={() => {
            onChange({action:'add', type});
          }}
        >
          <Plus size={16} />
        </Button>
      </div>
      </div>
  );
};

export default ChangeCodeButtons;
