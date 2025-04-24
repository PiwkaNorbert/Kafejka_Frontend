import { Fragment, useState, useCallback, useReducer, useEffect } from 'react'
import { useParams } from 'react-router'
import { useEbookData } from '../hooks/useEbookData'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { Codes, GetCodesResponse } from '@/types/codes'
import { IP_PRZEKIEROWANIE } from '../constants'
import { Button } from '../components/ui/button'
import { toast } from 'react-toastify'
import {
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog'
import { Pencil } from 'lucide-react'
import { Input } from '../components/ui/input'
// Define the store type
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

const LegimiCodes = () => {
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'table')
  const legimiData = useEbookData()
  const { curFilia } = useParams()

  // check if the host is 200.40 if so then use tabs if not then just display table content and only show on filia id 99
  //TODO: usunac edycje na 200.37 pokaz tylko na 200.40
  const is20037 = window.location.hostname.includes(IP_PRZEKIEROWANIE)


  return (
    <>
      {curFilia === '99' && !is20037 ? (
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="table">Tabela</TabsTrigger>
            <TabsTrigger value="edit">Edycja</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="w-full">
            <div className="codes__container empty:hidden">
              <CodeForCurFilia />
            </div>

            <SideBar />

            <main className=" w-full p-6">
              <Table>
                <TableCaption>Lista kodów</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nazwa Filii</TableHead>
                    <TableHead className="text-center">Kody Legimi</TableHead>
                    <TableHead className="text-right">Adres</TableHead>
                  </TableRow>
                </TableHeader>

                <CodesTable />
              </Table>
            </main>
          </TabsContent>

          <TabsContent value="edit">
            <main className="w-full p-6">
              <FiliaCodesTable legimiData={legimiData} />
            </main>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="codes__container empty:hidden">
            <CodeForCurFilia />
          </div>

          <SideBar />

          <main className=" w-full p-6">
            <Table>
              <TableCaption>Lista kodów</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa Filii</TableHead>
                  <TableHead className="text-center">Kody Legimi</TableHead>
                  <TableHead className="text-right">Adres</TableHead>
                </TableRow>
              </TableHeader>

              <CodesTable />
            </Table>
          </main>
        </>
      )}
    </>
  )
}

export default LegimiCodes

const initialState = {
  data: [] as GetCodesResponse,
}

function reducer(
  state: typeof initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, data: action.payload }

    case 'UPDATE_CODE':
      return {
        ...state,
        data: state.data.map((filia) =>
          filia.FiliaIndex === action.payload.FiliaIndex
            ? action.payload
            : filia
        ),
      }
    default:
      return state
  }
}

