from django.shortcuts import render
from astropy.constants import G, M_earth, R_earth
from astropy import units as u
import numpy as np

from .models import PHA



def main(request):
    return render(request, "index.html", {})

def add_to_db(request, name, description, e, a, i, anc, ma, pd, pa, is_pha):
    pha = PHA(
        name = name,
        description = description,
        eccentricity = e,
        semiMajorAxis = a,
        inclination = i,    
        ascendingNodeLongitude = anc, 
        meanAnomaly = ma,
        perihelionDistance = pd, 
        perihelionArgument = pa,
    )
    pha.save()
    

def kep_2_cart(name, a, e, i, omega_AP, omega_LAN, T, EA, t):
    mu = G.value*M_earth.value
    n = np.sqrt(mu/(a**3))
    M = n*(t - T)
    MA = EA - e*np.sin(EA)
    nu = 2*np.arctan(np.sqrt((1+e)/(1-e)) * np.tan(EA/2))
    r = a*(1 - e*np.cos(EA))
    h = np.sqrt(mu*a * (1 - e**2))
    Om = omega_LAN
    w =  omega_AP
    X = r*(np.cos(Om)*np.cos(w+nu) - np.sin(Om)*np.sin(w+nu)*np.cos(i))
    Y = r*(np.sin(Om)*np.cos(w+nu) + np.cos(Om)*np.sin(w+nu)*np.cos(i))
    Z = r*(np.sin(i)*np.sin(w+nu))
    p = a*(1-e**2)
    V_X = (X*h*e/(r*p))*np.sin(nu) - (h/r)*(np.cos(Om)*np.sin(w+nu) + \
    np.sin(Om)*np.cos(w+nu)*np.cos(i))
    V_Y = (Y*h*e/(r*p))*np.sin(nu) - (h/r)*(np.sin(Om)*np.sin(w+nu) - \
    np.cos(Om)*np.cos(w+nu)*np.cos(i))
    V_Z = (Z*h*e/(r*p))*np.sin(nu) + (h/r)*(np.cos(w+nu)*np.sin(i))

    return {name: {'x': X,
                   'y': Y,
                   'z': Z}}