# Generated by Django 5.1.1 on 2024-10-06 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PHA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
                ('eccentricity', models.DecimalField(decimal_places=2, max_digits=5)),
                ('semiMajorAxis', models.DecimalField(decimal_places=2, max_digits=5)),
                ('inclination', models.DecimalField(decimal_places=2, max_digits=5)),
                ('ascendingNodeLongitude', models.DecimalField(decimal_places=2, max_digits=5)),
                ('meanAnomaly', models.DecimalField(decimal_places=2, max_digits=5)),
                ('perihelionDistance', models.DecimalField(decimal_places=2, max_digits=5)),
                ('perihelionArgument', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
    ]
