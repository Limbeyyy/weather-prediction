import os
import pandas as pd


def preprocess_csv():
    datapath: str = os.path.join("ml", "weatherAUS.csv")
    df = pd.read_csv(datapath)

    df = df.dropna()
    df.to_csv(os.path.join("ml", "weather.csv"), index=False)
    return


if __name__ == "__main__":
    preprocess_csv()
