<template>
    <Profile v-if="this.$store.state.user.token.length !== 0" />

    <template v-if="this.$store.state.user.token.length === 0">
        <section v-if="messageText.length !== 0" class="message">
            <div>{{ messageText }}</div>
            <div v-on:click="this.messageText = ''" class="cross">&times;</div>
        </section>

        <section v-if="!canEnterCredentials">
            <div>
                <button
                    v-on:click="clickLogIn($event)"
                    class="button log-in-button"
                >
                    Log In
                </button>
                <button
                    v-on:click="clickRegister($event)"
                    class="button register-button"
                >
                    Register
                </button>
            </div>
        </section>

        <section v-if="canEnterCredentials">
            <input
                v-model="userName"
                type="text"
                placeholder="Enter user name"
            />
            <input
                v-model="password"
                type="text"
                placeholder="Enter password"
            />
            <button v-on:click="sendData($event)" class="button log-in-button">
                Submit
            </button>
            <button
                v-on:click="clickCancel($event)"
                class="button cancel-button"
            >
                Cancel
            </button>
        </section>
    </template>

    <section>
        <div>
            <button v-on:click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AccountService } from "@/services/AccountService";
import { IFetchResponse } from "@/interfaces/IFetchResponse";
import { IJwtResponse } from "@/interfaces/IJwtResponse";
import { STORE } from "@/store";
import { ILogin } from "@/interfaces/ILogin";
import { LOG_IN } from "@/store/MutationTypes";
import Profile from "@/components/account/Profile.vue";

@Options({
    components: {
        Profile,
    },
})
export default class AccountView extends Vue {
    service: AccountService = new AccountService();

    userName = "";
    password = "";
    messageText = "";

    canEnterCredentials = false;
    registration = false;
    loggingIn = false;

    async sendData(event: Event): Promise<void> {
        event.preventDefault();

        if (!this.canSendData()) return;

        let response: IFetchResponse<IJwtResponse>;
        let dto: ILogin = {
            userName: this.userName,
            password: this.password,
        };

        if (this.registration) {
            response = await this.service.register(dto);
        } else {
            response = await this.service.logIn(dto);
        }

        if (!response.data) {
            this.messageText =
                "user {" + this.userName + "} already registered";
        } else {
            STORE.commit(LOG_IN, response.data);
        }
    }

    clickLogIn(event: Event): void {
        event.preventDefault();
        this.canEnterCredentials = true;
        this.registration = false;
        this.loggingIn = true;
    }

    clickRegister(event: Event): void {
        event.preventDefault();
        this.canEnterCredentials = true;
        this.registration = true;
        this.loggingIn = false;
    }

    clickCancel(event: Event): void {
        event.preventDefault();
        this.canEnterCredentials = false;
        this.registration = false;
        this.loggingIn = false;
    }

    canSendData(): boolean {
        if (this.userName.length === 0) {
            this.messageText = "name can not be empty";
            return false;
        }

        if (this.password.length < 6) {
            this.messageText = "password at least 6 characters long";
            return false;
        }

        return true;
    }
}
</script>
