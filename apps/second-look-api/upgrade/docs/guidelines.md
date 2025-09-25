## Upgrade Second Look Credit Policy And Underwriting Guidelines

## Introduction  
**Redefining what's possible in private credit**

Delos Marketplace opens the door to exclusive direct lending opportunities for investors. With advanced analytics and seamless execution, we redefine what's possible in private credit.

## Overview  
Delos’ Second Look Program with Upgrade evaluates a rejected Upgrade application for an unsecured personal loan. Through this ‘second look’, Delos applies its own proprietary credit risk model to identify overlooked, but creditworthy borrowers with attractive risk-adjusted returns.

## Underwriting  
The underwriting of Delos’ Second Look Program consists of knock-outs, a credit risk model (CRM), and a price engine.

### Data Sources  
Two primary data sources are utilized:  

- **Application information** (e.g., debt-to-income ratio, stated income).  
- **Credit bureau information** (e.g., age of oldest trade line, months since most recent delinquency, number of credit inquiries).  

The models employ a subset of these variables to facilitate automated underwriting.

---

## Knock-Outs  
Knock-outs are automatic declines applied to applications. Regardless of CRM or pricing engine, applicants that meet these criteria are declined.

| **Criteria** | **Knock-Out Definition** |
|--------------|---------------------------|
| General Credit Worthiness | fico9 < 660 |
| Aggressive Credit Seeking | at104s ≥ 20 |
| Thin File | at01s < 2 (or missing) |
| Thin File | at02s < 1 (or missing) |
| Young File | at20s < 36 |
| Capacity To Repay | preloandti > 0.40 |
| Bankruptcy | (s207s ≥ 0 & s207s ≤ 3) OR (s207a ≥ 0 & s207a ≤ 3) |
| Recent Derogatory | g095s ≥ 0 AND g095s ≤ 3 |
| Aggressive Credit Seeking | s114s > 4 |
| Current Delinquency | s_at36 = 0 |
| Non-Medical Collections | c_cxmd >= 3 and cv05 = 0 |

---

## Credit Risk Model (CRM)  
The CRM is an application screening model developed on Upgrade’s through-the-door population. It predicts probability of good using FICO’s Analytic Work Bench.

**Key benefits:**  
- Rigorous inference capabilities  
- Ability to capture non-linear risk patterns  
- Interpretable, explainable models  

The CRM uses a 30-points-doubles-the-odds convention, scaled so a score of 1000 corresponds to odds of 5.32 to 1. Loss forecasts are calibrated with awareness that rank-ordering can drift over time.

---

## Pricing Engine / Risk-Based Pricing  
Delos’ price engine implements risk-based pricing, assigning rates based on CRM, loan amount, and loan term. Higher-scoring applicants receive lower rates.  

Pricing grids are documented in **Appendix 2**.

---

## Credit Policy  
Delos’ underwriting guidelines and credit policy aim to maintain a resilient, sustainable portfolio.

---

## Program Description  
**Loan products offered:**  
- Fixed-rate, fully amortizing, simple-interest consumer unsecured installment loans  
- Term: **36 months**  
- Loan amounts: **$1,000 – $15,000**  

**Rates & Fees:**  
- APRs up to **35.97%**  
- Origination fees up to **9.99%**  
- Late fee: **$10**  
- Payment failure fee: **$10**

---

## Steps in Second Look Processing  
1. Customer applies on Upgrade site.  
2. Upgrade performs soft credit pull at TransUnion.  
3. If eligible, Upgrade sends app info + attributes to Delos API.  
4. Delos returns custom scores.  
5. Upgrade re-evaluates with Delos scores.  
6. Upgrade sends final offers to Delos API.  
7. Delos determines purchase eligibility.  
8. Delos returns decision via API.  
9. If declined → Upgrade shows decline + adverse action notice.  
10. If approved → Upgrade displays offers.  
11. Customer selects an offer.  
12. Customer provides employment and verification info.  
13. Customer agrees to disclosures.  
14. Customer submits bank account details.  
15. Application reviewed by Upgrade credit verification.  
16. Upgrade sends updated info + offer to Delos API.  
17. Delos makes final purchase decision.  
18. If funded → Loan allocated to Delos investor account (purchased 2 days after funding).  

---

## Credit Monitoring  
Delos employs front-end and back-end monitoring:

- **Population Stability Reports** – Detect if population scores differently vs baseline.  
- **Characteristic Analysis Reports** – Detect where inputs differ vs baseline.  
- **Delinquency Distribution Reports (DDRs)** – Assess rank-ordering of risk.  
- **Vintage Curves** – Track performance by vintage (Loss, Prepay, IRR, etc.).
