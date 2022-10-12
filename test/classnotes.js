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
