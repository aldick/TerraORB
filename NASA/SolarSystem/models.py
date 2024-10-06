from django.db import models

class PHA(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    eccentricity = models.DecimalField(max_digits=5, decimal_places=2)
    semiMajorAxis = models.DecimalField(max_digits=5, decimal_places=2)
    inclination = models.DecimalField(max_digits=5, decimal_places=2)    
    ascendingNodeLongitude = models.DecimalField(max_digits=5, decimal_places=2)
    meanAnomaly = models.DecimalField(max_digits=5, decimal_places=2)
    perihelionDistance = models.DecimalField(max_digits=5, decimal_places=2)
    perihelionArgument = models.DecimalField(max_digits=5, decimal_places=2)
    is_PHA = models.BooleanField(default=False)