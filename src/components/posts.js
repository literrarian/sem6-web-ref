export class Post {
    #el = null;
    #postEl = null;
    #commentEl = null;
    #getPost = null;
    #renderPost = null;
    #post = null;
    #getComments = null;
    #renderComment = null;


    constructor(el, commentEl, options) {
        const { renderPost, getPost, getComments, renderComment } = options;
        this.#el = el;
        this.#commentEl = commentEl;
        this.#renderPost = renderPost;
        this.#getPost = getPost;
        this.#getComments = getComments;
        this.#renderComment = renderComment;
        this.#post = this.getPost();
        this.#postEl = el.querySelector('.post-items');
    }

    init () {
        window.onpopstate = () => {
            const url = new URL(window.location.href);
            const post = +url.searchParams.get('id');

            if (post !== this.#post) {
                this.setPost(post);
                this.loadPost();
                this.loadComment();
            }
        };

        this.loadPost();
        this.loadComment();
    }

    getPost () {
        const url = new URL(window.location.href);
        const post = +url.searchParams.get('id');
        return post;
    }

    setPost (post) {
        this.#post = post;
    }

    async loadPost () {
        try {
            const res = await this.#getPost(this.#post);
            this.renderPost(res);

        } catch (error) {
            console.log(error);
        }
    }

    async loadComment () {
        try {
            const res = await this.#getComments(this.#post);
            this.renderComment(res);

        } catch (error) {
            console.log(error);
        }
    }

    renderPost (post) {
        this.#postEl.innerHTML = this.#renderPost(post);
    }

    renderComment (comment) {
        this.#commentEl.innerHTML = this.#renderComment(comment);
    }
}