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
    var category = post.category;
    var title = post.title;
    var updated_url = 'https://nayan.co/blog/' + category + '/' + title + "/";
    return updated_url;
});