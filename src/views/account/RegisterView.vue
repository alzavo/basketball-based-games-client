<template>
    <UserCredentialsEntry />
</template>

<script lang="ts">
import UserCredentialsEntry from "@/components/account/UserCredentialsEntry.vue";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
        UserCredentialsEntry,
    },
})
export default class RegisterView extends Vue {}
</script>

<style scoped></style>
