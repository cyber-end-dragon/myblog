from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.views import View
from django import http
import datetime
import markdown

from myblog.models import MdContent, Tag

# Create your views here.


class Index_Page(View):

    def get(self, request):

        return render(request, "main.html")


class Side_Tag(View):

    def get(self, request):

        data = [i.tag_name for i in Tag.objects.all()]

        return http.JsonResponse({"nav_tag_list": data,})


class Main_item(View):

    def get(self, request):

        nav_tag_name = request.headers.get("tag")

        if not nav_tag_name:

            mdcontents = MdContent.objects.all()

        else:

            mdcontents = MdContent.objects.filter(tag_list__tag_name=nav_tag_name)

        data = []

        for mdcontent in mdcontents:
            data.append({
                'id': mdcontent.id,
                'title': mdcontent.title,
                'author': mdcontent.author,
                'pub_date': mdcontent.pub_date.strftime("%Y-%m-%d"),
                'tag_list': [i.tag_name for i in mdcontent.tag_list.all()],
                'content': mdcontent.content[:80],
            })

        return http.JsonResponse({"item_list": data,})


class Blog_Page(View):

    def get(self, request):

        return render(request, "blog.html")


class Md_Article(View):

    def get(self, request):

        bid = request.headers['bid']

        article = MdContent.objects.filter(id=bid)

        if len(article) == 1:
            article = article[0]

            data = {
                'id': article.id,
                'title': article.title,
                'author': article.author,
                'pub_date': article.pub_date.strftime("%Y-%m-%d"),
                'tag_list': [i.tag_name for i in article.tag_list.all()],
                'content': markdown.markdown(article.content,
                                             extensions=[
                                                 'markdown.extensions.extra',
                                                 'markdown.extensions.codehilite',
                                                 'markdown.extensions.toc',
                                             ],
                                             safe_mode=True,
                                             enable_attributes=False),
            }

            return http.JsonResponse({'article': data,})


class Md_Uploadimg(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(Md_Uploadimg, self).dispatch(*args, **kwargs)

    def post(self, request):

        upload_image = request.FILES.get("editormd-image-file", None)

        file_name_list = upload_image.name.split('.')
        file_extension = file_name_list.pop(-1)
        file_name = '.'.join(file_name_list)

        file_full_name = '%s_%s.%s' % (file_name,
                                       datetime.datetime.now().strftime("%Y%m%d%H%M%S%f"),
                                       file_extension)
        file_path = 'static/upload/%s' % file_full_name

        with open(file_path, 'wb+') as file:
            for chunk in upload_image.chunks():
                file.write(chunk)

        return http.JsonResponse({'success': 1,
                             'url': '/static/upload/%s' % file_full_name})