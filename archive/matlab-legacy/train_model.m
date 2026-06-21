% ICU Diabetes Prediction - Phase B: Model Development
% Author: Assistant (Google DeepMind)
% Description: Trains Ensemble and SVM models, defines Risk Logic, and Simulates Trajectories.

clear; clc; close all;

%% 1. Load Data
if ~isfile('processed_data.mat')
    error('processed_data.mat not found. Run data_prep.m first.');
end
load('processed_data.mat', 'data');
disp('Processed data loaded.');

%% 2. Split Data (Train/Test)
rng(42); % Reproducibility
cv = cvpartition(data.Diabetes, 'HoldOut', 0.2);
idxTrain = training(cv);
idxTest = test(cv);

dataTrain = data(idxTrain, :);
dataTest = data(idxTest, :);

disp(['Training Samples: ', num2str(sum(idxTrain))]);
disp(['Testing Samples:  ', num2str(sum(idxTest))]);

%% 3. Model Selection

% A. Bagged Tree Ensemble (XGBoost Equivalent used: fitcensemble with Bag/LogitBoost)
disp('Training Bagged Tree Ensemble...');
t = templateTree('Reproducible',true);
% Using 'Bag' method for Random Forest behavior (robust) or 'LogitBoost' for boosting
model_ensemble = fitcensemble(dataTrain, 'Diabetes', ...
    'Method', 'Bag', ...
    'NumLearningCycles', 50, ...
    'Learners', t);

% B. Support Vector Machine (Gaussian Kernel)
disp('Training SVM (Gaussian Kernel)...');
% SVM requires numeric predictors usually, fitcsvm handles categorical automatically if specified 
% or creates dummies. fitcsvm allows categorical predictors.
model_svm = fitcsvm(dataTrain, 'Diabetes', ...
    'KernelFunction', 'gaussian', ...
    'Standardize', true);

%% 4. Evaluation
disp('Evaluating Models...');

% Predictions
[pred_ens, score_ens] = predict(model_ensemble, dataTest);
[pred_svm, score_svm] = predict(model_svm, dataTest);

% Confusion Check
figure('Name', 'Model Evaluation');
subplot(1,2,1);
confusionchart(dataTest.Diabetes, pred_ens);
title('Ensemble Confusion Matrix');

% ROC Metrics (Requires Statistics Toolbox R2021b+ or manually compute)
% We'll use a simpler ROC plot if rocmetrics isn't available, but assuming modern:
try
    subplot(1,2,2);
    [X_ens, Y_ens, ~, AUC_ens] = perfcurve(dataTest.Diabetes, score_ens(:,2), 1);
    [X_svm, Y_svm, ~, AUC_svm] = perfcurve(dataTest.Diabetes, score_svm(:,2), 1);
    
    plot(X_ens, Y_ens, 'LineWidth', 2); hold on;
    plot(X_svm, Y_svm, '--', 'LineWidth', 2);
    legend(['Ensemble (AUC=' num2str(AUC_ens, '%.2f') ')'], ...
           ['SVM (AUC=' num2str(AUC_svm, '%.2f') ')'], 'Location', 'SouthEast');
    xlabel('False Positive Rate'); ylabel('True Positive Rate');
    title('ROC Curve Comparison');
    hold off;
catch
    disp('Skipping ROC plot (perfcurve might be missing).');
end

%% 5. Comorbidity Risk (Advanced Feature E)
% Logic: Glucose_mean_24h > 180 AND Hypoglycemia_events_24h > 0 -> "High Risk for DKA"
% We apply this to the whole dataset or test set for demonstration.
% Let's create a function/logic for it to be used later.

% Vectorized check on the Test Set for report
high_risk_dka = (dataTest.Glucose_mean_24h > 180) & (dataTest.Hypoglycemia_events_24h > 0);
dataTest.High_Risk_DKA = high_risk_dka;
fprintf('High Risk DKA Patients identified in Test Set: %d\n', sum(high_risk_dka));

%% 6. Dynamic Risk Scoring (Simulated)
% Task: Simulate "Risk Trajectory" for top 3 high-risk patients.
% Interpolate 24h glucose mean and max.

% Identify top 3 highest probability patients from Ensemble model
[~, idx_sorted] = sort(score_ens(:,2), 'descend');
top3_idx = idx_sorted(1:3);
top3_patients = dataTest(top3_idx, :);

figure('Name', 'Simulated Risk Trajectory (Top 3 Patients)');
time_hours = 0:24; % 24 hour timeline

for i = 1:3
    % Simulate data: Start near Mean, struggle, peak at Max, maybe drop?
    % Determine logic: Polyfit or simple interpolation between points?
    % We have Mean and Max. Let's assume Mean is the baseline and Max is a peak event.
    % We'll simulate a random walk that respects the Mean and hits the Max.
    
    pat = top3_patients(i, :);
    g_mean = pat.Glucose_mean_24h;
    g_max = pat.Glucose_max_24h;
    
    % Simple Simulation: Sine wave + noise centered at Mean, scaling to hit Max
    % Amplitude ~ (Max - Mean)
    % Just a visualization mock.
    
    sim_trend = g_mean + (g_max - g_mean) * sin(2*pi*time_hours/24 + rand*pi) .* rand(1, 25);
    % Clamp mostly positive
    sim_trend(sim_trend < 0) = 0; 
    
    % Better pchip interpolation for smooth curve
    % Key points: Hour 0 (Mean), Hour 12 (Max), Hour 24 (Mean) - simplified
    key_t = [0, 8, 12, 16, 24];
    key_y = [g_mean, g_mean, g_max, g_mean*1.1, g_mean];
    sim_trend = interp1(key_t, key_y, time_hours, 'pchip');

    subplot(3, 1, i);
    plot(time_hours, sim_trend, 'r-o', 'LineWidth', 1.5, 'MarkerFaceColor', 'r');
    yline(180, 'k--', 'High Threshold');
    title(['Patient Rank #' num2str(i) ' - Prob: ' num2str(score_ens(top3_idx(i), 2)*100, '%.1f') '%']);
    ylabel('Glucose (mg/dL)');
    if i == 3, xlabel('Time (Hours)'); end
    axis tight; grid on;
end

%% Save Models
save('trained_models.mat', 'model_ensemble', 'model_svm', 'top3_patients');
disp('Models and Top Risk Patients saved to ''trained_models.mat''.');
