<template>
    <section class="game-actions">
        <div class="game-actions-choice">
            <div class="out-game-actions">
                <button
                    v-on:click="checkResults($event)"
                    class="button results-button"
                >
                    Results
                </button>
                <button
                    v-on:click="checkRules($event)"
                    class="button rules-button"
                >
                    Rules
                </button>
                <button
                    v-on:click="finishGame($event)"
                    class="button back-button"
                >
                    Finish
                </button>
                <button
                    v-on:click="this.$router.go(-1)"
                    class="button back-button"
                >
                    Back
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import router from "@/router";

import { Vue } from "vue-class-component";

export default class SettingsView extends Vue {
    returnToSettings(event: Event): void {
        event.preventDefault();
    }

    finishGame(event: Event): void {
        event.preventDefault();

        router.push({ name: "home" });
    }

    checkRules(event: Event): void {
        event.preventDefault();
        router.push({ name: "rules" });
    }

    checkResults(event: Event): void {
        event.preventDefault();
        router.push({ name: "results" });
    }
}
</script>
