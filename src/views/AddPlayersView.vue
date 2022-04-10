<template>
    <PlayersList />
    <PlayerNameEntry v-if="!userLoggedIn" />
    <FriendsList v-if="userLoggedIn" />

    <section class="buttons-group">
        <div>
            <button @click="this.$router.go(-1)" class="button back-button">
                Back
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { STORE } from "@/store";
import { ADD_PLAYER, REMOVE_PLAYER } from "@/store/MutationTypes";
import { BaseService } from "@/services/BaseService";
import { IFriendship } from "@/domain/IFriendship";
import PlayerNameEntry from "@/components/add-players/PlayerNameEntry.vue";
import FriendsList from "@/components/add-players/FriendsList.vue";
import { IPlayer } from "@/interfaces/IPlayer";
import PlayersList from "@/components/add-players/PlayersList.vue";

@Options({ components: { PlayerNameEntry, FriendsList, PlayersList } })
export default class AddPlayersView extends Vue {
    service: BaseService = new BaseService("Friendships");
    friendships: IFriendship[] = [];
    userLoggedIn = false;
    players: IPlayer[] = [];

    async created() {
        this.userLoggedIn = STORE.state.user.token.length > 0;
        this.players = STORE.state.players;

        if (this.userLoggedIn) {
            let userPlayer: IPlayer = {
                id: STORE.state.user.id,
                name: STORE.state.user.name,
                points: 0,
                canPlay: true,
            };
            if (
                STORE.state.players.filter(
                    (player) => player.name === userPlayer.name
                ).length === 0
            ) {
                STORE.commit(ADD_PLAYER, userPlayer);
            }

            const response = await this.service.getAll<IFriendship>();

            if (response.data) {
                this.friendships = response.data;
            }
        }
    }

    removePlayer(index: number): void {
        STORE.commit(REMOVE_PLAYER, index);
    }
}
</script>
