# Generated by Django 3.2.9 on 2022-03-12 07:33

from django.db import migrations, models
import django.utils.timezone
import mdeditor.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='MdContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=30)),
                ('pub_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('content', mdeditor.fields.MDTextField()),
                ('tag_list', models.ManyToManyField(related_name='tags', to='myblog.Tag')),
            ],
            options={
                'verbose_name': 'mdcontent',
                'verbose_name_plural': 'mdcontent',
            },
        ),
    ]
