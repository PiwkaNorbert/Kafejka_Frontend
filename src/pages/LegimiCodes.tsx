
  import { Fragment } from 'react'
  import { useParams } from 'react-router-dom'
  import { useEbookData } from '../hooks/useEbookData'
  import { IP_POWROZNICZA } from '../constants'
  
  
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '../components/ui/table'
  import SideBar from '../components/SideBar'
import ChangeCodeButtons from '../components/ChangeCodeButtons'
import { useFilters } from '../hooks/useFilters'
  
  const LegimiCodes = () => {

  
    return (
      <>
        
          <div className="codes__container empty:hidden">
            <CodeForCurFilia />
          </div>
          <SideBar />
          
          <main className=" p-6 w-full">
  
          <Table>
            <TableCaption>Lista kodów</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa Filii</TableHead>
                <TableHead className='text-center'>Kody Legimi</TableHead>
                <TableHead className='text-right'>Adres</TableHead>
              </TableRow>
            </TableHeader>
           
            <CodesTable />
          </Table>
          </main>
 
        <footer className="footer-wrap">
          <div className="ftr-container">
            <span>
              Copyright
              <br />
              <a>Mateusz Rozycki</a> &amp;
              <a> Norbert Piwka</a> <br />
              2022 <br />
            </span>
          </div>
        </footer>
      </>
    )
  }
  
  export default LegimiCodes
  
  
  const CodesTable = () => {
    const { data, status, error, isLoading } = useEbookData()
    const { toggleLegimi } = useFilters()

  
    return (
      <TableBody>
      {isLoading && (
        <TableRow>
          <TableCell colSpan={4}>Loading...</TableCell>
        </TableRow>
      )}
      {status === 'error' && (
        <TableRow>
          <TableCell colSpan={4}>{error?.message} </TableCell>
        </TableRow>
      )}
      {status === 'success'  &&
        data
        ?.filter((code)=> code.fields.codesNumber !== 0 || !toggleLegimi)
        ?.map((code, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell data-cell="Nazwa Filii">{code.fields.filiaName}</TableCell>
                <TableCell data-cell="Kody Legimi" className='text-center'>{code.fields.codesNumber}</TableCell>
                <TableCell data-cell="Adres" className='text-right'>{code.fields.address}</TableCell>
              </TableRow>
            )
          })}
    </TableBody>
    )
  }


  
  const CodeForCurFilia = () => {
    // const queryClient = useQueryClient()
    const url = `${IP_POWROZNICZA}:8000/`
    // const formRef = useRef<HTMLFormElement | null>(null)

      
    //         const {mutate: codeInputMutation, isPending} = useMutation({
    //         mutationFn: (body: {amount:number, type: string}) => {
    //           // use axios.post
    //           return axios.post(`${url}start-point/${curFilia}/`, body, {
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //           })
    //         },
    //           onError: error => {
    //             toast.error(error.message, {
    //               toastId: 'LegitmiCodes',
    //               position: 'top-right',
    //             })
    //           },
    //           onSettled: () => {
    //             queryClient.invalidateQueries({queryKey: ['codes']})
    //           },
    //         }
    //       )
    
      // const {
      //   showInputs,
      // } = useSidebarAndFilters();

    const { data, status, error, isLoading } = useEbookData()
    const { curFilia } = useParams()


    const filia = curFilia ?? '0'

    const specificCode = data?.find(code =>
      filia === undefined ? true : code.fields.index === +filia
    )
 
    return (
      <>
        {isLoading && (
          <div>Loading...</div>
        )}
        {status === 'error' && (
          <div>
            <p >{error?.message} </p>
          </div>
        )}
        {status === 'success' && filia !== '' && curFilia !== undefined && specificCode &&  (

          <Fragment>
            <div className="">
              <h1 className="text-2xl font-bold mb-6 text-center">{specificCode.fields.filiaName}</h1>
            </div>
            <div className="grid bg-background p-3 divide-y rounded-lg space-y-2 shadow-md max-w-sm mx-auto">
            
              <ChangeCodeButtons url={url} amount={specificCode.fields.codesNumber} type='legimi' >
                  <span className="font-bold tabular-nums min-w-8 text-center text-lg">{specificCode.fields.codesNumber}</span>
              </ChangeCodeButtons>
              <ChangeCodeButtons url={url} amount={specificCode.fields.empikNumber} type='empik' >
                  <span className="font-bold tabular-nums min-w-8 text-center text-lg">{specificCode.fields.empikNumber}</span>
              </ChangeCodeButtons>
                  
            </div>
            
          </Fragment>
        )}
      </>
      )
    }


    // {showInputs && (
    //   <form
    //     ref={formRef}
    //     className="codes__form-codes"
    //     onSubmit={e => {
    //       e.preventDefault()
    //       const legimi = new FormData(e.currentTarget).get("legimi")
    //       const legimiNumber = Number(legimi)

    //       if (typeof legimiNumber !== 'number') {
    //         toast.error("Error:")
    //       }
          
    //       codeInputMutation({
    //           amount: legimiNumber,
    //           type: 'legimi',
    //         },
    //         {
    //           onSuccess: response => {
    //             toast.success(
    //               `${response.data[0].fields.codesNumber} Kody Legimi `,
    //               {
    //                 toastId: 'LegitmiCodes',
    //                 position: 'top-right',
    //               }
    //             )
    //             if (formRef.current) {
    //               formRef.current.reset()
    //             }
    //           },
    //         }
    //       )
    //     }}
    //   >
    //     <input
    //       maxLength={3}
    //       min="0"
    //       max="999"
    //       type="number"
    //       name="legimi"
    //       className="counter__code-input "
    //       placeholder={specificCode.fields.codesNumber?.toString()}
    //       onChange={e => {
    //         if (
    //           e.target.value.length <= 3 &&
    //           e.target.value.length >= 0
    //         ) {
    //           // setInputValueLegimi(e.target.value)
    //         } else {
    //           toast.error(
    //             'Legimi, proszę wpisać liczbę od 0 do 999',
    //             {
    //               toastId: 'LegimiCodes',
    //               position: 'top-right',
    //             }
    //           )
    //           console.error('Proszę wpisać liczbę od 0 do 999')
    //         }
    //       }}
    //     />
    //     <Button
    //       type="submit"
    //       variant='outline'
    //       size={"icon"}
    //       disabled={isPending}
    //     >
    //       <CheckIcon />
    //     </Button>
    //   </form>
    // )}