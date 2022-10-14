const popupWindow = {
    data() {
        return {
            test: "nur ein Test",
        };
    },
    methods: {
        triggerCloseWindow() {
            this.$emit("close-pop-up")
        },
    },
    props: ["selectedId"],
    template: `
    <div class="popup-window">
    <p class="close" @click="triggerCloseWindow"> x </p>
    <br>
    <h4> I clicked on picture {{ selectedId }} </h4>
    </div>
    `,
};

export default popupWindow;
