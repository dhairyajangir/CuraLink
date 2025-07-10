export const specialties = [
  // Primary Care
  {
    id: 'general-medicine',
    name: 'General Medicine',
    description: 'Primary healthcare and general medical conditions',
    icon: '🩺',
    doctorCount: 245,
    commonConditions: ['Fever', 'Cold & Flu', 'Headaches', 'General Health Checkup']
  },
  {
    id: 'family-medicine',
    name: 'Family Medicine',
    description: 'Comprehensive healthcare for all ages',
    icon: '👨‍👩‍👧‍👦',
    doctorCount: 189,
    commonConditions: ['Preventive Care', 'Chronic Disease Management', 'Health Screenings']
  },
  {
    id: 'internal-medicine',
    name: 'Internal Medicine',
    description: 'Adult medicine and complex medical conditions',
    icon: '🔬',
    doctorCount: 167,
    commonConditions: ['Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease']
  },

  // Cardiology & Vascular
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart and cardiovascular system',
    icon: '❤️',
    doctorCount: 156,
    commonConditions: ['Heart Disease', 'High Blood Pressure', 'Chest Pain', 'Heart Attack']
  },
  {
    id: 'cardiac-surgery',
    name: 'Cardiac Surgery',
    description: 'Surgical treatment of heart conditions',
    icon: '🫀',
    doctorCount: 45,
    commonConditions: ['Heart Bypass', 'Valve Replacement', 'Angioplasty']
  },
  {
    id: 'vascular-surgery',
    name: 'Vascular Surgery',
    description: 'Blood vessel and circulation disorders',
    icon: '🩸',
    doctorCount: 38,
    commonConditions: ['Varicose Veins', 'Aneurysms', 'Peripheral Artery Disease']
  },

  // Neurology & Mental Health
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Brain and nervous system disorders',
    icon: '🧠',
    doctorCount: 89,
    commonConditions: ['Headaches', 'Epilepsy', 'Stroke', 'Alzheimer\'s', 'Parkinson\'s']
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    description: 'Surgical treatment of brain and spine conditions',
    icon: '🧠',
    doctorCount: 34,
    commonConditions: ['Brain Tumors', 'Spinal Surgery', 'Head Trauma']
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    description: 'Mental health and behavioral disorders',
    icon: '🧘',
    doctorCount: 134,
    commonConditions: ['Depression', 'Anxiety', 'ADHD', 'Bipolar Disorder', 'PTSD']
  },
  {
    id: 'psychology',
    name: 'Psychology',
    description: 'Counseling and therapy services',
    icon: '💭',
    doctorCount: 98,
    commonConditions: ['Therapy', 'Counseling', 'Behavioral Issues', 'Stress Management']
  },

  // Orthopedics & Sports Medicine
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Bones, joints, and musculoskeletal system',
    icon: '🦴',
    doctorCount: 123,
    commonConditions: ['Fractures', 'Arthritis', 'Back Pain', 'Sports Injuries']
  },
  {
    id: 'sports-medicine',
    name: 'Sports Medicine',
    description: 'Athletic injuries and performance',
    icon: '⚽',
    doctorCount: 67,
    commonConditions: ['Sports Injuries', 'Athletic Performance', 'Rehabilitation']
  },
  {
    id: 'rheumatology',
    name: 'Rheumatology',
    description: 'Autoimmune and joint diseases',
    icon: '🦴',
    doctorCount: 45,
    commonConditions: ['Rheumatoid Arthritis', 'Lupus', 'Fibromyalgia']
  },

  // Women's Health
  {
    id: 'gynecology',
    name: 'Gynecology',
    description: 'Women\'s reproductive health',
    icon: '👩‍⚕️',
    doctorCount: 145,
    commonConditions: ['PCOS', 'Pregnancy Care', 'Menstrual Issues', 'Infertility']
  },
  {
    id: 'obstetrics',
    name: 'Obstetrics',
    description: 'Pregnancy and childbirth care',
    icon: '🤱',
    doctorCount: 89,
    commonConditions: ['Pregnancy Care', 'Prenatal Care', 'Delivery', 'Postpartum Care']
  },
  {
    id: 'fertility',
    name: 'Fertility & IVF',
    description: 'Reproductive medicine and fertility treatments',
    icon: '👶',
    doctorCount: 34,
    commonConditions: ['Infertility', 'IVF', 'Fertility Testing', 'Reproductive Health']
  },

  // Pediatrics & Child Health
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Medical care for infants, children, and adolescents',
    icon: '👶',
    doctorCount: 167,
    commonConditions: ['Fever', 'Vaccination', 'Growth Issues', 'Allergies', 'ADHD']
  },
  {
    id: 'pediatric-surgery',
    name: 'Pediatric Surgery',
    description: 'Surgical care for children',
    icon: '🏥',
    doctorCount: 23,
    commonConditions: ['Congenital Defects', 'Pediatric Tumors', 'Trauma Surgery']
  },
  {
    id: 'neonatology',
    name: 'Neonatology',
    description: 'Care for newborns and premature babies',
    icon: '👶',
    doctorCount: 34,
    commonConditions: ['Premature Birth', 'Birth Complications', 'Newborn Care']
  },

  // Skin & Cosmetic
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Skin, hair, and nail conditions',
    icon: '🧴',
    doctorCount: 112,
    commonConditions: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer', 'Hair Loss']
  },
  {
    id: 'cosmetic-surgery',
    name: 'Cosmetic Surgery',
    description: 'Aesthetic and reconstructive surgery',
    icon: '✨',
    doctorCount: 67,
    commonConditions: ['Plastic Surgery', 'Botox', 'Facelifts', 'Body Contouring']
  },

  // Eye & Vision
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    description: 'Eye and vision care',
    icon: '👁️',
    doctorCount: 78,
    commonConditions: ['Cataracts', 'Glaucoma', 'Vision Problems', 'Eye Infections', 'Retinal Issues']
  },
  {
    id: 'optometry',
    name: 'Optometry',
    description: 'Vision correction and eye exams',
    icon: '👓',
    doctorCount: 89,
    commonConditions: ['Vision Testing', 'Glasses', 'Contact Lenses', 'Eye Exams']
  },

  // ENT & Respiratory
  {
    id: 'ent',
    name: 'ENT (Otolaryngology)',
    description: 'Ear, nose, and throat conditions',
    icon: '👂',
    doctorCount: 89,
    commonConditions: ['Hearing Loss', 'Sinus Issues', 'Throat Infections', 'Tonsillitis']
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    description: 'Lung and respiratory system',
    icon: '🫁',
    doctorCount: 67,
    commonConditions: ['Asthma', 'COPD', 'Pneumonia', 'Sleep Apnea', 'Lung Cancer']
  },

  // Digestive Health
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    description: 'Digestive system disorders',
    icon: '🫁',
    doctorCount: 89,
    commonConditions: ['Acid Reflux', 'IBS', 'Liver Disease', 'Ulcers', 'Colonoscopy']
  },
  {
    id: 'hepatology',
    name: 'Hepatology',
    description: 'Liver diseases and disorders',
    icon: '🫁',
    doctorCount: 34,
    commonConditions: ['Hepatitis', 'Liver Cirrhosis', 'Fatty Liver Disease']
  },

  // Kidney & Urinary
  {
    id: 'nephrology',
    name: 'Nephrology',
    description: 'Kidney diseases and disorders',
    icon: '🫘',
    doctorCount: 56,
    commonConditions: ['Kidney Disease', 'Dialysis', 'Kidney Stones', 'Hypertension']
  },
  {
    id: 'urology',
    name: 'Urology',
    description: 'Urinary tract and male reproductive system',
    icon: '🫘',
    doctorCount: 78,
    commonConditions: ['Kidney Stones', 'Prostate Issues', 'UTI', 'Erectile Dysfunction']
  },

  // Cancer & Blood
  {
    id: 'oncology',
    name: 'Oncology',
    description: 'Cancer diagnosis and treatment',
    icon: '🎗️',
    doctorCount: 89,
    commonConditions: ['Cancer Treatment', 'Chemotherapy', 'Radiation Therapy', 'Tumor Surgery']
  },
  {
    id: 'hematology',
    name: 'Hematology',
    description: 'Blood disorders and diseases',
    icon: '🩸',
    doctorCount: 45,
    commonConditions: ['Anemia', 'Leukemia', 'Blood Clots', 'Bleeding Disorders']
  },

  // Hormones & Metabolism
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    description: 'Hormone and metabolic disorders',
    icon: '⚖️',
    doctorCount: 67,
    commonConditions: ['Diabetes', 'Thyroid Issues', 'Obesity', 'Hormone Imbalance']
  },

  // Emergency & Critical Care
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    description: 'Urgent and emergency medical care',
    icon: '🚨',
    doctorCount: 134,
    commonConditions: ['Emergency Care', 'Trauma', 'Urgent Care', 'Critical Care']
  },
  {
    id: 'critical-care',
    name: 'Critical Care',
    description: 'Intensive care and life support',
    icon: '🏥',
    doctorCount: 56,
    commonConditions: ['ICU Care', 'Ventilator Support', 'Organ Failure', 'Sepsis']
  },

  // Anesthesia & Pain
  {
    id: 'anesthesiology',
    name: 'Anesthesiology',
    description: 'Anesthesia and pain management',
    icon: '💉',
    doctorCount: 78,
    commonConditions: ['Surgery Anesthesia', 'Pain Management', 'Chronic Pain']
  },
  {
    id: 'pain-management',
    name: 'Pain Management',
    description: 'Chronic pain treatment',
    icon: '🎯',
    doctorCount: 45,
    commonConditions: ['Chronic Pain', 'Back Pain', 'Arthritis Pain', 'Nerve Pain']
  },

  // Radiology & Pathology
  {
    id: 'radiology',
    name: 'Radiology',
    description: 'Medical imaging and diagnostics',
    icon: '📷',
    doctorCount: 89,
    commonConditions: ['X-rays', 'MRI', 'CT Scans', 'Ultrasound', 'Mammography']
  },
  {
    id: 'pathology',
    name: 'Pathology',
    description: 'Disease diagnosis through lab testing',
    icon: '🔬',
    doctorCount: 34,
    commonConditions: ['Lab Tests', 'Biopsy', 'Blood Tests', 'Tissue Analysis']
  },

  // Infectious Diseases
  {
    id: 'infectious-disease',
    name: 'Infectious Disease',
    description: 'Bacterial, viral, and parasitic infections',
    icon: '🦠',
    doctorCount: 45,
    commonConditions: ['COVID-19', 'HIV/AIDS', 'Hepatitis', 'Travel Medicine']
  },

  // Geriatrics
  {
    id: 'geriatrics',
    name: 'Geriatrics',
    description: 'Healthcare for elderly patients',
    icon: '👴',
    doctorCount: 67,
    commonConditions: ['Age-related Issues', 'Memory Problems', 'Mobility Issues', 'Medication Management']
  },

  // Alternative Medicine
  {
    id: 'integrative-medicine',
    name: 'Integrative Medicine',
    description: 'Holistic and alternative treatments',
    icon: '🌿',
    doctorCount: 34,
    commonConditions: ['Holistic Care', 'Acupuncture', 'Herbal Medicine', 'Wellness']
  }
];

