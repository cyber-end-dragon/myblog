from django.db import models
from django.utils import timezone

from mdeditor.fields import MDTextField
# Create your models here.


class Tag(models.Model):

    tag_name = models.CharField(max_length=30)

    def __str__(self):

        #在后台编写blog时 选择tag时展示tag名而不是Tag.objects(1)
        return self.tag_name


class MdContent(models.Model):

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=30)
    pub_date = models.DateTimeField(default=timezone.now)
    tag_list = models.ManyToManyField(Tag, related_name="tags")
    content = MDTextField()

    class Meta:

        verbose_name = "mdcontent"
        verbose_name_plural = verbose_name

    def __str__(self):

        return self.title
