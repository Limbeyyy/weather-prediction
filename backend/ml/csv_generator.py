import os
import pandas as pd
from sklearn.utils import resample
from sklearn.preprocessing import LabelEncoder
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer


def preprocess_csv() -> None:
    datapath: str ="weatherAUS.csv"
    df = pd.read_csv(datapath)

    df["RainTomorrow"] = df["RainTomorrow"].apply(lambda val: 1.0 if val == "Yes" else 0.0)
    df["RainToday"] = df["RainToday"].apply(lambda val: 1.0 if val == "Yes" else 0.0)

    labels_no            = df[df.RainTomorrow == 0]
    labels_yes           = df[df.RainTomorrow == 1]
    oversample_label_yes = resample(labels_yes, replace=True, n_samples=len(labels_no), random_state=9821)
    oversampled_df       = pd.concat([oversample_label_yes, labels_no])

    # fill 'Object' columns missing vals with mode
    oversampled_df["Date"] = oversampled_df["Date"].fillna(oversampled_df["Date"].mode()[0])
    oversampled_df["Location"] = oversampled_df["Location"].fillna(oversampled_df["Location"].mode()[0])
    oversampled_df["WindGustDir"] = oversampled_df["WindGustDir"].fillna(oversampled_df["WindGustDir"].mode()[0])
    oversampled_df["WindDir9am"] = oversampled_df["WindDir9am"].fillna(oversampled_df["WindDir9am"].mode()[0])
    oversampled_df["WindDir3pm"] = oversampled_df["WindDir3pm"].fillna(oversampled_df["WindDir3pm"].mode()[0])

    to_save_df = oversampled_df.copy(deep=True)
    to_save_df["RainTomorrow"] = to_save_df["RainTomorrow"].apply(lambda val: "Yes" if val == 1.0 else "No")
    to_save_df["RainToday"] = to_save_df["RainToday"].apply(lambda val: "Yes" if val == 1.0 else "No")

    # categorical data to numerical data
    for col in oversampled_df.select_dtypes(include=["object"]).columns:
        lencoder = LabelEncoder()
        oversampled_df[col] = lencoder.fit_transform(oversampled_df[col])

    # multiple imputation by chained equations
    mice_imputed = oversampled_df.copy(deep=True)
    mice_imputer = IterativeImputer()
    mice_imputed.iloc[:, :] = mice_imputer.fit_transform(oversampled_df)

    # removing outliers
    q1 = mice_imputed.quantile(0.25)
    q3 = mice_imputed.quantile(0.75)
    iqr = q3 - q1

    mice_imputed = mice_imputed[ ~((mice_imputed < (q1 - 1.5 * iqr)) | (mice_imputed > (q3 + 1.5 * iqr))).any(axis=1) ]
    to_save_df = to_save_df[to_save_df.index.isin(mice_imputed.index)]
    to_save_df = to_save_df.dropna()
    to_save_df.to_csv(os.path.join("ml", "weather.csv"), index=False)


if __name__ == "__main__":
    preprocess_csv()
