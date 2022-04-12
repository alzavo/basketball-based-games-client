<template>
    <section class="player-name-entry-section">
        <div class="wrapper">
            <input
                type="text"
                autocomplete="off"
                placeholder="Enter name"
                maxlength="30"
                v-model="newPlayerName"
            />
            <button @click="addPlayer()" class="button add-button">Add</button>
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
