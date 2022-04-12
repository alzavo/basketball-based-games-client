<template>
    <section id="winner-info-game-results-section">
        <table>
            <tr>
                <td>&#127942;</td>
                <td class="player">{{ playerName }}</td>
                <td>&#127942;</td>
            </tr>
        </table>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        playerName: String,
    },
})
export default class WinnerInfo extends Vue {
    playerName!: string;
}
</script>
