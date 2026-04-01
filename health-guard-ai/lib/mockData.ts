export interface Patient {
    id: string;
    name: string;
    age: number;
    sex: 'Male' | 'Female';
    bmi: number;
    hba1c: number;
    glucose_random: number;
    hypoglycemia: boolean;
    hyperglycemia: boolean;
    diabetesStatus: 'Normal' | 'Pre-diabetic' | 'High Risk';
    insulin_avg: number;
    sbp_mean: number;
    dbp_mean: number;
    history_htn: boolean;
    hr_mean: number;
    spo2_mean: number;
    temp_mean: number;
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
        const glucoseRandom = rng.int(glucoseBase - 20, glucoseBase + 100);
        const hba1c = rng.float(4.5, isHighRisk ? 10.0 : 6.2, 1);

        let diabetesStatus: 'Normal' | 'Pre-diabetic' | 'High Risk' = 'Normal';
        if (hba1c >= 6.5 || glucoseRandom > 200) {
            diabetesStatus = 'High Risk';
        } else if (hba1c >= 5.7 || glucoseRandom > 140) {
            diabetesStatus = 'Pre-diabetic';
        }

        users.push({
            id: `PID-${1000 + i}`,
            name: `${rng.element(FIRST_NAMES)} ${rng.element(LAST_NAMES)}`,
            age: rng.int(25, 85),
            sex,
            bmi,
            hba1c,
            glucose_random: glucoseRandom,
            hypoglycemia: glucoseRandom < 70,
            hyperglycemia: glucoseRandom > 180,
            diabetesStatus,
            insulin_avg: rng.float(5, 25, 1),
            sbp_mean: rng.int(110, 165),
            dbp_mean: rng.int(70, 98),
            history_htn: isHighRisk && rng.bool(0.6),
            hr_mean: rng.int(60, 100),
            spo2_mean: rng.int(94, 100),
            temp_mean: rng.float(36.1, 37.2, 1),
        });
    }
    return users;
};

// Generate static list
export const MOCK_PATIENTS = generateUsers(25);
