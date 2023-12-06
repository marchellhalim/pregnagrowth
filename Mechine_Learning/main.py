# create first app in python 

from flask import Flask, render_template, request
import pickle
import numpy as np

# Load the Random Forest CLassifier model
filename = 'first-innings-score-lr-model.pkl'
