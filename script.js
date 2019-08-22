const ARTICLE_TPL = '<article class="post"><header class="post-header"> <div class="img-wrap"></div> <div class="title"></div> <div class="date"></div> </header> <div class="post-body"></div></article>';

(function ($) {
    const API_POSTS = 'http://localhost:3000/posts?sort=desc', $posts = $('.content'); let page = 1;
    /**
     * Function for fetching posts
     *
     * @param page {number} - page number
     */
    function fetch_data(page) {
        $.ajax({
            type: 'GET',
            url: API_POSTS + (page > 1 ? `&page=${page}` : ''),
            crossDomain: true,
            success: (posts, state, xhr) => {
                if (page === 1) $posts.html('');
                if (Array.isArray(posts)) {
                    posts.forEach((post) => {
                        const $el = $(ARTICLE_TPL);
                        $el.find('.img-wrap')[0].innerHTML = `<a href="${post.userId}"><img src="/image.png"/></a>`;
                        $el.find('.title')[0].innerHTML = `<b>${post.title}</b>`;
                        $el.find('.date')[0].innerHTML = `<b>${new Date(post.date).toLocaleString()}</b>`;
                        $el.find('.post-body')[0].innerHTML = `${post.body}`;
                        $posts.append($el);
                    });
                }
            }
        });
    }
    fetch_data(page++);
    $(window).scroll(function() {
        if($(window).innerHeight() + $(window).scrollTop() >= $('body').height()) {
            fetch_data(page++);
        }
    })
})(jQuery);