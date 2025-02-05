import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {
  CheckIcon,
  InfoIcon,
  ListTodo,
  RefreshCw,
  X
} from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { SanitizedFormattedDescription } from '../components/serialized-formatted-description'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { Textarea } from '../components/ui/text-area'
import { IP_POWROZNICZA, statesObject } from '../constants'
import useTaskListData from '../hooks/useTaskListData'
import useTicketCategoryData from '../hooks/useTicketCategoryData'
import useTicketGroupData from '../hooks/useTicketGroupData'
import { cn } from '../lib/utils'
import { Category, CategoryResponse } from '../types/categories'

const wait = () => new Promise((resolve) => setTimeout(resolve, 200))

const ticketSchema = z.object({
  index: z.string(),
  title: z.string(),
  description: z.string(),
  group: z.string(),
})
type TicketData = z.infer<typeof ticketSchema>

function validateInputs(
  title: string,
  description: string,
  group: string,
  curFilia: string | undefined
) {
  if (title === '' || typeof title !== 'string') {
    return 'Proszę wybrać problem...'
  }
  if (description === '' || typeof description !== 'string') {
    return 'Opisz problem... '
  }
  if (group === '' || typeof group !== 'string') {
    return 'Grupa musi być tekstem'
  }
  if (curFilia === undefined) {
    return 'curFilia nie może być puste'
  }
  return null // Brak błędów
}

