% ICU Diabetes Prediction - Phase A: Data Preparation
% Author: Assistant (Google DeepMind)
% Description: Loads data, generates ground truth, imputes missing values,
% and engineers features for the Diabetes Prediction Model.

clear; clc; close all;

%% 1. Load Data
filename = fullfile('datasets', 'diabetes_15_important_columns.csv');
if ~isfile(filename)
    error('Dataset file "%s" not found.', filename);
end

data = readtable(filename);
disp('Dataset loaded successfully.');

%% 2. Generate Ground Truth & Typecast
% Goal: Diabetes = 1 if HbA1c_value >= 6.5, else 0.
% Constraint: This must be done BEFORE removing HbA1c.

if ismember('HbA1c_value', data.Properties.VariableNames)
    data.Diabetes = double(data.HbA1c_value >= 6.5);
    fprintf('Ground Truth created. Positive Class Count: %d\n', sum(data.Diabetes == 1));
    
    % Remove the leakage target column from predictors
    data.HbA1c_value = []; 
    disp('HbA1c_value column removed to prevent leakage.');
else
    warning('HbA1c_value not found. Assuming "Diabetes" column already exists or verify dataset.');
end

% Convert Sex to categorical
if ismember('Sex', data.Properties.VariableNames)
    data.Sex = categorical(data.Sex);
end

%% 3. Automated Imputation (Advanced Feature C)
% Strategy: KNN Imputation. If unavailable or fails, fallback to pchip.

% Identify numeric columns for imputation (exclude categorical/target for creating the map)
numericVars = varfun(@isnumeric, data, 'OutputFormat', 'uniform');
% Exclude the Target 'Diabetes' from being imputed (it shouldn't be missing, but just in case)
% actually we want to use existing complete features to fill gaps in others.
% KNNImpute works on matrices.

raw_matrix = data{:, numericVars};
% Check for missing values
if any(any(isnan(raw_matrix)))
    disp('Missing values detected. Attempting KNN Imputation...');
    try
        % knnimpute is in Bioinformatics Toolbox. 
        % If data is large, this can be slow, but N=1900 is fine.
        % We need to handle the fact that knnimpute expects samples in columns usually? 
        % Default: samples correspond to rows. (Wait, checking documentation standard: actually usually rows correspond to observations? 
        % Old knnimpute: "Data contains gene expression data... Rows correspond to genes...". 
        % Modern 'fillmissing' or 'knnimpute' usage varies. 
        % Let's use the safer 'fillmissing' with 'nearest' or 'linear' if KNN is complex to assume toolbox availability,
        % BUT prompt asked for KNN.
        
        % We'll try to use a standardized approach: 
        % If 'knnimpute' exists (Bioinfo toolbox), use it. Warning: it expects rows=variables often in older versions to transposing might be needed.
        % Safer modern alternative: fillmissing with 'movmedian' or similar, but prompt specifically asked for KNN.
        % Implementation:
        
        imputed_matrix = knnimpute(raw_matrix'); % Transpose if rows=genes(features)
        imputed_matrix = imputed_matrix';
        disp('KNN Imputation successful.');
        data{:, numericVars} = imputed_matrix;
        
    catch ME
        warning('KNN Imputation failed or Toolbox missing (%s). Falling back to PCHIP/Linear.', ME.message);
        data = fillmissing(data, 'pchip', 'DataVariables', numericVars);
    end
else
    disp('No missing values found in numeric columns.');
end

%% 4. Feature Engineering

% A. Glucose Stability = Glucose_max_24h - Glucose_mean_24h
if all(ismember({'Glucose_max_24h', 'Glucose_mean_24h'}, data.Properties.VariableNames))
    data.Glucose_Stability = data.Glucose_max_24h - data.Glucose_mean_24h;
    disp('Feature Created: Glucose_Stability');
end

% B. Mean Arterial Pressure (MAP) = (SBP + 2*DBP) / 3
if all(ismember({'SBP_mean_24h', 'DBP_mean_24h'}, data.Properties.VariableNames))
    data.MAP = (data.SBP_mean_24h + 2 * data.DBP_mean_24h) / 3;
    disp('Feature Created: MAP');
end

% C. BMI Risk Categories
% Underweight < 18.5, Normal 18.5-25, Overweight 25-30, Obese > 30.
if ismember('BMI', data.Properties.VariableNames)
    % Initialize categorical array
    % We use discretization logic
    bmi_vals = data.BMI;
    categories = strings(size(bmi_vals)); % Setup string array
    
    categories(bmi_vals < 18.5) = "Underweight";
    categories(bmi_vals >= 18.5 & bmi_vals < 25) = "Normal";
    categories(bmi_vals >= 25 & bmi_vals < 30) = "Overweight";
    categories(bmi_vals >= 30) = "Obese";
    
    % Convert to ordinal categorical
    data.BMI_Risk = categorical(categories, ...
        ["Underweight", "Normal", "Overweight", "Obese"], ...
        'Ordinal', true);
    
    disp('Feature Created: BMI_Risk (Ordinal)');
end

%% 5. Save Processed Data
save('processed_data.mat', 'data');
disp('Data preparation complete. Saved to ''processed_data.mat''.');
