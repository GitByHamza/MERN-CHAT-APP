import { create } from 'zustand'

const useConservation = create((set)=> ({
    selectedConservation : null,
    setSelectedConservation : (selectedConservation) => set({selectedConservation}),
    messages:[],
    setMessages : (messages) => set({messages})
}))

export default useConservation