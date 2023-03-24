import { defineStore } from 'pinia'

export const adminStore = defineStore(
    'admin',
    {
        state: () => (
            {
                admin:{

                }
            }
        ),
        // persist: true,
        getters: {
            // doubleCount: (state) => state.count * 2,
        },
        actions: {
            
        },
    })