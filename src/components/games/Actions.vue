<template>
    <section id="actions-games-section">
        <template v-if="!showActions">
            <div class="wrapper">
                <button
                    @click="showActions = !showActions"
                    class="button settings-button"
                >
                    &#8691;
                </button>
            </div>
        </template>

        <template v-if="showActions">
            <div class="wrapper">
                <button
                    @click="showActions = !showActions"
                    class="button settings-button"
                >
                    &#8691;
                </button>
                <div class="actions">
                    <button
                        @click="goToRulesView()"
                        class="button rules-button"
                    >
                        Rules
                    </button>
                    <button @click="goToHomeView()" class="button back-button">
                        Quit game
                    </button>
                    <button
                        @click="goToResults()"
                        class="button results-button"
                    >
                        Results
                    </button>
                </div>
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import router from "@/router";
import { Vue } from "vue-class-component";
import * as RouteName from "@/router/RoutesNames";
import { STORE } from "@/store";
import * as Mutation from "@/store/MutationTypes";

export default class Actions extends Vue {
    showActions = false;

    goToRulesView() {
        router.push({ name: RouteName.RULES });
    }

    goToHomeView() {
        STORE.commit(Mutation.CLEAR_GAME_STATUSES);
        STORE.commit(Mutation.REMOVE_POINTS_FROM_PLAYERS);
        router.push({ name: RouteName.HOME });
    }

    goToResults() {
        router.push({ name: RouteName.RESULTS });
    }
}
</script>
