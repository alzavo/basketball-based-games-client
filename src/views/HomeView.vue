<template>
    <div>
        <GamesSection />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import GamesSection from "@/components/GamesSection.vue";

@Options({
    components: {
        HelloWorld,
        GamesSection,
    },
})
export default class HomeView extends Vue {}
</script>
