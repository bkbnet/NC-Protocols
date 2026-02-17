
import { NoteFile } from './types';

export const INITIAL_DOCS: NoteFile[] = [
  {
    id: 'pc2',
    name: 'PC 2: Pediatric Bradycardia',
    size: '154 KB',
    uploadDate: '2025-05-20',
    url: '#',
    content: `HISTORY: Past medical history, Foreign body exposure, Respiratory distress or arrest, Apnea, Possible toxic or poison exposure, Congenital disease, Medication (maternal or infant).
SIGNS AND SYMPTOMS: Decreased heart rate, Delayed capillary refill or cyanosis, Mottled, cool skin, Hypotension or arrest, Altered level of consciousness.
DIFFERENTIAL: Respiratory failure, Foreign body, Secretions, Infection (croup, epiglotitis), Hypovolemia (dehydration), Congenital heart disease, Trauma, Tension pneumothorax, Hypothermia, Toxin or medication, Hypoglycemia, Acidosis.
PROTOCOL: Typically HR < 60/min. Identify underlying cause. Search for reversible causes. 
REVERSIBLE CAUSES: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypothermia, Hypo/Hyperkalemia, Hypoglycemia, Tension pneumothorax, Tamponade (cardiac), Toxins, Thrombosis (pulmonary PE or coronary MI).
PEARLS: Bradycardia is often associated with hypoxia so ensure patent airway, breathing, and circulation as needed. Begin CPR immediately with persistent bradycardia and poor perfusion despite adequate oxygenation and ventilation.`
  },
  {
    id: 'te1',
    name: 'TE 1: Bites and Envenomations',
    size: '128 KB',
    uploadDate: '2025-05-20',
    url: '#',
    content: `HISTORY: Type of bite/sting, Description/photo, Time, location, size, Previous reaction, Domestic vs. Wild, Tetanus and Rabies risk.
SIGNS AND SYMPTOMS: Rash, skin break, wound, Pain, soft tissue swelling, redness, Blood oozing, Evidence of infection, Shortness of breath, wheezing, Allergic reaction, hives, itching, Hypotension or shock.
DIFFERENTIAL: Animal bite, Human bite, Snake bite (poisonous), Spider bite (poisonous), Insect sting/bite, Infection risk, Rabies risk, Tetanus risk.
SNAKE BITE PEARLS: Poisonous snakes in NC are generally pit vipers (rattlesnake and copperhead). Coral snakes are rare (Red on yellow - kill a fellow). Do not attempt to identify the snake if it endangers providers. Do not apply ice.
SPIDER BITE PEARLS: Black Widow: muscular pain and severe abdominal pain. Brown Recluse: tissue necrosis develops over next few days.`
  },
  {
    id: 'up7',
    name: 'UP 7: Dental Problems',
    size: '92 KB',
    uploadDate: '2025-05-20',
    url: '#',
    content: `SIGNS AND SYMPTOMS: Bleeding, Pain, Fever, Swelling, Tooth missing or fractured.
DIFFERENTIAL: Decay, Infection, Fracture, Avulsion, Abscess, Facial cellulitis, Impacted tooth, TMJ syndrome, Myocardial infarction.
AVULSED TOOTH PEARLS: Handle tooth by crown, do not touch root. Rinse if soiled but do not scrub (damages ligaments). Reimplantation is possible within 4 hours if properly cared for, unlikely after 1 hour. Transport tooth in Milk, Commercial solution, Saliva, or IV solution.
BLEEDING: Control with direct pressure using gauze in socket with patient closing teeth to exert pressure.`
  },
  {
    id: 'up6',
    name: 'UP 6: IV or IO Access',
    size: '110 KB',
    uploadDate: '2025-05-20',
    url: '#',
    content: `INDICATIONS: Chronic medical conditions, ESRD/Hemodialysis, Chronic IV nutrition.
DEVICES: Port-a-cath (surgically implanted beneath skin), Dialysis Catheter (RED port indicates use for dialysis), PICC Line, Central Line.
PEARLS: Central line catheters placed for chemo, meds, electrolytes, antibiotics, and blood are available to EMS. 
DIALYSIS RESTRICTION: Central line catheters placed for hemodialysis are NOT available for access by EMS unless the patient is in cardiac arrest.
CLEANING: When accessing central catheter, ensure sterility by cleaning port with alcohol 2-3 times prior to access.`
  },
  {
    id: 'up15',
    name: 'UP 15: Suspected Sepsis',
    size: '142 KB',
    uploadDate: '2025-05-20',
    url: '#',
    content: `ADULT SIRS CRITERIA: Temp >= 100.4F (38C) or <= 96.8F (36C) AND any 1 of: HR > 90, RR > 20, EtCO2 < 25 mmHg.
ADULT qSOFA CRITERIA: SBP <= 100 mmHg, RR >= 22, AMS or new mental status change.
PEDIATRIC SIRS CRITERIA: Heart Rate 1mo-1yr > 180, 2-5yr > 140, 6-12yr > 130, 13-18yr > 120.
PEARLS: Sepsis is a life-threatening condition where the body's immune response to infection injures its own tissues and organs. Abnormally low temperatures increase mortality, often found in geriatric patients.`
  }
];
