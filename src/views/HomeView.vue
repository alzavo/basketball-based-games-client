<template>
    <GamesListSection />
    <AddPlayersSection />
    <AccountSection />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { STORE } from "@/store";
import * as Mutation from "@/store/MutationTypes";
import AddPlayersSection from "@/components/home/AddPlayersSection.vue";
import GamesListSection from "@/components/home/GamesListSection.vue";
import AccountSection from "@/components/home/AccountSection.vue";
import { BaseService } from "@/services/BaseService";
import { IGame } from "@/interfaces/IGame";

@Options({
    components: {
        GamesListSection,
        AddPlayersSection,
        AccountSection,
    },
})
export default class HomeView extends Vue {
    service: BaseService = new BaseService("Games");

    async created() {
        STORE.commit(Mutation.REMOVE_POINTS_FROM_PLAYERS);
        STORE.commit(Mutation.CLEAR_GAME_STATUSES);

        const response = await this.service.getAll<IGame>();

        if (response.data) {
            STORE.commit(Mutation.SET_GAMES, response.data);
        }
    }
}
</script>