const FiliaCodesTable: React.FC<{
  legimiData: UseQueryResult<GetCodesResponse, Error>
}> = ({ legimiData }) => {
  const { data, status, error, isLoading } = legimiData
  const queryClient = useQueryClient()

  const [editingFilia, setEditingFilia] = useState<Codes | null>(null)

  const [filias, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (data) {
      dispatch({ type: 'INITIALIZE', payload: data })
    }
  }, [data, status])

  const { mutate, isPending } = useMutation({
    mutationFn: (body: GetCodesResponse) => {
      return fetch('http://192.168.200.40:8081/update-codes', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      toast.success('Kody zostały zaktualizowane')
    },
    onError: (error) => {
      toast.error(`Wystąpił błąd podczas zapisu kodów: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['codes'],
      })
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Table className="w-full border-collapse">
      <TableCaption>Lista kodów</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Nazwa Filii</TableHead>
          <TableHead className="text-center">Legimi</TableHead>
          <TableHead className="text-right">Empik</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filias.data
          ?.sort((a: Codes, b: Codes) => a.FiliaIndex - b.FiliaIndex)
          .map((filia: Codes) => (
            <TableRow key={filia.FiliaName}>
              <TableCell>
                <Dialog>
                  <DialogTrigger
                    className="flex items-center gap-2 hover:text-primary"
                    onClick={() => setEditingFilia({ ...filia })}
                  >
                    {filia.FiliaName} <Pencil size={16} />
                  </DialogTrigger>
                  <DialogContent>
                    {editingFilia && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="mb-6 text-2xl font-bold text-muted-foreground">
                            {editingFilia.FiliaName}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-[auto_1fr] gap-4 text-lg [&>div]:col-span-full [&>div]:grid [&>div]:grid-cols-subgrid [&>div]:items-baseline [&>div]:justify-end">
                          <div>
                            <p>FiliaIndex</p>
                            <Input
                              value={editingFilia.FiliaIndex}
                              onChange={(e) =>
                                setEditingFilia({
                                  ...editingFilia,
                                  FiliaIndex: parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div>
                            <p>Nazwa Filii</p>
                            <Input
                              value={editingFilia.FiliaName}
                              onChange={(e) =>
                                setEditingFilia({
                                  ...editingFilia,
                                  FiliaName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <p>Link</p>
                            <Input
                              value={editingFilia.Link}
                              onChange={(e) =>
                                setEditingFilia({
                                  ...editingFilia,
                                  Link: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <p>Address</p>
                            <Input
                              value={editingFilia.Address}
                              onChange={(e) =>
                                setEditingFilia({
                                  ...editingFilia,
                                  Address: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-end">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="accent"
                              onClick={() => {
                                dispatch({
                                  type: 'UPDATE_CODE',
                                  payload: editingFilia,
                                })
                                mutate([editingFilia])
                                setEditingFilia(null)
                              }}
                            >
                              Zapisz i zamknij
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="py-2">
                <input
                  type="number"
                  value={filia.CodesNumber}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_CODE',
                      payload: {
                        ...filia,
                        CodesNumber: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full rounded border p-1"
                />
              </TableCell>
              <TableCell className="py-2">
                <input
                  type="number"
                  value={filia.EmpikNumber}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_CODE',
                      payload: {
                        ...filia,
                        EmpikNumber: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full rounded border p-1"
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <Button
        disabled={isPending}
        onClick={() => {
          mutate(filias.data)
        }}
      >
        Zapisz
      </Button>
    </Table>
  )
}

const CodesTable: React.FC = () => {
  const { data, status, error, isLoading } = useEbookData()
  const { toggleLegimi } = useFilters()

  return (
    <TableBody>
      {isLoading && (
        <TableRow>
          <TableCell colSpan={3}>Loading...</TableCell>
        </TableRow>
      )}
      {status === 'error' && (
        <TableRow>
          <TableCell colSpan={3}>{error?.message} </TableCell>
        </TableRow>
      )}
      {status === 'success' &&
          data
          ?.sort((a: Codes, b: Codes) => a.FiliaIndex - b.FiliaIndex)
          ?.filter((code: Codes) => code.CodesNumber !== 0 || !toggleLegimi)
          ?.map((code: Codes, idx: number) => {
            return (
              <TableRow key={idx}>
                <TableCell data-cell="Nazwa Filii">{code.FiliaName}</TableCell>
                <TableCell data-cell="Kody Legimi" className="text-center">
                  {code.CodesNumber}
                </TableCell>
                <TableCell data-cell="Adres" className="text-right">
                  {code.Address}
                </TableCell>
              </TableRow>
            )
          })}
    </TableBody>
  )
}

const CodeForCurFilia = () => {
  // const queryClient = useQueryClient()
  // const url = `${IP_POWROZNICZA}:8000/`
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

  const specificCode = data?.find((code) =>
    filia === undefined ? true : code.FiliaIndex === +filia
  )

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {status === 'error' && (
        <div>
          <p>{error?.message} </p>
        </div>
      )}
      {status === 'success' &&
        filia !== '' &&
        curFilia !== undefined &&
        specificCode && (
          <Fragment>
            <div className="">
              <h1 className="mb-6 text-center text-2xl font-bold">
                {specificCode.FiliaName}
              </h1>
            </div>
            <div className="mx-auto grid max-w-sm space-y-2 divide-y rounded-lg bg-card p-3 shadow-md">
              <ChangeCodeButtons
                amount={specificCode.CodesNumber}
                type="legimi"
              >
                <span className="min-w-8 text-center text-lg font-bold tabular-nums">
                  {specificCode.CodesNumber}
                </span>
              </ChangeCodeButtons>
              <ChangeCodeButtons amount={specificCode.EmpikNumber} type="empik">
                <span className="min-w-8 text-center text-lg font-bold tabular-nums">
                  {specificCode.EmpikNumber}
                </span>
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
