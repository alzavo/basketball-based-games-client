<template>
    <section v-if="messageText.length !== 0" class="message">
        <div>{{ messageText }}</div>
        <div v-on:click="this.messageText = ''" class="cross">&times;</div>
    </section>

    <section>
        <div class="wrapper-inputs">
            <input
                v-model="userName"
                type="text"
                placeholder="Enter user name"
            />
            <input
                v-model="password"
                type="password"
                placeholder="Enter password"
            />
        </div>
        <div class="wrapper-buttons">
            <button v-on:click="sendData($event)" class="button log-in-button">
                Submit
            </button>
            <button v-on:click="this.$router.go(-1)" class="button back-button">
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

export default class UserCredentialsEntry extends Vue {
    service: AccountService = new AccountService();

    userName = "";
    password = "";
    messageText = "";

    beforeCreate() {
        if (STORE.state.user.token.length !== 0) {
            router.push("/profile");
        }
    }

    async sendData(event: Event): Promise<void> {
        event.preventDefault();

        if (this.userName.length === 0 || this.password.length === 0) {
            this.messageText = "fill all fields!";
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
                    "user {" + this.userName + "} already registered";
            } else {
                this.messageText = "wrong user name or password";
            }
        } else {
            STORE.commit(LOG_IN, response.data);
            router.push("/profile");
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper-buttons,
.wrapper-inputs {
    display: flex;
    padding: 0.5rem;
}
.wrapper-inputs {
    flex-direction: column;
    input {
        margin-bottom: 0.5rem;
        height: 2rem;
    }
}
.wrapper-buttons {
    button {
        width: 30%;
        margin: auto;
    }
}
</style>
