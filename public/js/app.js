import * as Vue from './vue.js';

Vue.createApp({
data() {
    return {
        title: "Lennard's Image Board 🏖️",
        images: [
            {
                src: "https://picsum.photos/200",
                title: "Title1",
            },
            {
                src: "https://picsum.photos/300",
                title: "Title2",
            },
            {
                src: "https://picsum.photos/400",
                title: "Title3",
            },
        ],
    };
}
}).mount("#main");