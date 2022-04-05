<template>
    <section>
        <div class="wrapper">
            <!-- table will be better -->
            <p v-for="friend in friendships" :key="friend">
                {{ friend.friendName }}
            </p>
        </div>
    </section>
</template>

<script lang="ts">
import { IFriendship } from "@/domain/IFriendship";
import { BaseService } from "@/services/BaseService";
import { Vue } from "vue-class-component";

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

<style scoped></style>
