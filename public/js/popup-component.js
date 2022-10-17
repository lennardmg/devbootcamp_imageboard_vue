import commentField from "./comment-component.js";

const popupWindow = {
    data() {
        return {
            test: "nur ein Test",
            selectedImage: {},
        };
    },
    methods: {
        triggerCloseWindow() {
            this.$emit("close-pop-up");
        },
    },
    components: {
        "comment-field": commentField,
    },
    props: ["selectedId"],
    mounted() {
        fetch(`/image/${this.selectedId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data received from server: ", data);
                this.selectedImage = data;
                console.log(
                    "selectedImage at fetch in mounted: ",
                    this.selectedImage.title
                );
            });
    },
    template: `
    <div class="popup-window">
        <p class="close" @click="triggerCloseWindow"> x </p>
        <h4 style="text-align:center;">  [{{ selectedId }}] {{ selectedImage.title }} <br>
            by <em> {{ selectedImage.username }} </em> <br>
            uploaded @ {{ selectedImage.created_at }} <br> </h4>
        <h4 style="text-align:center;"> <img v-bind:src=selectedImage.url alt="Selected Image" class="selectedPicture">  </h4>
        <h5 style="text-align:center;"> {{ selectedImage.description }} </h5>
        <br>

        <comment-field :selected-image-id="selectedId"> </comment-field>
    
    </div>

        <div class="greyBackground">
        </div>
    `,
};

export default popupWindow;
