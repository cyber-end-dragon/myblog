function create_item(article_list_div, id, title, pub_date, author, tag_list, content){

    let item = document.createElement("div");
    item.classList.add("item");
    article_list_div.appendChild(item);

    let title_div = document.createElement("div");
    title_div.classList.add("title");
    title_div.innerHTML = title;
    title_div.onmouseover = function(){
        this.style.cursor = "pointer";
    };
    title_div.onclick = function(){
        let article_url = "/blog/?bid=" + id;
        window.open(article_url);
    };
    item.appendChild(title_div);

    let status = document.createElement("div");
    status.classList.add("status");
    item.appendChild(status);

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
    content_div.innerHTML =  content;
    item.appendChild(content_div);

};

//export {create_item}

axios.get("/main")
    .then(
        function(response){
            let item_list = response.data.item_list;
            let article_list = document.querySelector("div .article-list");
            for (let i=0; i<item_list.length; i++){
                let item = item_list[i];
                create_item(article_list, item.id, item.title, item.pub_date, item.author, item.tag_list, item.content);
            };
        }
    )
    .catch(
        function(error){
            console.log(error)
        }
    )