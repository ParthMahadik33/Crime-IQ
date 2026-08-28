# NETRA (Crime-IQ)
### Network Intelligence & Threat Relationship Analysis

> **An AI-powered criminal network intelligence and investigation system built for law enforcement, intelligence agencies, and financial crime investigators (SIH Prototype - OPERATION NEXUS).**

---

## 📌 Problem Statement

Criminal networks operate across fragmented, multi-agency data silos. Traditional investigation teams struggle to manually connect disparate records such as:
- Police FIRs & Charge Sheets
- Call Detail Records (CDRs) & IMEI Logs
- Hawala Transactions & Shell Company Financial Streams
- Highway ANPR (Automated Number Plate Recognition) & Cell Tower Geo-locations
- Classified Intelligence Reports & Informer Debriefs

**NETRA** solves this cognitive overload by performing probabilistic entity resolution, generating an interactive knowledge graph, uncovering hidden multi-hop criminal connection paths, and surfacing court-defensible AI investigation directives.

---

## 🔍 The Investigation: OPERATION NEXUS

### Three Apparently Unrelated Incidents in Mumbai:
1. **Incident 1 (Bandra Jewellery Heist - FIR No. 412/2024)**: Armed robbery of ₹4.2 Cr diamond vault at Hill Road, Bandra. Accused: **Tariq Shaikh ("Guddu Bandra")**.
2. **Incident 2 (Hawala & Bullion Layering - EOW Case 89/2024)**: ₹12 Cr illicit financial laundering through front firm *Dave Bullion* and shell company *Apex Marine Exports*. Accused: **Karan Dave ("KD Bullion")**.
3. **Incident 3 (Maritime Contraband Depot - DRI IR-772)**: Export container tampering operation in Shed 4B, Bhiwandi, preparing maritime contraband for Jebel Ali. Accused: **Vikram Solanki ("Vicky Bhiwandi")**.

### The Discovered Hidden Linchpin:
* **Raza Khan** (Alias *"Raja"*, *"RK"*, *"R. Khan"*, *"Farhan Bhai"* / Phone `+91 98201 44892` / Scorpio `MH-01-EA-4920`).
* Raza Khan orchestrated the entire supply chain: commissioned the Bandra heist for diamond collateral, layered proceeds through Karan Dave's shell company, and routed export logistics through Vikram Solanki's logistics yard.

$$\text{Tariq Shaikh} \xrightarrow{\text{CDR-101}} \text{Burner SIM 4892} \xrightarrow{\text{ER Match 96.4\%}} \text{Raza Khan} \xrightarrow{\text{TX-401}} \text{Apex Marine} \xrightarrow{\text{TX-402}} \text{Vikram Solanki}$$

---

## 🚀 Key Modules & Capabilities

1. **Challenge Briefing (`/challenge`)**:
   - Poses the core investigative challenge to judges with 4 fragmented evidence cards and cognitive overload demonstration.
2. **Case Command Center (`/command`)**:
   - Executive threat dashboard with live operational metrics, multi-agency fusion indicators, and incident dossiers.
3. **Evidence Explorer & AI Entity Extractor (`/evidence`)**:
   - Multi-source faceted search across FIRs, CDRs, Hawala, Locations, Vehicles, and Intel memos with live entity extraction highlighting.
4. **Interactive Criminal Network Graph (`/network`)**:
   - Physics-driven link analysis canvas (`vis-network`) with custom node styling, threat filtering, and the **FIND HIDDEN CONNECTION** discovery engine with animated path traversal.
5. **Entity Resolution Studio (`/resolution`)**:
   - Probabilistic alias disambiguation resolving *"Raza Khan"*, *"R. Khan"*, *"RK"*, *"Raja"*, and *"Farhan Bhai"* with **96.4% confidence**.
   - Interactive live match calculator and canonical entity merge action.
6. **Temporal Investigation Timeline (`/timeline`)**:
   - Chronological event river with phase filters (**T-72h Recon**, **Crime Day Strike**, and **Laundering & Transit**).
7. **Actionable AI Investigation Leads (`/leads`)**:
   - 3 operational directives with verified evidence chains and Special Court Warrant Application generator (MCOCA / PMLA).
8. **Court-Ready Case Dossier (`/dossier`)**:
   - Official printable report with targets table, chain of custody, and officer sign-off blocks.
9. **Guided SIH Presentation Pitch Controller**:
   - Bottom presentation control bar with 9 sequential pitch moments, speaker cues, and automatic graph triggers.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Graph Visualization**: Vis-Network / Vis-Data
- **Icons & UI**: Lucide-React, Custom Tactical Intelligence CSS Design System
- **Effects & Analytics**: Canvas-Confetti, Graph Dijkstra/BFS Path Traversal, Levenshtein/Jaro-Winkler Distance Engine

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ParthMahadik33/Crime-IQ.git

# Navigate to project directory
cd Crime-IQ

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Build for Production
```bash
npm run build
```

---

## 📄 License
This project is developed for educational and hackathon demonstration purposes under the Smart India Hackathon (SIH).
