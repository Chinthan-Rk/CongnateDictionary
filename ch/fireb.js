

// Get a reference to the database service
var database = firebase.database();



function sendData() {
    if (document.getElementById("text_area").value == "") {
        alert("Please enter some value");
    }
    else {
        var searchWord = document.getElementById("text_area").value;
        console.log(searchWord);
        var deleteElement = document.getElementById("toBeRemoved");
        deleteElement.remove();

        database.ref('index/TuluApara')
            .orderByChild('Word')
            .equalTo(searchWord)
            .once('value')
            .then(function (dataSnapshot) {

                wordObject = dataSnapshot.toJSON();
                var key = Object.keys(wordObject)[0];
                var value = wordObject[key];
                console.log(value);
                console.log(value.location[0]);


                database.ref('Dictionary/' + value.location[0])
                    .once('value')
                    .then(function (dataSnapshot) {
                        console.log(dataSnapshot.val());
                        dataObject = dataSnapshot.toJSON();

                        /* MAIN WORD DISPLAY  */
                        for (x in dataObject.Word) {

                            var tag = document.createElement("h3");

                            var kanSpan = document.createElement("span");
                            var tuluSpan = document.createElement("span");

                            var kanText = document.createTextNode("" + x + ". " + dataObject.Word[x].WordK + "  ");
                            var tuluText = document.createTextNode(dataObject.Word[x].WordA);

                            kanSpan.id = "kan";
                            tuluSpan.id = "tulu";

                            kanSpan.appendChild(kanText);
                            tuluSpan.appendChild(tuluText);

                            tag.appendChild(kanSpan);
                            tag.appendChild(tuluSpan);
                            var element = document.getElementById("wordDisplay");
                            element.appendChild(tag);

                            // console.log(dataObject.Word[x].WordA);
                            // console.log(dataObject.Word[x].WordK);

                        }

                        /* WORD DEFINATION DISPLAY  */

                        var count = 1;
                        for (x in dataObject.Defination) {
                            var definationTag = document.createElement('p');

                            if (dataObject.Defination[x] == "type") {
                                console.log("Break");
                                break;
                            }
                            var kannadaPart = document.createElement("span");
                            var englishPart = document.createElement("span");

                            kannadaPart.id = "kan";
                            englishPart.id = "eng";

                            var kanPartText = document.createTextNode((count++) + ". " + dataObject.Defination[x].WordK + " ");
                            var englishPartText = document.createTextNode(" " + dataObject.Defination[x].Meaning);

                            kannadaPart.appendChild(kanPartText);
                            englishPart.appendChild(englishPartText);

                            definationTag.appendChild(kannadaPart);
                            definationTag.appendChild(englishPart);

                            var definationElement = document.getElementById("defination");
                            definationElement.appendChild(definationTag);
                        }



                        /* LANGUAGES  DISPLAY  */
                        count = 1;
                        for (x in dataObject.Language) {
                            var languageTag = document.createElement('p');

                            var langType = document.createElement("span");
                            var kanWord = document.createElement("span");
                            var meaning = document.createElement("span");

                            kanWord.id = "tulu";

                            var langTypeText = document.createTextNode(x + ". ");
                            var kanWordText = document.createTextNode(dataObject.Language[x].WordA+"  ");
                            var meaningText = document.createTextNode(dataObject.Language[x].Meaning);

                            var lineBreak = document.createElement("br");

                            langType.appendChild(langTypeText);
                            
                            kanWord.appendChild(kanWordText);
                            meaning.appendChild(meaningText);
                            meaning.appendChild(lineBreak); 


                            var languages = document.getElementById("languages");
                            languages.appendChild(langType);
                            languages.appendChild(kanWord);
                            languages.appendChild(meaning);

                        }

                    })
                    ;
            });



    }
}