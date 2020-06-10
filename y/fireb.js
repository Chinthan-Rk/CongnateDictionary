

// Get a reference to the database service
var database = firebase.database();



function sendData() {
    if (document.getElementById("text_area").value == "") {
        alert("Please enter some value");
    }
    else {
        var searchWord = document.getElementById("text_area").value;
        console.log(searchWord);


        //let node = await
        var searchedWord = database.ref('index/TuluApara')
            .orderByChild('wordA')
            .startAt(searchWord)
            .endAt(searchWord + '\uf8ff')
            .once('value');

        console.log("WORD : " + searchedWord);



    }
}