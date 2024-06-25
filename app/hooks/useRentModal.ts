'use client';
import {create} from 'zustand'

interface LRentModalStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useLRentModal = create<LRentModalStore>((set) => ({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false}),

}))

export default useLRentModal

