<template>
    <div :class="show?'overlay active':'overlay'" @click="handleClick">
        <slot/>
    </div>
</template>

<script>
    import './overlay.less'

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>