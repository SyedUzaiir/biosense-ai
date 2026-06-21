% ICU Diabetes Prediction - Phase C: Explainable AI (XAI)
% Author: Assistant (Google DeepMind)
% Description: Visualizes Global and Local Interpretability of the model.

clear; clc; close all;

%% 1. Load Resources
if ~isfile('processed_data.mat') || ~isfile('trained_models.mat')
    error('Required data/models not found. Run previous scripts first.');
end
load('processed_data.mat', 'data');
load('trained_models.mat', 'model_ensemble');

disp('Resources loaded. Generating Explanations...');

%% 2. Global Interpretability: Feature Importance
% Using the Bagged Ensemble's built-in importance measure (OOBPermutedPredictorImportance often best for RF)
% Default predictorImportance for ClassificationBaggedEnsemble uses split criterion changes usually?
% Let's check model properties. If 'OOBPredictorImportance' wasn't set during training, we calculate it now if possible or use 'Curvature' equivalent implicitly.
% Simple 'predictorImportance' works for tree ensembles.

imp = predictorImportance(model_ensemble);

figure('Name', 'Global Interpretability');
bar(imp);
title('Predictor Importance Estimates');
ylabel('Importance');
xlabel('Predictors');
xticklabels(model_ensemble.PredictorNames);
xtickangle(45);
grid on;

disp('Feature Importance Plot generated.');

%% 3. Local Interpretability: Partial Dependence Plots (PDP)
% Show effect of Top 3 Continous Features: 
% Likely Glucose_mean_24h, BMI, Age (checking names from importance would be ideal, but hardcoding based on prompt requirement).

features_to_plot = {'Glucose_mean_24h', 'BMI', 'Age'};
% Verify they exist
pd_features = intersect(features_to_plot, model_ensemble.PredictorNames);

if ~isempty(pd_features)
    figure('Name', 'Local Interpretability (PDP)');
    t = tiledlayout('flow');
    title(t, 'Partial Dependence Plots for Top Features');
    
    for i = 1:length(pd_features)
        nexttile;
        plotPartialDependence(model_ensemble, pd_features{i}, 1);
        title(['Dependence on ' pd_features{i}]);
        grid on;
    end
else
    warning('Specified features for PDP not found in model predictors.');
end

%% 4. Advanced: SHAP (Simulated/Placeholder)
% MATLAB introduced 'shapley' function in R2022a approx?
% If available, we use it. If not, we rely on PDP above.
try
    % Attempt Shapley on the first test instance
    % Needs a background dataset usually.
    explainer = shapley(model_ensemble, data(1:50, model_ensemble.PredictorNames)); % Use small background
    row_to_explain = data(100, model_ensemble.PredictorNames); % Explain 100th patient
    
    figure('Name', 'SHAP Explanation (Patient 100)');
    plot(explainer, row_to_explain);
    title('SHAP Values for Patient 100');
catch
    disp('Shapley function not available or failed. Skipping SHAP plot (PDP provided).');
end

disp('Explainability analysis complete.');
