# Generated by Django 5.1.1 on 2024-10-06 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SolarSystem', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pha',
            name='is_PHA',
            field=models.BooleanField(default=False),
        ),
    ]
