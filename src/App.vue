<template>
    <router-view />
</template>

<style lang="scss">
$default-font-color: #000;
$background-color: #4a90e2;
$container-background-color: #f2f2f2;
$container-border-color: #000;

@mixin mq($size) {
    @media only screen and (min-width: $size) {
        @content;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
