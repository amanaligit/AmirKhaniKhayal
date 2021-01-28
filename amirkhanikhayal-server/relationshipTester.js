const models = require('./models');
const Page = models.Pages;
const SubPage = models.SubPages




Page.findOne({where: {id:1}})
.then(page=> {
    //console.log(page)
    page.getSubPages()
    .then(subpages=> {
        subpages_map = subpages.map(page=>page.Title);
        console.log(subpages_map);
    })
})
.catch((err) => {
    console.log("Error while users creation : ", err)
})