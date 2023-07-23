var users = [
    {
        id: 1,
        name: 'Son Dang'
    },
    {
        id: 2,
        name: 'Tang Duc'
    },
    {
        id: 3,
        name: 'Tran Huy'
    }
    //...
];

var comments = [
    {
        id: 1,
        user_id: 2,
        content: 'Anh Sơn chưa ra video mới à anh :(('
    },
    {
        id: 2,
        user_id: 1,
        content: 'Anh vừa ra video rồi em!!'
    },
    {
        id: 3,
        user_id: 2,
        content: 'Oke anh!'
    },
    {
        id: 4,
        user_id: 1,
        content: 'Ukm e!'
    }
];

function getComments(){
    return new Promise(function(resolve){
        setTimeout(resolve,1000)
    });
}

function getUserByIds(userId){
    return new Promise(function(resolve){
        var result =  users.filter(function(user){
            return userId.includes(user.id);
        });
        return resolve(result);
    });
}

getComments(comments)
    .then(function(){//từ comment lấy ra arr userid tương ứng
        var userId = comments.map(function(comment){
            return comment.user_id;
        });
        return getUserByIds(userId) //đang là 1 promise object
            .then(function(user){
                return {
                    users: user,
                    comments: comments
                };
            }) 
    })
    .then(function(data){
        var ulElementComment = document.querySelector('.comment');
        var html = '';
        data.comments.forEach(function(comment){
            var user = users.find(function(user){
                return user.id === comment.user_id;
            });
            html += `<li>${user.name}: ${comment.content}</li>`;
        });
        ulElementComment.innerHTML = html;
    })