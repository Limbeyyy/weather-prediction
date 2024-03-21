import os
import pickle


def save_model(model, filename):
    with open(filename, 'wb') as file:
        pickle.dump(model, file)


def load_model(filename):
    with open(os.path.join("models", filename), 'rb') as file:
        model = pickle.load(file)
    return model
