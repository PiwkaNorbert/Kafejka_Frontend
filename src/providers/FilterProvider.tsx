import { type ReactNode, createContext, useReducer } from 'react'

export interface FilterContextType {
  toggleLegimi: boolean
  toggleEmpik: boolean
  sidebarOpen: boolean
  toggleInputs: boolean
  handleToggleSidebar: (checked: boolean) => void
  handleFilterLegimi: (checked: boolean) => void
  handleFilterEmpik: (checked: boolean) => void
  handleCodes: (checked: boolean) => void
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
)

type Props = { children: ReactNode }
type State = {
  sidebarOpen: boolean
  toggleLegimi: boolean
  toggleEmpik: boolean
  toggleInputs: boolean
}
type Action = { type: string; payload: boolean }

function reducer(state: State, action: Action) {
  if (action.type === 'TOGGLE_SIDEBAR') {
    localStorage.setItem('sidebar', JSON.stringify(action.payload))
    return { ...state, sidebarOpen: action.payload }
  } else if (action.type === 'TOGGLE_LEGIMI') {
    return { ...state, toggleLegimi: action.payload }
  } else if (action.type === 'TOGGLE_EMPIK') {
    return { ...state, toggleEmpik: action.payload }
  } else if (action.type === 'TOGGLE_INPUTS') {
    return { ...state, toggleInputs: action.payload }
  } else {
    throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const FilterProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    sidebarOpen: false,
    toggleLegimi: false,
    toggleEmpik: false,
    toggleInputs: false,
  })

  const handleToggleSidebar = (checked: boolean): void =>
    dispatch({ type: 'TOGGLE_SIDEBAR', payload: checked })

  const handleFilterLegimi = (checked: boolean): void =>
    dispatch({ type: 'TOGGLE_LEGIMI', payload: checked })

  const handleFilterEmpik = (checked: boolean): void =>
    dispatch({ type: 'TOGGLE_EMPIK', payload: checked })

  const handleCodes = (checked: boolean): void =>
    dispatch({ type: 'TOGGLE_INPUTS', payload: checked })

  return (
    <FilterContext.Provider
      value={{
        handleCodes,
        handleFilterEmpik,
        handleFilterLegimi,
        handleToggleSidebar,
        toggleInputs: state.toggleInputs,
        toggleEmpik: state.toggleEmpik,
        toggleLegimi: state.toggleLegimi,
        sidebarOpen: state.sidebarOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
