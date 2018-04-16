<template>
    <div :id="id">
        <div class="swiper-wrapper">
            <!--<template v-for="tag in elements">-->
            <!--<div class="swiper-slide">{{tag}}</div>-->
            <!--</template>-->
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper/dist/js/swiper'

    // TODO 待完善

    export default {
        name: 'Fullpage',
        props: {
            id: {
                type: String,
                required: true
            },
            config: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                swiper: null,
                elements: []
            }
        },
        mounted() {
            this.$slots.default.map(item => {
                !!item.tag ? this.elements.push(item) : ''
                console.log(item)
            });

            this.swiper = new Swiper('#' + this.id, Object.assign({
                direction: 'vertical',
                effect: 'slide',
            }, this.config))
        }
    }
</script>