export const commonHealthProblems = [
  // Common Symptoms
  {
    id: 'fever',
    name: 'Fever & Chills',
    description: 'High body temperature and related symptoms',
    specialties: ['General Medicine', 'Pediatrics', 'Infectious Disease'],
    symptoms: ['High temperature', 'Chills', 'Sweating', 'Headache', 'Body aches']
  },
  {
    id: 'headache',
    name: 'Headache & Migraine',
    description: 'Head pain and related symptoms',
    specialties: ['Neurology', 'General Medicine'],
    symptoms: ['Head pain', 'Sensitivity to light', 'Nausea', 'Dizziness', 'Visual disturbances']
  },
  {
    id: 'cold-flu',
    name: 'Cold & Flu',
    description: 'Upper respiratory infections',
    specialties: ['General Medicine', 'Family Medicine'],
    symptoms: ['Runny nose', 'Cough', 'Sore throat', 'Congestion', 'Fatigue']
  },
  {
    id: 'cough',
    name: 'Persistent Cough',
    description: 'Chronic or severe coughing',
    specialties: ['Pulmonology', 'General Medicine'],
    symptoms: ['Dry cough', 'Productive cough', 'Chest pain', 'Shortness of breath']
  },

  // Pain Conditions
  {
    id: 'back-pain',
    name: 'Back Pain',
    description: 'Lower back, upper back, and spine pain',
    specialties: ['Orthopedics', 'Pain Management', 'Neurology'],
    symptoms: ['Lower back pain', 'Stiffness', 'Muscle spasms', 'Limited mobility', 'Radiating pain']
  },
  {
    id: 'joint-pain',
    name: 'Joint Pain & Arthritis',
    description: 'Joint inflammation and pain',
    specialties: ['Rheumatology', 'Orthopedics'],
    symptoms: ['Joint stiffness', 'Swelling', 'Pain', 'Limited range of motion']
  },
  {
    id: 'neck-pain',
    name: 'Neck Pain',
    description: 'Neck stiffness and pain',
    specialties: ['Orthopedics', 'Pain Management'],
    symptoms: ['Neck stiffness', 'Headaches', 'Shoulder pain', 'Limited movement']
  },
  {
    id: 'muscle-pain',
    name: 'Muscle Pain',
    description: 'Muscle aches and strains',
    specialties: ['Sports Medicine', 'Orthopedics'],
    symptoms: ['Muscle aches', 'Stiffness', 'Weakness', 'Cramping']
  },

  // Cardiovascular
  {
    id: 'chest-pain',
    name: 'Chest Pain',
    description: 'Chest discomfort and heart-related symptoms',
    specialties: ['Cardiology', 'Emergency Medicine'],
    symptoms: ['Chest discomfort', 'Shortness of breath', 'Sweating', 'Nausea', 'Arm pain']
  },
  {
    id: 'high-blood-pressure',
    name: 'High Blood Pressure',
    description: 'Hypertension and cardiovascular risk',
    specialties: ['Cardiology', 'Internal Medicine'],
    symptoms: ['Headaches', 'Dizziness', 'Chest pain', 'Shortness of breath']
  },
  {
    id: 'heart-palpitations',
    name: 'Heart Palpitations',
    description: 'Irregular or rapid heartbeat',
    specialties: ['Cardiology', 'Internal Medicine'],
    symptoms: ['Racing heart', 'Fluttering', 'Skipped beats', 'Chest discomfort']
  },

  // Digestive Issues
  {
    id: 'stomach-pain',
    name: 'Stomach Pain',
    description: 'Abdominal pain and digestive issues',
    specialties: ['Gastroenterology', 'General Medicine'],
    symptoms: ['Abdominal pain', 'Nausea', 'Bloating', 'Indigestion', 'Cramping']
  },
  {
    id: 'acid-reflux',
    name: 'Acid Reflux & GERD',
    description: 'Heartburn and acid reflux symptoms',
    specialties: ['Gastroenterology', 'General Medicine'],
    symptoms: ['Heartburn', 'Acid taste', 'Chest pain', 'Difficulty swallowing']
  },
  {
    id: 'nausea-vomiting',
    name: 'Nausea & Vomiting',
    description: 'Persistent nausea and vomiting',
    specialties: ['Gastroenterology', 'General Medicine'],
    symptoms: ['Nausea', 'Vomiting', 'Loss of appetite', 'Dehydration']
  },
  {
    id: 'constipation',
    name: 'Constipation',
    description: 'Difficulty with bowel movements',
    specialties: ['Gastroenterology', 'General Medicine'],
    symptoms: ['Infrequent bowel movements', 'Hard stools', 'Straining', 'Bloating']
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    description: 'Loose or frequent bowel movements',
    specialties: ['Gastroenterology', 'Infectious Disease'],
    symptoms: ['Loose stools', 'Frequent bowel movements', 'Cramping', 'Dehydration']
  },

  // Skin Problems
  {
    id: 'skin-rash',
    name: 'Skin Rash & Irritation',
    description: 'Various skin conditions and rashes',
    specialties: ['Dermatology'],
    symptoms: ['Rash', 'Itching', 'Redness', 'Dry skin', 'Bumps']
  },
  {
    id: 'acne',
    name: 'Acne & Skin Breakouts',
    description: 'Acne and skin blemishes',
    specialties: ['Dermatology'],
    symptoms: ['Pimples', 'Blackheads', 'Whiteheads', 'Oily skin', 'Scarring']
  },
  {
    id: 'eczema',
    name: 'Eczema & Dry Skin',
    description: 'Chronic skin inflammation',
    specialties: ['Dermatology', 'Allergy & Immunology'],
    symptoms: ['Dry skin', 'Itching', 'Red patches', 'Scaling', 'Cracking']
  },

  // Mental Health
  {
    id: 'anxiety',
    name: 'Anxiety & Panic',
    description: 'Anxiety disorders and panic attacks',
    specialties: ['Psychiatry', 'Psychology'],
    symptoms: ['Excessive worry', 'Restlessness', 'Fatigue', 'Difficulty concentrating', 'Panic attacks']
  },
  {
    id: 'depression',
    name: 'Depression & Mood',
    description: 'Depression and mood disorders',
    specialties: ['Psychiatry', 'Psychology'],
    symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep problems', 'Appetite changes']
  },
  {
    id: 'stress',
    name: 'Stress & Burnout',
    description: 'Chronic stress and burnout symptoms',
    specialties: ['Psychology', 'Psychiatry'],
    symptoms: ['Chronic stress', 'Exhaustion', 'Irritability', 'Sleep problems', 'Physical tension']
  },
  {
    id: 'insomnia',
    name: 'Sleep Problems',
    description: 'Insomnia and sleep disorders',
    specialties: ['Sleep Medicine', 'Neurology'],
    symptoms: ['Difficulty falling asleep', 'Frequent waking', 'Daytime fatigue', 'Restless sleep']
  },

  // Women's Health
  {
    id: 'menstrual-problems',
    name: 'Menstrual Problems',
    description: 'Irregular periods and menstrual issues',
    specialties: ['Gynecology', 'Endocrinology'],
    symptoms: ['Irregular periods', 'Heavy bleeding', 'Severe cramps', 'PMS symptoms']
  },
  {
    id: 'pregnancy-care',
    name: 'Pregnancy Care',
    description: 'Prenatal care and pregnancy concerns',
    specialties: ['Obstetrics', 'Gynecology'],
    symptoms: ['Morning sickness', 'Prenatal checkups', 'Pregnancy complications']
  },
  {
    id: 'menopause',
    name: 'Menopause Symptoms',
    description: 'Menopause and hormonal changes',
    specialties: ['Gynecology', 'Endocrinology'],
    symptoms: ['Hot flashes', 'Night sweats', 'Mood changes', 'Sleep problems']
  },

  // Chronic Conditions
  {
    id: 'diabetes',
    name: 'Diabetes Management',
    description: 'Blood sugar regulation and diabetes care',
    specialties: ['Endocrinology', 'Internal Medicine'],
    symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing']
  },
  {
    id: 'thyroid-problems',
    name: 'Thyroid Problems',
    description: 'Thyroid disorders and hormone imbalance',
    specialties: ['Endocrinology', 'Internal Medicine'],
    symptoms: ['Weight changes', 'Fatigue', 'Hair loss', 'Temperature sensitivity', 'Mood changes']
  },
  {
    id: 'allergies',
    name: 'Allergies & Reactions',
    description: 'Allergic reactions and sensitivities',
    specialties: ['Allergy & Immunology', 'Dermatology'],
    symptoms: ['Sneezing', 'Runny nose', 'Itchy eyes', 'Skin reactions', 'Breathing problems']
  },
  {
    id: 'asthma',
    name: 'Asthma & Breathing',
    description: 'Asthma and respiratory problems',
    specialties: ['Pulmonology', 'Allergy & Immunology'],
    symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing', 'Breathing difficulty']
  },

  // Eye & Vision
  {
    id: 'vision-problems',
    name: 'Vision Problems',
    description: 'Blurred vision and eye issues',
    specialties: ['Ophthalmology', 'Optometry'],
    symptoms: ['Blurred vision', 'Eye strain', 'Double vision', 'Light sensitivity', 'Eye pain']
  },
  {
    id: 'eye-infection',
    name: 'Eye Infections',
    description: 'Pink eye and other eye infections',
    specialties: ['Ophthalmology', 'General Medicine'],
    symptoms: ['Red eyes', 'Discharge', 'Itching', 'Pain', 'Swelling']
  },

  // Ear & Hearing
  {
    id: 'ear-infection',
    name: 'Ear Infections',
    description: 'Ear pain and infections',
    specialties: ['ENT', 'General Medicine'],
    symptoms: ['Ear pain', 'Hearing loss', 'Discharge', 'Fever', 'Dizziness']
  },
  {
    id: 'hearing-loss',
    name: 'Hearing Problems',
    description: 'Hearing loss and ear issues',
    specialties: ['ENT', 'Audiology'],
    symptoms: ['Hearing loss', 'Ringing in ears', 'Ear pressure', 'Balance problems']
  },

  // Urinary & Kidney
  {
    id: 'uti',
    name: 'Urinary Tract Infection',
    description: 'UTI and bladder infections',
    specialties: ['Urology', 'General Medicine'],
    symptoms: ['Burning urination', 'Frequent urination', 'Pelvic pain', 'Cloudy urine']
  },
  {
    id: 'kidney-stones',
    name: 'Kidney Stones',
    description: 'Kidney stone pain and treatment',
    specialties: ['Urology', 'Nephrology'],
    symptoms: ['Severe back pain', 'Blood in urine', 'Nausea', 'Frequent urination']
  },

  // Sexual Health
  {
    id: 'erectile-dysfunction',
    name: 'Erectile Dysfunction',
    description: 'Male sexual health issues',
    specialties: ['Urology', 'Endocrinology'],
    symptoms: ['Difficulty maintaining erection', 'Reduced sexual desire', 'Performance anxiety']
  },
  {
    id: 'std-testing',
    name: 'STD Testing & Treatment',
    description: 'Sexual health screening and treatment',
    specialties: ['Infectious Disease', 'Urology', 'Gynecology'],
    symptoms: ['Unusual discharge', 'Burning sensation', 'Sores', 'Itching']
  },

  // Weight & Nutrition
  {
    id: 'weight-management',
    name: 'Weight Management',
    description: 'Obesity and weight loss support',
    specialties: ['Endocrinology', 'Bariatric Surgery'],
    symptoms: ['Difficulty losing weight', 'Metabolic issues', 'Eating disorders']
  },
  {
    id: 'eating-disorders',
    name: 'Eating Disorders',
    description: 'Anorexia, bulimia, and eating issues',
    specialties: ['Psychology', 'Psychiatry'],
    symptoms: ['Abnormal eating patterns', 'Body image issues', 'Weight fluctuations']
  }
];