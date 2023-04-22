function create_nav_tag(nav_tag_list, nav_tag_name){

    let nav_tag = document.createElement("div");
    nav_tag.onmouseover = function(){
        this.style.cursor = "pointer";
    };

    nav_tag.onclick = function(){
        tagclick(nav_tag_name)
    };

    nav_tag.innerHTML = nav_tag_name;
    nav_tag_list.appendChild(nav_tag);

};

function create_nav_menu(nav_tag_list, menu, nav_tag_name){

    menu.addEventListener("mouseenter", function(){

        let nav_tag = document.createElement("div");

        nav_tag.onmouseover = function(){
            this.style.cursor = "pointer";
        };
    
        nav_tag.onclick = function(){
            tagclick(nav_tag_name)
        };

        nav_tag.innerHTML = nav_tag_name;
        menu.appendChild(nav_tag)

    })

};

function create_nav_list(nav_tag_list, nav_tags_list){

    for (let i=0; i<nav_tags_list.length; i++){

        let nav_tag_single = nav_tags_list[i];

        if (i<3){
            create_nav_tag(nav_tag_list, nav_tag_single)
        }else{

            var menu_div = document.querySelector("div .menu");

            if (menu_div){
                create_nav_menu(nav_tag_list, menu_div, nav_tag_single);
            }else{
                var menu_div =  document.createElement("div");
                menu_div.classList.add("menu");
                menu_div.innerHTML = "更多";
                nav_tag_list.appendChild(menu_div);
                menu_div.onmouseleave = function(){
                    let div_children = this.querySelectorAll("div");
                    for (let i=0;i<div_children.length;i++){
                        this.removeChild(div_children[i]);
                    };
                };
                create_nav_menu(nav_tag_list, menu_div, nav_tag_single);
            };

        };

    };
    
};

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

function tagclick(nav_tag_name){
    let article_list_div = document.querySelector("div .article-list");
    if(article_list_div){
        axios.get("/main", {
            headers: {
                "tag": nav_tag_name
            }
        })
        .then(
            function(response){
                let item_list = response.data.item_list;
                article_list_div.innerHTML = "";
                for (let i=0; i<item_list.length; i++){
                    let item = item_list[i];
                    create_item(article_list_div, item.id, item.title, item.pub_date, item.author, item.tag_list, item.content);
                };
            }
        )
        .catch(
            function(error){
                console.log(error);
            }
        )
    }else{
        axios.get("/main", {
            headers:{
                "tag": nav_tag_name
            }
        })
        .then(
            function(response){

                let article_list_div = document.createElement("div");
                article_list_div.classList.add("article-list");
                let item_list = response.data.item_list;
                for (let i=0; i<item_list.length; i++){
                    let item = item_list[i];
                    create_item(article_list_div, item.id, item.title, item.pub_date, item.author, item.tag_list, item.content);
                };
                let main_div = document.querySelector("div.main");
                main_div.innerHTML = "";
                main_div.appendChild(article_list_div);
            }
        )
        .catch(
            function(error){
                console.log(error);
            }
        )
    }
}

axios.get("/side")
    .then(
        function(response){
            let tag_list = response.data.nav_tag_list;
            let nav_tag_list = document.querySelector("div .nav");
            create_nav_list(nav_tag_list, tag_list);
        }
    )
    .catch(
        function(error){
            console.log(error);
        }
    )

