from django.urls import path
from. import views


urlpatterns = [
    path("", views.Index_Page.as_view()),
    path("index/", views.Index_Page.as_view()),
    path("side/", views.Side_Tag.as_view()),
    path("main/", views.Main_item.as_view()),
    path("blog/", views.Blog_Page.as_view()),
    path("article/", views.Md_Article.as_view()),
    path('mdeditor/uploads/', views.Md_Uploadimg.as_view()),
]