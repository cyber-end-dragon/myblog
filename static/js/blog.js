function create_article(article_div, id, title, pub_date, author, tag_list, content){

    let title_div = document.createElement("div");
    title_div.classList.add("title");
    title_div.innerHTML = title;
    article_div.appendChild(title_div);

    let status = document.createElement("div");
    status.classList.add("status");
    article_div.appendChild(status);

    let update_div = document.createElement("div");
    update_div.classList.add("update");
    update_div.innerHTML = "发布于: " + pub_date ;
    status.appendChild(update_div);

    let author_div = document.createElement("div");
    author_div.classList.add("author");
    author_div.innerHTML = "作者: " + author;
    status.appendChild(author_div);

    let tag_div = document.createElement("div");
    tag_div.classList.add("tag");
    tag_div.innerHTML = "标签: " + tag_list.join(", ");
    status.appendChild(tag_div);

    let content_div = document.createElement("div");
    content_div.classList.add("content");
    content_div.innerHTML = content;
    article_div.appendChild(content_div)

};

var local_url = window.location.href
var reg = /bid=(\d*)/
var bid = local_url.match(reg)[1]

axios.get("/article", {
        headers: {
            "bid": bid
        }
    })
    .then(
        function(response){

            article = response.data.article;
            let article_div = document.querySelector("div .article");
            create_article(article_div, article.id, article.title, article.pub_date, article.author, article.tag_list, article.content);

        }
    )
    .catch(
        function(error){
            console.log(error);
        }
    )
