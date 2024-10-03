export const IP_POWROZNICZA = "http://192.168.200.40"
export const IP_PRZEKIEROWANIE = "http://192.168.200.37"
export const TIME_ONLINE = 25

export const statesObject:  { id:number , name: string, style?: string }[]  = 
[
  { id: 1, name: 'Nowe', style: '!bg-gray-100 text-gray-500 border border-gray-300 hover:!text-gray-500 hover:!border-gray-300/80' },
  { id: 2, name: 'Przypisane', style: '!bg-blue-100 text-blue-500 border border-blue-300 hover:!text-blue-500 hover:!border-blue-300/80' },
  { id: 3, name: 'W Trakcie', style: '!bg-yellow-100 text-yellow-500 border border-yellow-300 hover:!text-yellow-500 hover:!border-yellow-300/80' },
  { id: 4, name: 'Wstrzymane', style: '!bg-orange-100 text-orange-500 border border-orange-300 hover:!text-orange-500 hover:!border-orange-300/80' },
  { id: 5, name: 'Odroczone', style: '!bg-purple-100 text-purple-500 border border-purple-300 hover:!text-purple-500 hover:!border-purple-300/80' },
  { id: 6, name: 'Nieudane', style: '!bg-red-100 text-red-500 border border-red-300 hover:!text-red-500 hover:!border-red-300/80' },
  { id: 7, name: 'Anulowane', style: '!bg-gray-400 text-gray-800 border border-gray-500 hover:!text-gray-700 hover:!border-gray-500/80' },
  { id: 8, name: 'Zakończone', style: '!bg-green-100 text-green-500 border border-green-300 hover:!text-green-500 hover:!border-green-300/80' }
]