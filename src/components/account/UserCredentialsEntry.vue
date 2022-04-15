<template>
    <section v-if="messageText.length !== 0" id="message-account-section">
        <div>
            <strong>{{ messageText }}</strong>
        </div>
        <div @click="this.messageText = ''" class="cross">&times;</div>
    </section>

    <section id="user-credentials-entry-account-section">
        <form>
            <div class="wrapper-inputs">
                <input
                    v-model="userName"
                    type="text"
                    autocomplete="off"
                    placeholder="Enter user name"
                />
                <input
                    v-model="password"
                    type="password"
                    autocomplete="off"
                    placeholder="Enter password"
                />
            </div>
        </form>
        <div class="wrapper-buttons">
            <button @click="sendData($event)" class="button log-in-button">
                Submit
            </button>
            <button @click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { IFetchResponse } from "@/domain/IFetchResponse";
import { IJwtResponse } from "@/domain/IJwtResponse";
import { ILogin } from "@/domain/ILogin";
import router from "@/router";
import { AccountService } from "@/services/AccountService";
import { STORE } from "@/store";
import { LOG_IN } from "@/store/MutationTypes";
import { Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";

export default class UserCredentialsEntry extends Vue {
    service: AccountService = new AccountService();
    userName = "";
    password = "";
    messageText = "";

    created() {
        if (STORE.state.user.token.length !== 0) {
            router.push({ name: RouteName.PROFILE });
        }
    }

    async sendData(event: Event): Promise<void> {
        event.preventDefault();

        if (this.userName.length === 0 || this.password.length === 0) {
            this.messageText = "Fill all fields!";
            return;
        }

        let response: IFetchResponse<IJwtResponse>;
        let dto: ILogin = {
            userName: this.userName,
            password: this.password,
        };

        if (window.location.pathname === "/register") {
            response = await this.service.register(dto);
        } else {
            response = await this.service.logIn(dto);
        }

        if (!response.data) {
            if (window.location.pathname === "/register") {
                this.messageText =
                    "User {" + this.userName + "} already registered!";
            } else {
                this.messageText = "Wrong user name or password!";
            }
        } else {
            STORE.commit(LOG_IN, response.data);
            router.push({ name: RouteName.PROFILE });
        }
    }
}
</script>
