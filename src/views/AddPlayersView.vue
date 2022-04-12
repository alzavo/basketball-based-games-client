<template>
    <PlayersList />
    <PlayerNameEntry v-if="!userLoggedIn" />
    <FriendsList v-if="userLoggedIn" />
    <ButtonsGroup />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { STORE } from "@/store";
import PlayerNameEntry from "@/components/add-players/PlayerNameEntry.vue";
import FriendsList from "@/components/add-players/FriendsList.vue";
import PlayersList from "@/components/add-players/PlayersList.vue";
import ButtonsGroup from "@/components/add-players/ButtonsGroup.vue";

@Options({
    components: {
        PlayerNameEntry,
        FriendsList,
        PlayersList,
        ButtonsGroup,
    },
})
export default class AddPlayersView extends Vue {
    userLoggedIn = false;
    created() {
        this.userLoggedIn = STORE.state.user.token.length > 0;
    }
}
</script>