export default function TicketPage() {
  const { curFilia } = useParams()
  const filia = curFilia ?? ''

  const {
    data: data,
    status,
    error,
    isLoading,
    refetch,
  } = useTaskListData(filia)

  return (
    <React.Fragment>
      <div className="grid grid-cols-[auto_auto] justify-end gap-x-4">
        <Button
          className="group space-x-2"
          onClick={() => {
            refetch()
          }}
        >
          <RefreshCw size={16} className="group-hover:animate-spin" />
          <span>Odśwież</span>
        </Button>
        <CreateTicket filia={filia} />
      </div>

      <main className="w-full rounded-lg bg-card p-6 shadow-lg">
        <Table>
          <TableCaption>Lista zgłoszeń do wykonania</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] tabular-nums">ID</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
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

            {status === 'success' && data?.tasks_list.length === 0 && (
              <TableRow className="w-full bg-primary/15 p-4 text-primary hover:bg-primary/15">
                <TableCell colSpan={4}>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 ">
                    <InfoIcon size={20} className="mt-0.5 self-start" /> Brak
                    zgłoszeń na danej Filii.
                  </div>
                </TableCell>
              </TableRow>
            )}
            {status === 'success' &&
              data?.tasks_list &&
              data?.tasks_list.length > 0 &&
              data?.tasks_list
                // sort if finised is true then at the bottom
                ?.sort((a, b) => b.id - a.id)
                ?.map((task, idx) => {
                  const entityId = task?.id.toString()

                  return (
                    <TableRow key={idx}>
                      <TableCell data-cell="ID" className="tabular-nums">
                        {entityId}
                      </TableCell>
                      <TableCell data-cell="Problem">{task.title}</TableCell>
                      <TableCell data-cell="Opis">
                        <SanitizedFormattedDescription
                          description={task.description}
                        />
                      </TableCell>
                      <TableCell data-cell="Status">
                        <CurrentState
                          selectedState={task.state}
                          name={task.state_string}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </main>
    </React.Fragment>
  )
}

interface IGroupSelector {
  handleShowProblem: () => void
}

export function CreateTicket({ filia }: { filia: string }) {
  const queryClient = useQueryClient()

  const [open, setOpen] = React.useState(false)
  const [showProblem, setShowProblem] = useState<boolean>(false)

  const formRef = React.useRef<HTMLFormElement>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: async (requestData: TicketData) => {
      const { data, status } = await axios.post(
        IP_POWROZNICZA + ':8080/create-request/',
        requestData
      )
      if (status !== 200) throw new Error('asdasa')
      return data
    },
  })
  const handleShowProblem = () => setShowProblem(true)

  const handleSendTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const group = form.get('group') as string | null
    const title = form.get('title') as string | null
    const description = (form.get('description') as string | null) || ''
    const index = filia // assuming curFilia is string | undefined

    // Convert null to empty strings or handle it as needed
    const errorMessage = validateInputs(
      title ?? '',
      description,
      group ?? '',
      index
    )

    if (errorMessage) {
      return toast.error(errorMessage)
    }

    const ticketData: TicketData = {
      index: index as string, // Ensure index is the expected type here
      title: title as string,
      description: description as string,
      group: group as string,
    }

    const result = ticketSchema.safeParse(ticketData)

    if (!result.success) {
      console.error('Validation failed', result.error)
      return toast.error('Komputer niezostał dodany', { icon: <X /> })
    }

    mutate(result.data, {
      onSuccess: () => {
        toast.success('Zgłosznie zostało wysłane', { icon: <CheckIcon /> })
        // queryClient.setQueryData({ queryKey: ['komps', curFilia] }, old => {

        // });
      },
      onSettled: () => {
        if (formRef.current) {
          formRef.current.reset()
        }
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.every((key: unknown) =>
              ['categories', 'unautherized-tasks'].includes(key as string)
            ),
        })

        wait().then(() => setOpen(false))
        setShowProblem(false)
      },
      onError: (error) => {
        console.error(error)
        toast.error(`Nastąpił Błąd w TicketPage.tsx ${error.message}`, {
          icon: <X />,
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="ml-auto rounded-md bg-card shadow">
          <Button
            className="space-x-2"
            onClick={() => {
              setShowProblem(false)
            }}
          >
            <ListTodo size={16} /> <span>Złóż zgłoszenie</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Złóż zgłoszenie</DialogTitle>
          <DialogDescription>
            <form
              ref={formRef}
              className="flex flex-col space-y-4"
              onSubmit={handleSendTicket}
            >
              <section className="flex flex-col ">
                <label htmlFor="title" className="pb-2 text-sm text-slate-500">
                  Dział
                </label>
                <GroupSelector handleShowProblem={handleShowProblem} />
              </section>
              {showProblem === true ? (
                <React.Fragment>
                  <section className="flex flex-col ">
                    <label
                      htmlFor="title"
                      className="pb-2 text-sm text-slate-500"
                    >
                      Problem
                    </label>
                    <CategorySelector />
                  </section>

                  <section className="flex flex-col space-y-2">
                    <label
                      htmlFor="description"
                      className=" text-sm text-slate-500"
                    >
                      Opis
                    </label>
                    <Textarea
                      placeholder="Opisz swój problem..."
                      name="description"
                    />
                  </section>
                </React.Fragment>
              ) : null}

              <Button
                variant="accent"
                disabled={showProblem === false || isPending}
              >
                {isPending ? 'Zgłaszanie Problemu...' : 'Zgłoś Problem'}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export function GroupSelector({ handleShowProblem }: IGroupSelector) {
  const { data: groups, error, status } = useTicketGroupData()

  return (
    <>
      <Select
        name="group"
        required
        onValueChange={(e) => {
          if (e.length > 0) handleShowProblem()
        }}
      >
        <SelectTrigger className="capitalize">
          <SelectValue placeholder="Wybierz dział..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="font-normal capitalize"
            value="puste"
            disabled={true}
          >
            Wybierz dział...
          </SelectItem>
          {groups?.map((group) => {
            const inputString = group.name
            const regex = /CN=([^,]+)/
            const match = inputString.match(regex)
            let groupName: string = ''

            if (match) {
              const fullname = match[1]
              groupName = fullname.split('_')[1]
            }

            return (
              <SelectItem
                key={group.id}
                className="font-normal capitalize"
                value={group.id.toString()}
                disabled={group.id !== 1} // only let informatyzacja be selected for now
              >
                {groupName}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      {status === 'error' ? <div>{error?.message}</div> : ''}
    </>
  )
}

const CurrentState = ({
  selectedState,
  name,
}: {
  selectedState: number
  name: string
}) => {
  function getTaskStyle(taskState: number | string): string | undefined {
    const state = statesObject.find(
      (state) => state.id === taskState || state.name === taskState
    )
    return state ? state.style : ''
  }

  const bgColor = getTaskStyle(selectedState)
  return (
    <div
      className={cn(
        'w-36 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        bgColor
      )}
    >
      <span className="sr-only"> {name}</span>

      {name}
    </div>
  )
}

export function CategorySelector() {
  // const [selectedCategory, setSelectedCategory] = useState<string>('')
  const { data: categories, error, status } = useTicketCategoryData()

  return (
    <>
      <Select
        name="title"
        onValueChange={(e) => {
          // setSelectedCategory(e)
          return e
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Wybierz problem..." />
        </SelectTrigger>
        <SelectContent>
          {status === 'success' && categories ? renderTitles(categories) : null}
        </SelectContent>
      </Select>
      {status === 'error' ? <div>{error?.message}</div> : ''}
      {/* {selectedCategory.length > 0 && categories ? (
        <div className="bg-foreground shadow text-background rounded-lg fixed  top-1/3 right-2 w-22 h-22 p-6">
          {renderCategories(categories, selectedCategory)}
        </div>
      ) : null} */}
    </>
  )
}

// const renderCategories = (
//   categories: CategoryResponse,
//   selectedCategory: string
// ) => {
//   return categories
//     ?.filter(category =>
//       category?.children?.map(cat => cat.title === selectedCategory)
//     )
//     ?.map(category =>
//       category?.children
//         ?.filter(child => child.title === selectedCategory)
//         .map(child => (
//           <div key={child.id}>
//             <h3>{child.title}</h3>
//             <p>{child.tips}</p>
//           </div>
//         ))
//     )
// }

const renderCategory = (category: Category) => {
  if (category.children && category.children.length > 0) {
    return (
      <SelectGroup className="pl-4 font-semibold" key={category.id}>
        {category.title}
        {category.children.map((child) => (
          <React.Fragment key={child.id}>
            {renderCategory(child)}
          </React.Fragment>
        ))}
      </SelectGroup>
    )
  } else {
    return (
      <SelectItem
        key={category.id}
        className="font-normal"
        value={category.title}
      >
        {category.title}
      </SelectItem>
    )
  }
}
const renderTitles = (categories: CategoryResponse) => {
  return categories.map((category) => (
    <React.Fragment key={category.id}>
      {renderCategory(category)}
    </React.Fragment>
  ))
}
