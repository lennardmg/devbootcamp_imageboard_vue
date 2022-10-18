

const commentField = {
    data() {
        return {
            comment_message: "Let us know what you think about this picture",
            selectedComments: [],
            newComment: {},
        };
    },
    methods: {
        uploadComment: function (e) {
            // what happens when the button gets clicked
                const form = e.currentTarget;
                 const usernameInput = form.querySelector("#comment_username");
                  const commentInput = form.querySelector("#comment_field");
                  console.log("form: ", form);

                 console.log(
                     "commentInput and usernameInput in uploadComment method: ",
                     commentInput.value, usernameInput.value
                 );

                 if (!commentInput.value || !usernameInput.value) {
                     this.comment_message = "Please fill out both fields!";
                     return;
                 }

                 const newCommentData = {
                    "image_id": this.selectedImageId,
                    "username": usernameInput.value,
                    "comment": commentInput.value
                 }

                 fetch("/comments", {
                     method: "post",
                     headers: {
                        "content-type": "application/json"
                     },
                    //  body: newCommentData,
                     body: JSON.stringify(newCommentData),
                 })
                     .then((res) => res.json())
                     .then((data) => {
                         console.log("data received from server: ", data);
                         if (data.message) {
                             this.comment_message = data.message;
                         }
                         if (data.success) {
                             this.selectedComments.unshift(data.newComment);
                         }
                     });

        },
    },
    props: ["selected-image-id"],
    mounted() {
        fetch(`/comments/${this.selectedImageId}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log("data received from server: ", data);
                this.selectedComments = data;
     
            });
    },
    template: `

        <div class="commentField" > 

            <p class="status_comment" style="color:green;"> *{{ comment_message }} </p>
            <br>

            <form v-on:submit.prevent="uploadComment" class="commentInput" method="POST">

                <label for="comment_username"> Username </label>
                <input v-model="comment_username" type="text" name="comment_username" id="comment_username">

                <label for="comment_field"> Comment </label>
                <input v-model="comment_field" type="text" name="comment_field" id="comment_field">

                <input type="submit" value="Comment">
                <br>
                <p> this is picture: {{ selectedImageId }} </p>
                <hr>
            </form>

            

            <div class="comments">
                <div v-for="selectedComment in selectedComments">
                    <p> <strong>{{ selectedComment.comment }} </strong> </p>
                    <p> by <em>{{ selectedComment.username }}</em> at <em>{{ selectedComment.created_at }}</em> </p>
                    <hr>
                </div>
            

            </div>

        </div>

    `,
};

export default commentField;