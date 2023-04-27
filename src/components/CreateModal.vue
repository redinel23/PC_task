<template>
    <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto">

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
                                        v-model="credentials.name"
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
                                        v-model="credentials.address.street"
                                        ref="addressRef"
                                        type="text"
                                />
                            </div>

                            <div class="col-span-2">
                                <label class="label">Username</label>
                                <input
                                        class="input"
                                        placeholder="johngonzales13"
                                        v-model.number="credentials.userName"
                                        type="text"
                                />
                            </div>
                            <div class="col-span-2">
                                <label class="label">City</label>
                                <input
                                        class="input"
                                        placeholder="Tirana"
                                        v-model="credentials.address.city"
                                        type="text"
                                />
                            </div>

                            <div class="col-span-2">
                                <label class="label">Email</label>
                                <input
                                        class="input"
                                        placeholder="johngonzales1331@gmail.com"
                                        v-model.number="credentials.email"
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
                                        v-model.number="credentials.address.zipcode"
                                        type="text"
                                />
                            </div>

                            <div class="col-span-2">
                                <label class="label">Phone Nr</label>
                                <input
                                        class="input"
                                        placeholder="+355 69 76 76 654"
                                        v-model="credentials.phone"
                                        type="text"
                                        @blur="validatePhone"
                                />
                                <span v-if="phoneError" class="text-red-500 flex mr-auto">{{ phoneError }}</span>
                            </div>

                            <div v-if="checkboxClicked" class="col-span-1">
                                <label class="label">Latitude</label>
                                <input
                                        placeholder="41.327953"
                                        class="input"
                                        type="text"
                                />
                            </div>

                            <div v-if="checkboxClicked" class="col-span-1">
                                <label class="label">Longitude</label>
                                <input
                                        class="input"
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

import {computed, onMounted, reactive, ref} from "vue";
import {useUserStore} from "@/stores/userStore";

const props = defineProps({
    header: {
        type: String,
        default: 'New User Info',
    }
})

// Store
const modal = useUserStore();

// Computed Data that used to open and hide Modal
let isOpen = computed(() => modal.isOpen)

// Computed Data that used to understand when useGoogleLocation is active or not
let checkboxClicked = computed(() => modal.checkboxClicked)

// Used to show the Latitude and Longitude when we have activated useGoogleLocation
const useGoogleLocation = () => {
    modal.useGoogleLocation()
}

// Data that
const addressRef = ref()
onMounted(() => {
    const autocomplete = new google.maps.places.Autocomplete(addressRef.value, {
        types: ['address'],
        fields: ['address_components']
    })
})

const closeModal = () => {
    modal.closeModal();
}

const credentials = reactive({
    name: '',
    userName: '',
    email: '',
    phone: null,
    address: {
        street: '',
        city: '',
        zipcode: null,
    }
})

const emailError = ref('')
const phoneError = ref('')
const validateEmail = () => {
    if (!credentials.email) {
        emailError.value = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
        emailError.value = 'Invalid email format'
    } else {
        emailError.value = ''
    }
}

const validatePhone = () => {
    if (!credentials.phone) {
        phoneError.value = 'Phone is required'
    } else if (!/^[0-9+-]+$/.test(credentials.phone)) {
        phoneError.value = "Phone must contain only numbers"
    } else {
        phoneError.value = ''
    }
}
const submitForm = () => {
    if (phoneError.value === '' && emailError.value === '') {
        modal.addUser(credentials)
        credentials.name = ''
        credentials.userName = ''
        credentials.email = ''
        credentials.phone = null
        credentials.address = null
        credentials.city = null
        credentials.zipcode = null
        closeModal()
    }

}
</script>