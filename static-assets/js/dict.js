$(document).ready(function () {

    $(".btn").click(function () {
        let searchboxval = document.getElementById("searchterm").value;

        let myurl = `/search?searchterma=${searchboxval}`;
        $("#lastdiv").empty();

        $.ajax({
            url: myurl,
            type: 'GET',
            dataType: 'json', // added data type
            success: function (res) {
                // debugger;
                if (res.data.length == 0) {
                    $("#lastdiv").append(`<p> No data found!!</p>`);
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        $("#lastdiv").append(`<p> ${i+1} (${res.data[i].wordtype}) :: ${res.data[i].definition}</p>`);
                    }
                }


            }
        });
    });
});