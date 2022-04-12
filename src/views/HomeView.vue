<template>
    <GamesList />
    <AddPlayers />
    <Account />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { STORE } from "@/store";
import * as Mutation from "@/store/MutationTypes";
import AddPlayers from "@/components/home/AddPlayers.vue";
import GamesList from "@/components/home/GamesList.vue";
import Account from "@/components/home/Account.vue";
import { BaseService } from "@/services/BaseService";

@Options({
    components: {
        GamesList,
        AddPlayers,
        Account,
    },
})
export default class HomeView extends Vue {
    service: BaseService = new BaseService("Games");

    created() {
        STORE.commit(Mutation.REMOVE_POINTS_FROM_PLAYERS);
        STORE.commit(Mutation.CLEAR_GAME_STATUSES);
    }
}
</script>
