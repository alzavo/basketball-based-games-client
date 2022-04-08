<template>
    <section class="new-player-entry">
        <div>
            <input
                type="text"
                autocomplete="off"
                placeholder="Enter name"
                maxlength="15"
                v-model="this.newPlayerName"
            />
            <button class="button add-button" @click="addPlayer()">+</button>
        </div>
    </section>
</template>

<script lang="ts">
import { STORE } from "@/store";
import { ADD_PLAYER } from "@/store/MutationTypes";
import { Vue } from "vue-class-component";

export default class PlayerNameEntry extends Vue {
    newPlayerName = "";

    addPlayer(): void {
        if (this.newPlayerName.length === 0) {
            return;
        } else {
            STORE.commit(ADD_PLAYER, {
                id: "",
                name: this.newPlayerName,
                points: 0,
                canPlay: true,
            });

            this.newPlayerName = "";
        }
    }
}
</script>

<style scoped></style>
