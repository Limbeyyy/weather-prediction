import pickle
import time
import warnings
import os
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.utils import resample
from sklearn.preprocessing import LabelEncoder
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score, cohen_kappa_score, roc_curve, classification_report
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay


seed: int = 9821
warnings.filterwarnings("ignore")


def save_model(model, filename):
    with open(filename, 'wb') as file:
        pickle.dump(model, file)


def load_model(filename):
    with open(os.path.join("models", filename), 'rb') as file:
        model = pickle.load(file)
    return model


def plot_roc_cur(fper, tper):  
    plt.plot(fper, tper, color='orange', label='ROC')
    plt.plot([0, 1], [0, 1], color='darkblue', linestyle='--')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend()
    plt.show()


def plot_confusion_matrix(target, predictions, classes):
    cm = confusion_matrix(target, predictions, labels=classes, normalize="all")
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=classes)
    disp.plot()
    plt.show()


def train_model(model, X_train, y_train, X_test, y_test):
    t0=time.time()
    model.fit(X_train,y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred) 
    coh_kap = cohen_kappa_score(y_test, y_pred)
    time_taken = time.time() - t0
    print("Accuracy = {}".format(accuracy))
    print("ROC Area under Curve = {}".format(roc_auc))
    print("Cohen's Kappa = {}".format(coh_kap))
    print("Time taken = {}".format(time_taken))
    print(classification_report(y_test,y_pred,digits=5))


    probs = model.predict_proba(X_test)  
    probs = probs[:, 1]  
    fper, tper, _ = roc_curve(y_test, probs) 
    plot_roc_cur(fper, tper)
    
    plot_confusion_matrix(y_test, y_pred, model.classes_)
    
    return model, accuracy, roc_auc, coh_kap, time_taken


def data_processing() -> None:
    datapath: str ="weatherAUS.csv"
    df = pd.read_csv(datapath)

    df["RainTomorrow"] = df["RainTomorrow"].apply(lambda val: 1.0 if val == "Yes" else 0.0)
    df["RainToday"] = df["RainToday"].apply(lambda val: 1.0 if val == "Yes" else 0.0)

    # handle class imbalance
    labels_no            = df[df.RainTomorrow == 0]
    labels_yes           = df[df.RainTomorrow == 1]
    oversample_label_yes = resample(labels_yes, replace=True, n_samples=len(labels_no), random_state=seed)
    oversampled_df       = pd.concat([oversample_label_yes, labels_no])

    # fill 'Object' columns missing vals with mode
    oversampled_df["Date"] = oversampled_df["Date"].fillna(oversampled_df["Date"].mode()[0])
    oversampled_df["Location"] = oversampled_df["Location"].fillna(oversampled_df["Location"].mode()[0])
    oversampled_df["WindGustDir"] = oversampled_df["WindGustDir"].fillna(oversampled_df["WindGustDir"].mode()[0])
    oversampled_df["WindDir9am"] = oversampled_df["WindDir9am"].fillna(oversampled_df["WindDir9am"].mode()[0])
    oversampled_df["WindDir3pm"] = oversampled_df["WindDir3pm"].fillna(oversampled_df["WindDir3pm"].mode()[0])

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
    
    # prepare feature cols
    x = mice_imputed.drop(["Date", "RainTomorrow"], axis=1).values
    y = mice_imputed["RainTomorrow"].values

    # sacle data
    scaler = preprocessing.StandardScaler()
    x = scaler.fit_transform(x)

    # split data
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=seed)
    return x_train, x_test, y_train, y_test


# x_train, x_test, y_train, y_test = data_processing()


def logistic_regression():
    from sklearn.linear_model import LogisticRegression
    params = {"penalty": "l1", "solver":"liblinear"}
    model = LogisticRegression(**params)

    x_train, x_test, y_train, y_test = data_processing()
    model, accuracy, roc_auc, coh_kap, tt = train_model(model, x_train, y_train, x_test, y_test)
    return model, accuracy, roc_auc, coh_kap, tt


def decision_tree_classifier():
    from sklearn.tree import DecisionTreeClassifier
    params = {"max_depth": 16, "max_features": "sqrt"}
    model = DecisionTreeClassifier(**params)

    x_train, x_test, y_train, y_test = data_processing()
    model, accuracy, roc_auc, coh_kap, tt = train_model(model, x_train, y_train, x_test, y_test)
    return model, accuracy, roc_auc, coh_kap, tt


