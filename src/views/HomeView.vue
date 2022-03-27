<template>
    <div>
        <GamesSection />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GamesSection from "@/components/GamesSection.vue";

@Options({
    components: {
        GamesSection,
    },
})
export default class HomeView extends Vue {}
</script>
