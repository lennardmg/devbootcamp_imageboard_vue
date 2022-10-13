import * as Vue from './vue.js';



Vue.createApp({

data() {

    return {
        title: "Lennard's Image Board 🏖️",
        images: [
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
        ],
    };
}
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