def mlp():
    from sklearn.neural_network import MLPClassifier
    params = {"hidden_layer_sizes": (30, 30, 30), "activation": "logistic", "solver": "lbfgs", "max_iter": 500}
    model = MLPClassifier(**params)

    x_train, x_test, y_train, y_test = data_processing()
    model, accuracy, roc_auc, coh_kap, tt = train_model(model, x_train, y_train, x_test, y_test)
    history = model
    # Plot loss curve
    plt.plot(history.history['loss'], label='Training Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title('Model loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend()
    plt.show()

    return model, accuracy, roc_auc, coh_kap, tt


def random_forest_classifier():
    from sklearn.ensemble import RandomForestClassifier
    params = {"max_depth": 16, "min_samples_leaf": 1, "min_samples_split": 2, "n_estimators": 100, "random_state": seed}
    model = RandomForestClassifier(**params)

    x_train, x_test, y_train, y_test = data_processing()
    model, accuracy, roc_auc, coh_kap, tt = train_model(model, x_train, y_train, x_test, y_test)
    return model, accuracy, roc_auc, coh_kap, tt


def cat_boost():
    import catboost as cb
    params = {"iterations": 50, "max_depth": 16}
    model = cb.CatBoostClassifier(**params)

    x_train, x_test, y_train, y_test = data_processing()
    model, accuracy, roc_auc, coh_kap, tt = train_model(model, x_train, y_train, x_test, y_test)
    return model, accuracy, roc_auc, coh_kap, tt


def xg_boost():
    import xgboost as xgb
    params = {"n_estimators": 500, "max_depth": 16}
    model = xgb.XGBClassifier(**params)

    x_train, x_test, y_train, y_test = data_processing()
    model, accuracy, roc_auc, coh_kap, tt = train_model(model, x_train, y_train, x_test, y_test)
    return model, accuracy, roc_auc, coh_kap, tt




def main():
    print('Training Logistic_regression')
    model, _, _, _, _ = logistic_regression()
    save_model(model, "logistic_model")
    print('Saved logistic_model')

    print('Training dt')
    model, _, _, _, _ = decision_tree_classifier()
    save_model(model, "dt_classifier_model")
    print('Saved dt')

    print("Training mlp")
    model, _, _, _, _ = mlp()
    save_model(model, "mlp_model")
    print('Saved mlp')

    print("Training rfc")
    model, _, _, _, _ = random_forest_classifier()
    save_model(model, "rf_classifier_model")
    print("Saved rfc model")

    print("Training catboost")
    model, _, _, _, _ = cat_boost()
    save_model(model, "catboost_model")
    print("Saved catboost")

    print("Training xgboost")
    model, _, _, _, _ = xg_boost()
    save_model(model, "xgboost_model")
    print("Saved xgboost")

        # model comparision
    accuracy_scores = [accuracy_lr, accuracy_dt, accuracy_rf, accuracy_lgb, accuracy_cb, accuracy_xgb]
    roc_auc_scores = [roc_auc_lr, roc_auc_dt, roc_auc_rf, roc_auc_lgb, roc_auc_cb, roc_auc_xgb]
    coh_kap_scores = [coh_kap_lr, coh_kap_dt, coh_kap_rf, coh_kap_lgb, coh_kap_cb, coh_kap_xgb]
    tt = [tt_lr, tt_dt, tt_rf, tt_lgb, tt_cb, tt_xgb]

    model_data = {'Model': ['Logistic Regression','Decision Tree','Random Forest','LightGBM','Catboost','XGBoost'],
                'Accuracy': accuracy_scores,
                'ROC_AUC': roc_auc_scores,
                'Cohen_Kappa': coh_kap_scores,
                'Time taken': tt}
    data = pd.DataFrame(model_data)

    fig, ax1 = plt.subplots(figsize=(12,10))
    ax1.set_title('Model Comparison: Accuracy and Time taken for execution', fontsize=13)
    color = 'tab:green'
    ax1.set_xlabel('Model', fontsize=13)
    ax1.set_ylabel('Time taken', fontsize=13, color=color)
    ax2 = sns.barplot(x='Model', y='Time taken', data = data, palette='summer')
    ax1.tick_params(axis='y')
    ax2 = ax1.twinx()
    color = 'tab:red'
    ax2.set_ylabel('Accuracy', fontsize=13, color=color)
    ax2 = sns.lineplot(x='Model', y='Accuracy', data = data, sort=False, color=color)
    ax2.tick_params(axis='y', color=color)


    fig, ax3 = plt.subplots(figsize=(12,10))
    ax3.set_title('Model Comparison: Area under ROC and Cohens Kappa', fontsize=13)
    color = 'tab:blue'
    ax3.set_xlabel('Model', fontsize=13)
    ax3.set_ylabel('ROC_AUC', fontsize=13, color=color)
    ax4 = sns.barplot(x='Model', y='ROC_AUC', data = data, palette='winter')
    ax3.tick_params(axis='y')
    ax4 = ax3.twinx()
    color = 'tab:red'
    ax4.set_ylabel('Cohen_Kappa', fontsize=13, color=color)
    ax4 = sns.lineplot(x='Model', y='Cohen_Kappa', data = data, sort=False, color=color)
    ax4.tick_params(axis='y', color=color)
    plt.show()


    pass


if __name__ == "__main__":
    main()
