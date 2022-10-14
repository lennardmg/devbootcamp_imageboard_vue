import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            headline: "my Image Board 🏖️",
            name: "Lennard",
            headlineCssClass: "headline",
            cities: [
                {
                    name: "Berlin",
                    country: "Germany",
                },
                {
                    name: "Malle",
                    country: "Almost Germany",
                },
            ],
        };
    },
}).mount("#main");



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


https://s3.amazonaws.com/spicedling/89OF0y1fQvwwFVv5qz4JLuPBJzw2HBYS.jpg