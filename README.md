# Simple Watson Instagram Tagger

1. Download data from Instagram using the Instagram API console at https://apigee.com/console/instagram.
(For example, try `users/self/feed` to tag your own photos).

2. Save the output in a folder called data (for example, save it as data/me.json).

3. Register for an Alchemy API key at http://www.alchemyapi.com/api/register.html.

4. Run the image tagger:
```
node deep-learning-tagger.js <ALCHEMY API KEY> <INPUT JSON FILENAME (FROM INSTAGRAM)> <OUTPUT JSON FILENAME>
```
For example:
```
node deep-learning-tagger.js yourapikeyhere me.json output.json
```
