/**
* Thumbnail Helper
* @description Get the thumbnail url from a post
* @example
*     <%- thumbnail(post) %>
*/

hexo.extend.helper.register('thumbnail', function (post) {
    var url = post.thumbnail || '';
    if (!url) {
        var imgPattern = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/ig;
        var result = imgPattern.exec(post.content);
        if (result && result.length > 1) {
            url = result[1];
        }
    }
    return url;
});

hexo.extend.helper.register('custom_url', function (post) {
    var canonical_path = post.canonical_path;
    var updated_url = 'https://nayan.co/blog/' + canonical_path;
    return updated_url;
});

hexo.extend.helper.register('get_new_keywords', function (keywords_array, feeder_array) {
    var arr = []
    var keywords_length = keywords_array.length
    var feeder_length = feeder_array.length
    
    while(arr.length < (10 - keywords_length)){
        var r = Math.floor(Math.random() * feeder_length);
        if(r !== feeder_length && arr.indexOf(r) === -1) {
            arr.push(r);
            keywords_array.push(feeder_array[r])
        }

        if (arr.length == feeder_length) {
            break
        }
    }
    return keywords_array;
});