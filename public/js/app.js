import * as Vue from './vue.js';

let images = [
    {
        src: "https://picsum.photos/200",
        title: "Title1",
        description: "random description1",
    },
    {
        src: "https://picsum.photos/300",
        title: "Title2",
        description: "random description2",
    },
    {
        src: "https://picsum.photos/400",
        title: "Title3",
        description:
            "very very very very very very veryvery very very very long description",
    },
    {
        src: "https://picsum.photos/500",
        title: "very long title that probably exceeds the field given under the image ...",
        description: "",
    },
    {
        src: "https://picsum.photos/600",
        title: "Title6",
    },
];



Vue.createApp({
    /////////////////////////////////////////////////////////////////////////////////////
    data() {
        return {
            pageTitle: "Lennard's Image Board 🏖️",
            message: "Please upload a file",
            images: images,
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
            console.log(fileInput.files);

            if (fileInput.files.length < 1) {
                this.message = "You must first select a file!";
                return;
            }

            const myFormData = new FormData(form);

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


