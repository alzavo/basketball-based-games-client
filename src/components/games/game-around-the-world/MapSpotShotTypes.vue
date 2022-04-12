<template>
    <section id="map-game-around-the-world-section">
        <div class="wrapper">
            <div class="image">
                <img src="../../../assets/halfcourt.jpg" />
            </div>
            <div class="spot-wrapper">
                <div>Spot {{ playerPoints }}</div>
            </div>
            <div class="shots-types-wrapper">
                <div id="shot-free" class="shot-type active">Free</div>
                <div id="shot-chance" class="shot-type">Chance</div>
                <div id="shot-life" class="shot-type">Life</div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        playerPoints: Number,
    },
})
export default class MapSpotShotTypes extends Vue {
    playerPoints!: number;
}
</script>
