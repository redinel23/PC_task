<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center mt-10">
            <Modal v-if="isOpen"/>
            <UpdateModal v-if="updateModalOpen" :user="userSelected"/>
            <div class="sm:mt-0 sm:flex-none w-full">
                <button type="button"
                        @click="openModal"
                        class="block rounded-md ml-auto bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white
                        shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-indigo-600"> + Create New User
                </button>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full">
                        <thead>
                        <tr>
                            <th scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-800 sm:pl-3">ID
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">Name</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">Email</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">Phone</th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody class="border-spacing-2">
                        <tr class="border border-gray-400" v-for="user in users" :key="user.id">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-3">
                                {{ user.id }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ user.name }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ user.email }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ user.phone }}</td>
                            <td class="whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium relative flex sm:pr-0 gap-2">
                                <div class="absolute flex xl:left-16 lg:left-4 sm:left-0 md:left-0 sm:gap-2 md:gap-4">
                                    <!--                  Edit User         -->
                                    <span @click="openUpdateModal(user)" class="cursor-pointer">
                                    <svg width="25px" height="25px"
                                         viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                                d="M14.846 1.403l3.752 3.753.625-.626A2.653 2.653 0 0015.471.778l-.625.625zm2.029
                                            5.472l-3.752-3.753L1.218 15.028 0 19.998l4.97-1.217L16.875 6.875z"
                                                fill="#808080"/></svg>
                                </span>
                                    <!--            Delete User        -->
                                    <span @click="deleteUser(user.id)" class="cursor-pointer">
                                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10 11V17" stroke="#808080" stroke-width="1" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                      <path d="M14 11V17" stroke="#808080" stroke-width="1" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                      <path d="M4 7H20" stroke="#808080" stroke-width="1" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                      <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                            stroke="#808080" stroke-width="1"
                                            stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#808080" stroke-width="1"
                                            stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                </span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useUserStore} from "@/stores/userStore";
import {computed, onMounted, ref} from "vue";
import Modal from "@/components/CreateModal.vue";
import UpdateModal from "@/components/UpdateModal.vue";

const userStore = useUserStore();
const users = computed(() => userStore.users);

const userSelected = computed(() => userStore.user)

const modal = useUserStore();

let isOpen = computed(() => modal.isOpen)
let updateModalOpen = computed(() => modal.updateModalOpen)

const openModal = () => {
    modal.openModal();
}

const openUpdateModal = (user) => {
    modal.openUpdateModal(user)
}

const deleteUser = (id) => {
    userStore.deleteUser(id);
}

const updateUser = (user) => {
    userStore.updateUser(user)
}

onMounted(() => {
    userStore.fetchUsers();
})
</script>