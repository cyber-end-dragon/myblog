from django.contrib import admin
from .models import Tag, MdContent

# Register your models here.


class TagAdmin(admin.ModelAdmin):

    list_display = ('tag_name',)


class MdcontentAdmin(admin.ModelAdmin):

    list_display = ('title', 'pub_date',)


admin.site.register(Tag, TagAdmin)
admin.site.register(MdContent, MdcontentAdmin)
