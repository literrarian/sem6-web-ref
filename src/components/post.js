export class Post
{
    #elPost = null
    #elComment = null
    #getPostDetail = null
    #getPostComm = null
    #renderPost = null
    #renderComment = null
    #post = null

    constructor(elPost,elComment,options) {
        const {getPostDetail, getPostComm, renderPost, renderComment } = options
        this.#elPost = elPost
        this.#elComment = elComment
        this.#getPostDetail = getPostDetail
        this.#getPostComm = getPostComm
        this.#renderPost = renderPost
        this.#renderComment = renderComment
        this.#post = this.getPost()
    }

    init () {
        window.onpopstate = () => {
            const url = new URL(window.location.href);
            const post = +url.searchParams.get('post');

            if (post !== this.#post) {
                this.setPost(post);
                this.loadPost();
                this.loadComments();
            }
        }
        this.loadPost();
        this.loadComments();
    }
    getPost()
    {
        const url = new URL(window.location.href);
        const post = +url.searchParams.get('id');
        return post;
    }
    setPost(post)
    {
        this.#post=post;
    }
    loadComments () {
        try {
            this.#getPostComm(this.#post)
                .then(comm => this.renderComm(comm));
        }
         catch (err) {
            alert(err)
        }
    }
    loadPost()
    {
        try {
            this.#getPostDetail(this.#post)
                .then(post => this.renderPost(post));
        }
        catch (err)
        {
            alert(err)
        }
    }
    renderPost(post){
        this.#elPost.innerHTML = this.#renderPost(post)
    }
    renderComm(comm){
        this.#elComment.innerHTML = comm.map(this.#renderComment).join('')
    }
}