<template>
    <div>rules here</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        game: String,
    },
})
export default class RulesView extends Vue {
    game!: string;
}
</script>
