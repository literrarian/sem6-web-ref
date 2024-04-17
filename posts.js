import { Post } from "./src/components/posts.js"

const renderPost = item => `
    <div class="title-post">
        ${item.title}
    </div>
    <div class="content-post">
        ${item.body}
    </div>
    <div class="other-post-info">
        ID пользователя: ${item.userId}
    </div>
    <div class="other-post-info">
        ID поста: ${item.id}
    </div>
`;

const renderComment = item => {
    let res = ``;
    for(let i = 0; i < item.length; i++) {
        res += `<div class="comment-item">
            <div class="email-comment">${item[i].email}</div>
            <div class="name-comment">${item[i].name}</div>
            <div class="body-comment">${item[i].body}</div>
            <div class="id-comment">ID комментария: ${item[i].id}</div>
            <div class="id-comment">ID поста: ${item[i].postId}</div>
        </div>`;
    }
    return res;
};

const getPost = async (id) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
};

const getComments = async (id) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
};

const init = () => {
    const post = document.getElementById('post');
    const comment = document.querySelector('.comments-post');
    new Post(post, comment, {
        renderPost: renderPost,
        getPost: getPost,
        getComments: getComments,
        renderComment: renderComment
    }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}