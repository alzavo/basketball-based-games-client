<template>
    <section>
        <div class="wrapper">
            <table>
                <tr>
                    <td><button>Friends List</button></td>
                    <td><button>Add Friends</button></td>
                </tr>
            </table>
            <FriendsList />
            <!-- add friends component -->
        </div>
    </section>
</template>

<script lang="ts">
import FriendsList from "@/components/friends/FriendsList.vue";
import { IFriendship } from "@/domain/IFriendship";
import { BaseService } from "@/services/BaseService";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
        FriendsList,
    },
})
export default class FriendsView extends Vue {
    service: BaseService = new BaseService("Friendships");
    friendships: IFriendship[] = [];

    async created() {
        const response = await this.service.getAll<IFriendship>();

        if (response.data) {
            this.friendships = response.data;
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0.3rem;
}

table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    text-align: center;
}

td {
    padding: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 1rem;
}
</style>
