
if (process.argv.length != 5) {
    console.log("");
    console.log("Expected command line:");
    console.log("\tnode deep-learning-tagger.js <ALCHEMY API KEY> <INPUT JSON FILENAME (FROM INSTAGRAM)> <OUTPUT JSON FILENAME>")
    setTimeout(function() {
        process.exit(1);
    }, 100);
} else {

    var jsonfile = require("jsonfile")
    var async = require("async");

    var AlchemyAPI = require("alchemy-api");
    var alchemy = new AlchemyAPI(process.argv[2]);

    processInstagramResponse(
        require("./data/" + process.argv[3]).data,
        function(error, results) {

                if (error) {
                    console.log(JSON.stringify(error));
                    return;
                }

                console.log("Got results, writing...");

                jsonfile.writeFile(process.argv[4], { "results": results }, { "spaces": 2 }, function (err) {
                    if (err) console.error(err)
                });
            });

    function processInstagramResponse(data, callback) {

        async.mapSeries(data, function(post, nextImage) {

            var imageData = {
                "userId": post.user.id,
                "username": post.user.username,
                "tags": post.tags,
                "likes": post.likes.count,
                "url": post.images.standard_resolution.url
            };

            alchemy.imageKeywords(imageData.url, {}, function(err, response) {

                    if (err) {
                        console.log(JSON.stringify(err));
                        process.exit(1);
                        return;
                        nextImage(err);
                    }

                    // See http://www.alchemyapi.com/api/image-tagging/urls.html for format of returned object
                    imageData.keywords = response.imageKeywords;

                    nextImage(null, imageData);
                });

            }, callback);
    }
}