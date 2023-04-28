<template>
    <div v-if="updateModalOpen" class="fixed z-10 inset-0 overflow-y-auto">

        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <!-- Background overlay -->
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- Modal -->
            <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-3xl sm:max-w-lg sm:w-full">
                <div class=" flex bg-gray-50 px-5 py-5 border-b justify-center text-center">
                    <h3 class="text-lg font-medium text-gray-600">{{ header }}</h3>
                    <button type="button"
                            class="px-2 bg-gray-200 rounded-full py-2 text-white font-medium ml-auto"
                            @click="closeModal">
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="Menu / Close_MD">
                                <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#525252"
                                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <form @submit.prevent="submitForm">
                        <div class="grid grid-cols-4 gap-4 relative">
                            <div class="col-span-2">
                                <label class="label">Full Name</label>
                                <input
                                        class="input"
                                        placeholder="John Gonzales"
                                        v-model="userCredentials.name"
                                        type="text"
                                />
                            </div>
                            <input
                                    type="checkbox"
                                    v-model="checkboxClicked"
                                    @click="useGoogleLocation"
                                    class="absolute top-1.5 right-52"
                            />
                            <span
                                    class="absolute top-0.5 right-16 text-gray-600 font-normal text-sm">
                                Use Google Location
                            </span>
                            <div class="col-span-2 ">
                                <label class="label">Address</label>
                                <input
                                        class="input"
                                        placeholder="Reter 43"
                                        v-model="userCredentials.address.street"
                                        type="text"
                                />
                            </div>

                            <div class="col-span-2">
                                <label class="label">Username</label>
                                <input
                                        class="input"
                                        placeholder="johngonzales13"
                                        v-model.number="userCredentials.username"
                                        type="text"
                                />
                            </div>
                            <div class="col-span-2">
                                <label class="label">City</label>
                                <input
                                        class="input"
                                        placeholder="Tirana"
                                        v-model="userCredentials.address.city"
                                        type="text"
                                />
                            </div>

                            <div class="col-span-2">
                                <label class="label">Email</label>
                                <input
                                        class="input"
                                        placeholder="johngonzales1331@gmail.com"
                                        v-model.number="userCredentials.email"
                                        type="text"
                                        @blur="validateEmail"
                                />
                                <span v-if="emailError" class="text-red-500 flex mr-auto">{{ emailError }}</span>
                            </div>

                            <div class="col-span-2">
                                <label class="label">Zip Code</label>
                                <input
                                        class="input"
                                        placeholder="1060"
                                        v-model.number="userCredentials.address.zipcode"
                                        type="text"
                                />
                            </div>

                            <div class="col-span-2">
                                <label class="label">Phone Nr</label>
                                <input
                                        class="input"
                                        placeholder="+355 69 76 76 654"
                                        v-model="userCredentials.phone"
                                        type="text"
                                        @blur="validatePhone"
                                />
                                <span v-if="phoneError" class="text-red-500 flex mr-auto">{{ phoneError }}</span>
                            </div>

                            <div v-if="checkboxClicked" class="col-span-1">
                                <label class="label">Latitude</label>
                                <input
                                        placeholder="41.327953"
                                        v-model="userCredentials.address.lat"
                                        class="input"
                                        type="text"
                                />
                            </div>

                            <div v-if="checkboxClicked" class="col-span-1">
                                <label class="label">Longitude</label>
                                <input
                                        class="input"
                                        v-model="userCredentials.address.lng"
                                        placeholder="19.819025"
                                        type="text"
                                />
                            </div>
                        </div>
                    </form>
                    <div class="flex justify-end">
                        <button type="button"
                                class="w-40 ml-4 mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                                @click="submitForm">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {computed, reactive, ref} from "vue";
import {useUserStore} from "@/stores/userStore";

const props = defineProps({
    header: {
        type: String,
        default: 'New User Info',
    },
    user: {
        type: Object
    }
})

// Reactive Data with User Object
const userCredentials = reactive({
    id: props.user.id,
    name: props.user.name,
    username: props.user.username,
    email: props.user.email,
    phone: props.user.phone,
    address: {
        street: props.user.address.street,
        city: props.user.address.city,
        zipcode: props.user.address.zipcode,
        lat: props.user.address.lat,
        lng: props.user.address.lng
    }
})
// Store
const modal = useUserStore();

// Computed Data that is used to show and hide Modal
let updateModalOpen = computed(() => modal.updateModalOpen)

// Computed Data that catch if Use Google Location is used or not
let checkboxClicked = ref(modal.checkboxClicked)

// Email Validation
const emailError = ref('')
const validateEmail = () => {
    if (!userCredentials.email) {
        emailError.value = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCredentials.email)) {
        emailError.value = 'Invalid email format'
    } else {
        emailError.value = ''
    }
}

// Phone Validation
const phoneError = ref('')
const validatePhone = () => {
    if (!userCredentials.phone) {
        phoneError.value = 'Phone is required'
    } else if (!/^[0-9+-]+$/.test(userCredentials.phone)) {
        phoneError.value = "Phone must contain only numbers , + and - symbol"
    } else {
        phoneError.value = ''
    }
}

// Google Location to show and hide Longitude and Latitude fields
const useGoogleLocation = () => {
    modal.useGoogleLocation()
}

// Method that close Modal
const closeModal = () => {
    modal.closeUpdateModal();
}

// Update method
const submitForm = () => {
    if (phoneError.value === '' && emailError.value === '') {
        modal.updateUser(userCredentials)
        closeModal()
    }
}

</script>