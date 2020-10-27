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