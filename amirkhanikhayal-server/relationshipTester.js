const models = require('./models');
const User = models.User;
const Post = models.Post;



// Post.bulkCreate([
//     {title: "Lorem, ipsum.", Name: 'John',  sub: 'DOE'},
//     {email: 'log_w@domain.com', Name: 'Logan',  sub: 'WOLVERINE' },
//     {email: 'john-connor@domain.com', Name: 'John',  sub: 'CONNOR'}
//   ]).then((newUsers) => {
//     console.log(newUsers)
//   })
//   .catch((err) => {
//     console.log("Error while users creation : ", err)
//   })
Post.findAll()
    .then(posts => {
        promises = posts.map(async post => {
            let author = await post.getUser();
            author = author.toJSON();
            return { title: post.title, text: post.text, author }
        })
        Promise.all(promises)
            .then(result => {
                console.log(result);
            })
    })


