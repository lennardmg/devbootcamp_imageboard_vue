import * as Vue from './vue.js';



Vue.createApp({
    /////////////////////////////////////////////////////////////////////////////////////
    data() {
        return {
            pageTitle: "Lennard's Image Board 🏖️",
            message: "Please upload a file",
            images: [],
        };
    },
    /////////////////////////////////////////////////////////////////////////////////////
    methods: {
        upload(e) {
            const form = e.currentTarget;
            console.log({ form });

            // get the file input
            // check its files.
            // if no files, set error message!
            const fileInput = form.querySelector("input[type=file]");

            console.log("fileInput.files in upload method: ", fileInput.files);

            if (fileInput.files.length < 1) {
                this.message = "You must first select a file!";
                return;
            }

            const myFormData = new FormData(form);

            console.log("images: ", this.images);
            console.log("myFormData: ", myFormData);

            //// ??? /////
            myFormData.append("title", this.images.title);
            myFormData.append("description", this.images.description);
            myFormData.append("username", this.images.username);
            myFormData.append("file", this.images.file);
            //// ???? ////

            fetch(form.action, {
                method: "post",
                body: myFormData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data received from server: ", data);
                    if (data.message) {
                        this.message = data.message;
                    }
                    if (data.success) {
                        this.images.push(data.newImage);
                    }
                });
        },
        setFile(e) {
            /// here still needs to go sth 
            console.log("e in setFile: ", e);
        },
    },
    mounted() {

          fetch("/getimages")
              .then((res) => res.json())
              .then((data) => {
                  console.log("data received from server: ", data);
                    this.images = data;
              });

    },
    /////////////////////////////////////////////////////////////////////////////////////
}).mount("#main");



// uploadImage() {
//     const file = document.querySelector("input[type=file]").files[0]
//     const formData = new FormData();

//     formData.append("file", file);

//     fetch("/images", {
//         method: "POST",
//         body: formData
//     })
// }

/////////////// needs to be extended with username, title, description etc. //////////////
//////// plus after success, we need to append the newly created image into the images list, eg.
/////////// already create a json and put it into the image array /////////


