import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    username:string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    }
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: [] as User[],
        user: {},
        isOpen: false,
        checkboxClicked: false,
        updateModalOpen: false,
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
                this.users = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async addUser(user: User) {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/users', user)
                this.users.push(response.data)
            } catch (error) {
                console.error(error)
            }
        },
        async deleteUser(id: number) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
                // Update the state to remove the deleted user
                this.users = this.users.filter(user => user.id !== id);
            } catch (error) {
                console.error(error);
            }
        },
        async updateUser(updatedUser: User) {
            try {
                await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
                // Update the state to reflect the updated user
                this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
            } catch (error) {
                console.error(error);
            }
        },
        openModal() {
            this.isOpen = true;
        },
        closeModal() {
            this.isOpen = false;
        },
        openUpdateModal(user:Array<any>) {
          this.updateModalOpen = true
            this.user = user
            console.log(user, 'user')
        },
        closeUpdateModal() {
            this.updateModalOpen = false
        },
        useGoogleLocation() {
            this.checkboxClicked = !this.checkboxClicked
        }
    },
});
