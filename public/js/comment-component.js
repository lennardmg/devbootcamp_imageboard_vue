

const commentField = {
    data() {
        return {
            selectedComments: [],
        };
    },
    methods: {
        uploadComment: function () {
            // what happens when the button gets clicked
        },
    },
    props: ["selected-image-id"],
    mounted() {
        fetch(`/comments/${this.selectedImageId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data received from server: ", data);
                this.selectedComments = data;
                console.log(
                    "selectedComments at fetch in mounted: ",
                    this.selectedComments
                );
            });
    },
    template: `

        <div class="commentField" > 

            <form v-on:submit.prevent="uploadComment" action="/comment" class="commentInput" method="POST">

                <label for="comment_username"> Username </label>
                <input v-model="comment_username" type="text" name="comment_username" id="comment_username">

                <label for="comment_field"> Comment </label>
                <input v-model="comment_field" type="text" name="comment_field" id="comment_field">

                <input type="submit" value="Comment">

                <p> this is picture: {{ selectedImageId }} </p>

            </form>


            <div class="comments" v-if="selectedComments.length > 0">
                <div v-for="selectedComment in selectedComments">
                    <p> {{ selectedComment.comment }} </p>
                    <p> by {{ selectedComment.username }} at {{ selectedComment.created_at }} </p>
                </div>
            

            </div>

        </div>

    `,
};

export default commentField;