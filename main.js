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

//Front end lấy ra dữ liệu từ 2 url API backend gửi lên
//1. API thông tin comment
//2. API thông tin user
// Từ user_id -> lấy ra user tương ứng

//Fake API mô phỏng gọi qua hàm URL API để trả về dữ liệu

function getComments(){//Hành động lấy qua internet nên phải xử lý bất đồng bộ 
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(comments);
        },1000);
    });
}

function getUserByIds(userIds){
    return new Promise (function(resolve){
        var result = users.filter(function(user){
            return userIds.includes(user.id); //Duyệt qua mảng userIds xem có user nào có id = với userIds trong mảng k
        });
        setTimeout(resolve(result),1000);
    });
}

getComments()
    .then(function(comments){ //1 mảng comment
        var userIds = comments.map(function(comment){
            return comment.user_id;
        }); //Trả về những id của user đã comment
        return getUserByIds(userIds)
                .then(function(user){//mảng các user đã lấy được
                    return {
                        users: user,
                        comments: comments
                    };
                });
    })
    .then(function(data){
        var ulCommentElement = document.querySelector('.comment');
        var html = '';
        data.comments.forEach(function(comment){ //từ cmt get ra user tương ứng đã
            var userId = comment.user_id;
            var user = data.users.find(function(user){
                return user.id === userId;
            });
            html += `<li>${user.name}: ${comment.content}</li>`;
        });
        ulCommentElement.innerHTML = html;
    });

    //Để khắc phục promise hell chúng ta có async / await
