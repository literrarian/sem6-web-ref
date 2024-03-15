import { Post } from "./src/components/post.js"

const renderPost = item => `
    <div class="post-id">  
        ${item.id}
    </div>
    <div class="post-name">
     ${item.title}
    </div>
    <div class="post-body">
     ${item.body}
    </div>
    <div class="post-owner">
    ${item.userId}
    </div>   
`;

const renderComment = item => `
    <div class="id">  
        ${item.id}
    </div>
    <div class="comm-name">
     ${item.name}
    </div>
    <div class="comm-mail">
     ${item.email}
    </div>
    <div class="post-body">
    ${item.body}
    </div>   
`;

const getPostDetail = async(id) => {
   try {
       return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
           .then(async res => {
               return res.json()
           });
   }
   catch (err)
   {
       alert(err);
   }
}

const getPostComm = async(id) => {
    try {
        return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(async res => {
                return res.json()
            });
    }
    catch (err)
    {
        alert(err);
    }
}

const init = () => {
    const elPost = document.getElementById('post')
    const elComm = document.getElementById('comment')
    new Post(elPost,elComm, {
        getPostDetail: getPostDetail,
        getPostComm: getPostComm,
        renderPost: renderPost,
        renderComment:renderComment
    }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
