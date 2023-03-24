<script>
import Button from '../../components/basic/Button.vue';
import { backend } from '../../backend';
import { adminStore } from '../../store/admin.js';
import { contractStore } from '../../store/contractStore.js'
import axios from "axios"
// import { this.$store } from '../this.$store';
export default {
    name: 'Login',
    setup() {
        const admin_store = adminStore()
        const contract_store = contractStore()
        return {
            admin_store, contract_store
        }
    },
    data() {
        return {
            admin: {
                adharcard: '',
                password: ''
            }
        }

    },
    methods: {
        async onSubmit() {
            try {
                let result = await axios.post("http://localhost:3000/api/admin-login",
                    {
                        adharcard: this.admin.adharcard,
                        password: this.admin.password
                    })
                console.log("main hoon")
                console.log(result)

                if (result.status === 200) {
                    alert("Login Sucessfully")
                    this.$router.push({ name: 'Candidate' })
                }
                else {
                    alert("Wrong Credentials")
                }

            }
            catch (e) {
                if(e.response.status===500){
                    alert("Wrong Credentials")
                    this.admin.adharcard=""
                    this.admin.password=""
                }
                console.log(e)
            }

        }
    },
    components: {
        Button
    },
    beforeMount() {
        backend.loader();
    },
    mounted() {
        console.log(this.contract_store.contract.address)
        console.log(`State admin Address ${this.admin_store.admin_address}`)
        if (this.admin_store.admin_address) {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<template>
    <div class="registration">
        <div class="registration-img">
            <img src="../../assets/images/register.svg" alt="">
        </div>
        <div class="registration-cont">
            <span>Login</span>
            <div class="register-input">
                <label>Aadhar Card</label>
                <input placeholder="adharcard Address" v-model="this.admin.adharcard" type="text">
            </div>
            <div class="register-input">
                <label> Password</label>
                <input placeholder="admin Address" v-model="this.admin.password" type="text">
            </div>

            <Button @click="onSubmit" text="Login" />
            <div class="text1">
                <span>Don't have an account
                    <router-link style="text-decoration: none" :to="{ name: 'AdminRegister' }">
                        <span :style="{ color: 'var(--secondary)' }">Register here</span>
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text1 {
    width: 20rem;

}

.text1 * {
    font-size: 1.1rem;
}

.router-link {
    text-decoration: none;
    color: red;
}

.registration {
    height: 100vh;
    background: var(--primary);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 4rem;

}

.registration-img {
    margin: auto;
}

Button {
    margin-top: 5px;
    width: 20rem;
}

.registration-img img {
    height: 25rem;

}

.register-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 10rem;
}

span {
    font-size: 2.5rem;
}

input {
    width: 20rem;
    height: 2rem;
    color: var(--primary);
    border-radius: 8px;
    padding: 1rem;
}

::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--secondary);
    opacity: 0.7;
    /* Firefox */
}


.registration-cont {
    padding: 2rem;
    padding-left: 10rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>