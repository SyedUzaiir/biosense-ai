export interface Patient {
    id: string;
    name: string;
    age: number;
    sex: 'Male' | 'Female';
    bmi: number;
    hba1c: number;
    glucose_mean_24h: number;
    glucose_max_24h: number;
    hypo_events_24h: number;
    hyper_events_24h: number;
    insulin_any_24h: 'Yes' | 'No';
    diabetesStatus: 'Stable 🟢' | 'At Risk 🟡' | 'High Risk 🔴';
    sbp_mean_24h: number;
    dbp_mean_24h: number;
    history_htn: 'Yes' | 'No';
    hr_mean_24h: number;
    spo2_mean_24h: number;
    temp_mean_24h: number;
    emotionResult?: string;
    emotionConfidence?: number;
    lastUpdated?: string;
    diabetesPrediction?: string;
}

const FIRST_NAMES = [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth',
    'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
    'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra'
];
const LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

// Seeded Random Number Generator
class SeededRandom {
    private seed: number;
    constructor(seed: number) {
        this.seed = seed;
    }

    // Linear Congruential Generator
    private next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    public int(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    public float(min: number, max: number, decimals: number = 1): number {
        const val = this.next() * (max - min) + min;
        return parseFloat(val.toFixed(decimals));
    }

    public element<T>(arr: T[]): T {
        return arr[Math.floor(this.next() * arr.length)];
    }

    public bool(chance: number = 0.5): boolean {
        return this.next() < chance;
    }
}

const rng = new SeededRandom(12345); // Fixed seed for stability

export const generateUsers = (count: number = 25): Patient[] => {
    const users: Patient[] = [];
    for (let i = 1; i <= count; i++) {
        const isMale = rng.bool(0.5);
        const sex = isMale ? 'Male' : 'Female';
        const bmi = rng.float(18.5, 38, 1);

        // Correlate some data for realism
        // Higher BMI increases risk of Type 2
        const riskFactor = (bmi - 25) / 10; // normalized rough risk
        const isHighRisk = bmi > 30 || rng.bool(0.3 + (riskFactor * 0.2));

        const glucoseBase = isHighRisk ? 120 : 85;
        const glucoseMean = rng.int(glucoseBase - 10, glucoseBase + 50);
        const glucoseMax = glucoseMean + rng.int(10, 80);
        const hba1c = rng.float(4.5, isHighRisk ? 10.0 : 6.2, 1);

        const historyHtn = (isHighRisk && rng.bool(0.6)) ? 'Yes' : 'No';

        let diabetesStatus: 'Stable 🟢' | 'At Risk 🟡' | 'High Risk 🔴' = 'Stable 🟢';
        let diabetesPrediction = 'Stable';
        
        if (hba1c > 7 || glucoseMean > 160) {
            diabetesStatus = 'High Risk 🔴';
            diabetesPrediction = 'High Risk - Consult Doctor';
        } else if ((hba1c >= 5.7 && hba1c <= 7) || glucoseMean > 120 || (bmi > 30 && historyHtn === 'Yes')) {
            diabetesStatus = 'At Risk 🟡';
            diabetesPrediction = 'At Risk - Lifestyle changes needed';
        }

        const emotions = [
            '😊 Stable Psychological State',
            '😐 Baseline Emotional State',
            '😫 Elevated Stress Response',
            '😰 High Stress Indicators',
            '😢 Mild Depressive Indicators'
        ];
        const emotionResult = rng.bool(0.1) ? '❓ Unknown' : rng.element(emotions);
        const emotionConfidence = Math.floor(75 + Math.random() * 20); // random 75-94
        
        const hour = rng.int(9, 17);
        const min = rng.int(0, 59).toString().padStart(2, '0');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        const lastUpdated = `${displayHour.toString().padStart(2, '0')}:${min} ${ampm}`;

        users.push({
            id: `PID-${1000 + i}`,
            name: `${rng.element(FIRST_NAMES)} ${rng.element(LAST_NAMES)}`,
            age: rng.int(25, 85),
            sex,
            bmi,
            hba1c,
            glucose_mean_24h: glucoseMean,
            glucose_max_24h: glucoseMax,
            hypo_events_24h: rng.int(0, isHighRisk ? 3 : 0),
            hyper_events_24h: rng.int(0, isHighRisk ? 5 : 1),
            insulin_any_24h: (isHighRisk && rng.bool(0.4)) ? 'Yes' : 'No',
            diabetesStatus,
            sbp_mean_24h: rng.int(110, 165),
            dbp_mean_24h: rng.int(70, 98),
            history_htn: historyHtn,
            hr_mean_24h: rng.int(60, 100),
            spo2_mean_24h: rng.int(94, 100),
            temp_mean_24h: rng.float(36.1, 37.2, 1),
            emotionResult,
            emotionConfidence,
            lastUpdated,
            diabetesPrediction
        });
    }
    return users;
};

// Generate static list
export const MOCK_PATIENTS = generateUsers(25);
