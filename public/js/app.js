import * as Vue from './vue.js';
import popupWindow from "./popup-component.js";


Vue.createApp({
    /////////////////////////////////////////////////////////////////////////////////////
    data() {
        return {
            pageTitle: "Lennard's Image Board 🏖️",
            message: "Please upload a file",
            images: [],
            showPopUp: false,
            selectedId: null,
            lowestImageId: null,
            showLoadMoreButton: true,
        };
    },
    /////////////////////////////////////////////////////////////////////////////////////
    components: {
        'popup-window': popupWindow,
    },
    props: [],
    /////////////////////////////////////////////////////////////////////////////////////
    methods: {
        upload(e) {
            const form = e.currentTarget;
            // console.log({ form });

            // get the file input
            // check its files.
            // if no files, set error message!
            const fileInput = form.querySelector("input[type=file]");

            // console.log("fileInput.files in upload method: ", fileInput.files);

            if (fileInput.files.length < 1) {
                this.message = "You must first select a file!";
                return;
            }

            const myFormData = new FormData(form);

            // console.log("images: ", this.images);
            // console.log("myFormData: ", myFormData);

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
                    // console.log("data received from server: ", data);
                    if (data.message) {
                        this.message = data.message;
                    }
                    if (data.success) {
                        this.images.unshift(data.newImage);
                    }
                });
        },
        setFile(e) {
            /// here still needs to go sth 
            // console.log("e in setFile: ", e);
        },
        openPopUp(e) {
            // console.log("e in openPopUp: ", e);
            // console.log("trying to get the image id: ", e.currentTarget);
        },
        showId(id) {
            // console.log("i clicked on image with id: ", id);
            this.showPopUp = true;
            this.selectedId = id;
            //// to change the current URL, including the (image)id ////
            history.pushState({}, "", `/${id}`);
        },
        closeWindow(e) {
            this.showPopUp = false;
            //// to change the current URL back to normal route ////
            history.pushState({}, "", "/");
        },
        loadMore(e) {

              fetch("/getMoreImages", {
                  method: "post",
                  headers: {
                      "content-type": "application/json",
                  },
                  body: JSON.stringify({ "lowestImageId": this.lowestImageId }),
              })
                  .then((res) => res.json())
                  .then((moreImages) => {
                
                    // console.log("data in fetch of loadMore: ", moreImages);

                    for (let image of moreImages) {
                        console.log("image: ", image);
                        this.images.push(image);
                    }

                    this.lowestImageId = moreImages[moreImages.length -1].id;

                    if (this.lowestImageId == 1) {
                        this.showLoadMoreButton = false;
                    }

                  });

        },
    },
    mounted() {

          fetch("/getImages")
              .then((res) => res.json())
              .then((data) => {
                    //   console.log("data received from server: ", data);
                    this.images = data;
                    this.lowestImageId = data[data.length -1].id;
                    // console.log("lowestImageId: ", this.lowestImageId);
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


