export interface ProjectCodeLab {
  label: string;
  language: 'sql' | 'python';
  code: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  role: string;
  techStack: string[];
  highlights: string[];
  images: ProjectImage[];
  coverImage: string;
  accentColor: string;
  /** Single code snippet (for backward compat) */
  codeSnippet?: {
    language: 'sql' | 'python';
    label: string;
    code: string;
  };
  /** Multiple code labs with tabs */
  codeLabs?: ProjectCodeLab[];
}

export const projects: Project[] = [
  {
    id: '02',
    slug: 'real-estate-market-analysis',
    title: 'Real Estate Market Analysis',
    subtitle: 'End-to-End SQL & Power BI Solution',
    category: 'SQL · Power BI',
    role: 'Core Data Analyst — ETL, Schema Design & Advanced Analytics',
    overview:
      'Collaborated within a 5-member cross-functional team to develop a comprehensive data analytics solution for the real estate market. The project focused on tracking property sales performance, real estate agent efficiency, and complex market transactions.',
    techStack: ['SQL Server', 'Advanced Schema Design', 'ETL Pipelines', 'Power BI', 'Relational Data Modeling'],
    highlights: [
      'Designed and implemented the core SQL database schema for real estate properties, agents, and clients',
      'Built and managed robust ETL pipelines to process massive volumes of property transactions',
      'Conducted deep-dive analysis using advanced SQL techniques, uncovering market trends and revenue drivers',
      'Established the structured data foundation enabling the broader team to build actionable dashboards',
    ],
    images: [
      { src: '/projects/real-estate/Dahboard Overview.png', alt: 'Dashboard Overview' },
      { src: '/projects/real-estate/Agents Performance.png', alt: 'Agents Performance' },
      { src: '/projects/real-estate/Sales Performance.png', alt: 'Sales Performance' },
      { src: '/projects/real-estate/Leads Performance.png', alt: 'Leads Performance' },
      { src: '/projects/real-estate/Marketing.png', alt: 'Marketing Analytics' },
      { src: '/projects/real-estate/Properties.png', alt: 'Properties Analysis' },
      { src: '/projects/real-estate/Schema.png', alt: 'Database Schema' },
    ],
    coverImage: '/projects/real-estate/Dahboard Overview.png',
    accentColor: '#00d4ff',
    codeLabs: [
      {
        label: 'Real Estate Analysis Queries',
        language: 'sql',
        code: `-------------------------------Sales Performance (Agents, Transactions)-----------------------------------------------

--1.How does performance change over time?
select 
Month([Sale Date]) as Monthes,
Year([Sale Date]) as Years,
sum([Sale Price]) as Total_Price
from Transactions
group by Month([Sale Date]),Year([Sale Date])
order by Total_Price desc

--2.What is Total Commission Amount and Total Transactions by Each Agent?
select A.[Agent ID],A.[Agent Name],
count(T.[Agent ID]) as Total_Transactions,
sum([Commission Amount]) as Total_Commission_Amount
from Agents A
left join Transactions T on A.[Agent ID]=T.[Agent ID]
group by A.[Agent ID],A.[Agent Name]
order by Total_Commission_Amount desc

--3.How many agents are assigned to each office, and what is the combined annual salary?
select
[Agent Name],
[Annual Salary],
[Office City],
[Office Name],
[Experience Years],
count(*) over(partition by [Office City],[Office Name])  as Total_Agents,
sum([Annual Salary]) over(partition by [Office City], [Office Name]) AS Office_Total_Payroll
from Agents
order by Office_Total_Payroll desc 

--4.What is the monthly breakdown of sold compounds and total commission earned by each agent?
select 
Distinct A.[Agent ID],
A.[Agent Name],
A.[Office City],
MONTH(T.[Sale Date]) as Month_Sale,
YEAR(T.[Sale Date])as Year_Sale,
sum(T.[Commission Amount])over (partition by A.[Agent ID],YEAR(T.[Sale Date]), MONTH(T.[Sale Date]))as Total_Commission_Amount,
count(P.Compound)over(partition by A.[Agent ID],YEAR(T.[Sale Date]), MONTH(T.[Sale Date])) as Total_Compounds
from Agents A
join Transactions T on A.[Agent ID]=T.[Agent ID]
join Properties P on T.[Property ID]=P.[Property ID]

--5.What is the monthly Net Profit and Performance Rank for each office
select 
A.[Office Name],
T.[Governorate Name],
month(T.[Sale Date]) as Month_Sale,
year(T.[Sale Date]) as Year_Sale,
sum(T.[Sale Price])-sum(T.[Original Property Price])-sum(T.[Commission Amount])-sum(P.[Renovation Cost])as Net_Profit,
DENSE_RANK()over(order by (sum(T.[Sale Price])-sum(T.[Original Property Price])-sum(T.[Commission Amount])-sum(P.[Renovation Cost])) desc)
as Profit_Rank
from Agents A
join Transactions T on A.[Agent ID]=T.[Agent ID]
join Properties P on T.[Property ID]=P.[Property ID]
group by A.[Office Name],T.[Governorate Name], month(T.[Sale Date]),year(T.[Sale Date])
order by Year_Sale,Month_Sale



---6.Who are the top-priority uncontacted leads ranked by their budget potential
select
[Lead Name],
Phone,Email,
[Lead Source],
([Max Budget]+[Min Budget])/2 as Average_Target_Budget ,
PERCENT_RANK()over(order by ([Max Budget]+[Min Budget])/2 )*100 as Per_Rank,
NTILE(10)over(order by ([Max Budget]+[Min Budget])/2 desc) as quantile
from Leads
where [Lead Status]='New' and [Numbers of Calls] =0
order by Per_Rank desc

--7.What is Comparative Cumulative Profit Growth by Governorate and Property Type in each Month
select P.[Property Type],
T.[Governorate Name],
Month(T.[Sale Date]) as Month_Sale,
Year(T.[Sale Date]) as Year_Sale,
sum(T.[Sale Price])-sum(T.[Original Property Price])-sum(T.[Commission Amount])-sum(P.[Renovation Cost])as Net_Profit,
sum(sum(T.[Sale Price])-sum(T.[Original Property Price])-sum(T.[Commission Amount])-sum(P.[Renovation Cost]))
over( partition by T.[Governorate Name],P.[Property Type] order by Year(T.[Sale Date]),Month(T.[Sale Date])
RoWS Between Unbounded Preceding and Current Row) as Running_Net_Profit
from Transactions T 
join Properties P on T.[Property ID]=P.[Property ID]
group by T.[Governorate Name],P.[Property Type],Month(T.[Sale Date]),Year(T.[Sale Date]);


--8.Who are New Leads and Properties Recommendations to them 
with 
Property as(
select [Agent ID],Governerate,City,Compound,Area,[Property Type],[Selling Price]
from Properties
where [Availability Status]='Available')

, New_Leads as(
select L.[Lead ID],L.[Agent ID],L.[Lead Name],L.Phone,L.Email,([Max Budget]+[Min Budget])/2  as Average_Budget
from Leads L
where L.[Lead Status]='New' and L.[Numbers of Calls]=0)

select distinct
Property.Governerate, 
Property.City,
Property.Compound,
Property.Area,
Property.[Property Type],
New_Leads.[Agent ID],
New_Leads.[Lead ID],
New_Leads.[Lead Name],
New_Leads.Phone,
New_Leads.Email,
Property.[Selling Price],
New_Leads.Average_Budget
from Property, New_Leads
where New_Leads.Average_Budget>=Property.[Selling Price] and New_Leads.[Agent ID]=Property.[Agent ID]

---------

--9.What is our Year-over-Year (YoY)  Net Profit after accounting for all operational and marketing expenditures
with Marketing
as( select Year([End Date]) as Market_Year,
sum(Budget) as Total_Budget
from [Marketing Campaigns] M
group by Year([End Date]) 

),
Trans 
as( 
select Year(T.[Sale Date]) as Sale_Year,
sum(T.[Sale Price])-(sum(T.[Commission Amount])+sum(T.[Original Property Price])+sum(P.[Renovation Cost])) as Profit
from Transactions T
join Properties P on T.[Property ID]=P.[Property ID]
group by Year(T.[Sale Date])

)
select
Trans.Sale_Year,
Marketing.Total_Budget,
Trans.Profit,
Trans.Profit-Marketing.Total_Budget as Net_Profit
from Marketing,Trans
where Trans.Profit>=Marketing.Total_Budget
and Trans.Sale_Year=Marketing.Market_Year`
      }
    ]
  },
  {
    id: '03',
    slug: 'supply-chain-analysis',
    title: 'Supply Chain & Sales Performance',
    subtitle: 'ETL Pipelines, Star Schema & Interactive Dashboards',
    category: 'SQL · SSIS · Power BI',
    role: 'Data Analyst',
    overview:
      'Designed an end-to-end data analytics solution using the Wide World Importers dataset. Built robust ETL pipelines to process raw warehouse data and developed interactive Power BI dashboards delivering actionable insights into sales, inventory, and supplier management.',
    techStack: ['SQL Server', 'SSIS', 'Power BI', 'DAX', 'Star Schema', 'Data Cleaning', 'Feature Engineering'],
    highlights: [
      'Engineered automated ETL pipelines using SQL Server and SSIS to build an optimized star schema model',
      'Built dashboards analyzing Customer Behavior, Stock Performance, Salesperson Efficiency, and Overtime Trends',
      'Uncovered critical business risks including a severe profit drop in 2016 and supplier over-concentration',
      'Provided data-driven solutions to optimize product portfolio and diversify the supplier base',
    ],
    images: [
      { src: '/projects/supply-chain/Dashboard Overview.png', alt: 'Dashboard Overview' },
      { src: '/projects/supply-chain/Customer & Sales Analysis.png', alt: 'Customer & Sales' },
      { src: '/projects/supply-chain/Market & Trend Analysis.png', alt: 'Market Trends' },
      { src: '/projects/supply-chain/SalesPerson Performance.png', alt: 'Salesperson Performance' },
      { src: '/projects/supply-chain/Supplier Performance.png', alt: 'Supplier Performance' },
      { src: '/projects/supply-chain/Products & Stock Performance.png', alt: 'Products & Stock' },
      { src: '/projects/supply-chain/Piplines.png', alt: 'Main ETL Pipelines' },
      { src: '/projects/supply-chain/Stock Item Pipeline.png', alt: 'Stock Item Pipeline' },
      { src: '/projects/supply-chain/Customer Behavior Pipeline .png', alt: 'Customer Behavior Pipeline' },
      { src: '/projects/supply-chain/ETL Query 1.png', alt: 'ETL Query 1' },
      { src: '/projects/supply-chain/ETL Query 2.png', alt: 'ETL Query 2' },
      { src: '/projects/supply-chain/Supply Chain Data Model.png', alt: 'Data Model' },
    ],
    coverImage: '/projects/supply-chain/Dashboard Overview.png',
    accentColor: '#7c3aed',
  },
  {
    id: '04',
    slug: 'teba-university-mss',
    title: 'Teba University MSS Dashboard',
    subtitle: 'Executive BI Dashboard for Management Decision Support',
    category: 'Power BI · DAX',
    role: 'Data Analyst / BI Developer',
    overview:
      'Developed advanced Business Intelligence dashboards using MS Power BI to transform complex raw Excel data into interactive visualizations, establishing a data-driven foundation for executive decision-making. This includes the core Teba MSS dashboard as well as the Afaq performance dashboard.',
    techStack: ['Power BI', 'DAX', 'Power Query', 'Microsoft Excel', 'Data Modeling'],
    highlights: [
      'Engineered a seamless pipeline from Excel through Power Query to advanced DAX analytical measures',
      'Identified Egypt (0.16M units) and Syria as top export destinations; China as primary supplier (139K units)',
      'Pinpointed "Home Appliances" as top-performing category (0.35M units)',
      'Afaq Integration: Developed additional dashboards tracking regional performance (Istanbul vs Coffee data)',
    ],
    images: [
      { src: '/projects/teba/Overview.png', alt: 'Dashboard Overview' },
      { src: '/projects/teba/KSA Exports.png', alt: 'KSA Exports' },
      { src: '/projects/teba/Oman & KSA.png', alt: 'Oman & KSA' },
      { src: '/projects/teba/Managements Insights.png', alt: 'Management Insights' },
      { src: '/projects/teba/afaq/Overview.png', alt: 'Afaq Project Overview' },
      { src: '/projects/teba/afaq/comparison.png', alt: 'Afaq Comparison Metrics' },
      { src: '/projects/teba/afaq/representative.png', alt: 'Afaq Representatives' },
      { src: '/projects/teba/afaq/Istanbul.png', alt: 'Afaq Istanbul Stats' },
      { src: '/projects/teba/afaq/Coffee.png', alt: 'Afaq Coffee Distribution' },
    ],
    coverImage: '/projects/teba/Overview.png',
    accentColor: '#f59e0b',
  },
  {
    id: '05',
    slug: 'hr-analysis-advanced-sql',
    title: 'HR Analytics with Advanced SQL',
    subtitle: 'Window Functions, CTEs, Pivoting & Time-Series Analysis',
    category: 'SQL · Advanced Analytics',
    role: 'Data Analyst',
    overview:
      'Executed a comprehensive HR data analytics project utilizing advanced SQL techniques to solve complex business problems. Analysis covered employee performance, salary structures, retention trends, and departmental resource allocation — all written and tested across 3 progressive lab exercises.',
    techStack: ['SQL Server', 'Window Functions', 'CTEs', 'PIVOT', 'LAG/LEAD', 'PERCENT_RANK', 'NTILE', 'NTH_VALUE', 'FIRST/LAST_VALUE'],
    highlights: [
      'Identified top 25% earners using PERCENT_RANK for a targeted bonus program',
      'Detected salary anomalies against departmental trends using Moving Averages and LAG/LEAD',
      'Tiered departments into size categories using NTILE for resource allocation optimization',
      'Built dynamic PIVOT reports displaying employee salary structures across roles and departments',
    ],
    images: [],
    coverImage: '',
    accentColor: '#10b981',
    codeLabs: [
      {
        label: 'Ranking & Comparison',
        language: 'sql',
        code: `-- ══════════════════════════════════════════════════════════════
-- LAB 1 — Window Functions: Ranking, Comparison & Career Gaps
-- ══════════════════════════════════════════════════════════════

-- Use Case 1: Department Salary Overview (AVG, COUNT, MAX per dept)
SELECT
    e.first_name,    e.last_name,
    d.department_name,
    j.job_title,     e.salary,
    AVG(e.salary)   OVER (PARTITION BY e.department_id) AS avg_salary,
    COUNT(*)        OVER (PARTITION BY e.department_id) AS employees_count,
    MAX(e.salary)   OVER (PARTITION BY e.department_id) AS maximum_salary
FROM departments d
JOIN employees e  ON e.department_id = d.department_id
JOIN jobs j       ON e.job_id        = j.job_id
ORDER BY d.department_id;

-- Use Case 2: Multi-level Ranking — RANK, DENSE_RANK, ROW_NUMBER
SELECT
    e.first_name, e.last_name, e.hire_date, e.salary,
    d.department_name,
    AVG(salary)  OVER (PARTITION BY e.department_id)                             AS avg_dept_salary,
    RANK()       OVER (ORDER BY e.salary DESC)                                   AS overall_rank,
    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC)      AS dept_rank,
    ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC)      AS row_num
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE e.department_id = department_id);

-- Use Case 3: Career Gap Analysis using LAG / LEAD + DATEDIFF
SELECT
    e.first_name, e.last_name,
    j.job_id,    j.department_id,
    j.start_date, j.end_date,
    LAG(j.end_date)    OVER (PARTITION BY j.employee_id ORDER BY j.start_date) AS prev_end_date,
    LEAD(j.start_date) OVER (PARTITION BY j.employee_id ORDER BY j.start_date) AS next_start_date,
    DATEDIFF(DAY,
        LAG(j.end_date) OVER (PARTITION BY j.employee_id ORDER BY j.start_date),
        j.start_date)                                                           AS gap_days
FROM employees e
JOIN job_history j ON e.employee_id = j.employee_id;`,
      },
      {
        label: 'Percentiles & Moving Avg',
        language: 'sql',
        code: `-- ══════════════════════════════════════════════════════════════
-- LAB 2 — PERCENT_RANK, NTILE, Moving Averages, Running Totals
-- ══════════════════════════════════════════════════════════════

-- Q1: Top 25% Earners Per Department (Bonus Program)
SELECT * FROM (
    SELECT *, PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS pct_rank
    FROM employees
) ranked WHERE pct_rank <= 0.25;

-- Q2: Bottom 30% Commission Earners (Targeted Coaching)
SELECT * FROM (
    SELECT first_name, last_name, manager_id, commission_pct,
           PERCENT_RANK() OVER (ORDER BY commission_pct) AS pct_rank
    FROM employees WHERE commission_pct IS NOT NULL
) sub WHERE pct_rank <= 0.30;

-- Q3: Employee Tenure Segmentation into 5 Tiers (NTILE)
SELECT *, COUNT(groups) OVER (PARTITION BY groups ORDER BY groups) AS group_count
FROM (
    SELECT *, NTILE(5) OVER (ORDER BY tenure) AS groups
    FROM (
        SELECT first_name, last_name, hire_date,
               DATEDIFF(YEAR, hire_date, GETDATE()) AS tenure
        FROM employees) t1
) t2;

-- Q4: Department Size Classification (Small/Medium/Large)
SELECT *, NTILE(3) OVER (ORDER BY total_employees) AS size_category
FROM (SELECT department_id, COUNT(*) AS total_employees FROM employees GROUP BY department_id) sub;

-- Q5: Cumulative Hiring Trend Per Department
SELECT first_name, last_name, hire_date, department_id,
       COUNT(*) OVER (PARTITION BY department_id ORDER BY hire_date
                      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_hires
FROM employees ORDER BY department_id;

-- Q6: Salary Comparison with Adjacent Peers (LAG/LEAD)
SELECT first_name, last_name, salary,
       LAG(salary)  OVER (ORDER BY last_name) AS prev_salary,
       LEAD(salary) OVER (ORDER BY last_name) AS next_salary,
       salary - LAG(salary) OVER (ORDER BY last_name) AS diff
FROM employees ORDER BY last_name;

-- Q7: Moving Average Anomaly Detection (±20% deviation)
SELECT * FROM (
    SELECT first_name, last_name, department_id, salary,
           AVG(salary) OVER (PARTITION BY department_id ORDER BY salary
                             ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) AS moving_avg
    FROM employees) sub
WHERE salary > moving_avg * 1.2 OR salary < moving_avg * 0.8;

-- Q8: Running Commission Total (Depts with ≥5 Sales Reps)
SELECT * FROM (
    SELECT first_name, last_name, department_id,
           commission_pct * salary AS total_commission,
           SUM(salary * commission_pct) OVER (PARTITION BY department_id ORDER BY hire_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_commission,
           COUNT(*) OVER (PARTITION BY department_id) AS dept_count
    FROM employees WHERE commission_pct IS NOT NULL) sub
WHERE dept_count >= 5 ORDER BY department_id;`,
      },
      {
        label: 'NTH_VALUE & PIVOT',
        language: 'sql',
        code: `-- ══════════════════════════════════════════════════════════════
-- LAB 3 — NTH_VALUE, FIRST/LAST_VALUE, PIVOT, CTEs
-- ══════════════════════════════════════════════════════════════

-- Q1: Employees Within $2,000 Salary Range (RANGE clause)
SELECT first_name, last_name, salary,
       COUNT(*) OVER (ORDER BY salary RANGE BETWEEN 2000 PRECEDING AND 2000 FOLLOWING) AS within_2000
FROM employees;

-- Q4: Min/Max Commission in Sales Dept (FIRST_VALUE / LAST_VALUE)
SELECT first_name, last_name, commission_pct, department_id,
       FIRST_VALUE(commission_pct) OVER (ORDER BY commission_pct
           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS min_commission,
       LAST_VALUE(commission_pct)  OVER (ORDER BY commission_pct
           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS max_commission
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE department_name = 'Sales');

-- Q7: 3rd Highest Salary Per Department (NTH_VALUE)
SELECT DISTINCT department_name,
       NTH_VALUE(salary, 3) OVER (PARTITION BY department_name ORDER BY salary DESC
           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS third_highest
FROM employees e JOIN departments d ON e.department_id = d.department_id;

-- Q10: PIVOT — Manager IDs × Department Employee Counts
SELECT manager_id, [10],[20],[30],[40],[50],[60],[70],[80],[90],[100],[110]
FROM (SELECT manager_id, department_id FROM employees) sub
PIVOT (COUNT(department_id) FOR department_id IN ([10],[20],[30],[40],[50],[60],[70],[80],[90],[100],[110])) p;

-- Q11: PIVOT — Job IDs × Average Salary Per Department
SELECT job_id, [10],[20],[30],[40],[50],[60],[70],[80],[90],[100],[110]
FROM (SELECT job_id, department_id, salary FROM employees) sub
PIVOT (AVG(salary) FOR department_id IN ([10],[20],[30],[40],[50],[60],[70],[80],[90],[100],[110])) p;

-- Q12: CTE — Employees Earning Above Department Average
WITH dept_avg AS (
    SELECT AVG(salary) AS avg_salary, department_id FROM employees GROUP BY department_id
)
SELECT e.first_name, e.last_name, e.salary, e.department_id, d.avg_salary
FROM employees e JOIN dept_avg d ON e.department_id = d.department_id
WHERE e.salary > d.avg_salary;

-- Q13: CTE — Jobs Where Avg Salary Exceeds Midpoint by 10%+
WITH job_avg AS (SELECT job_id, AVG(salary) AS job_avg_salary FROM employees GROUP BY job_id),
     midpoint AS (SELECT (min_salary + max_salary) / 2 AS midpoint_salary, job_id FROM jobs)
SELECT j.job_id, j.job_avg_salary
FROM job_avg j, midpoint m
WHERE j.job_avg_salary > (m.midpoint_salary * 1.10) AND j.job_id = m.job_id;`,
      },
    ],
  },
  {
    id: '06',
    slug: 'python-laptop-eda',
    title: 'Laptop Specs EDA & Visualizations',
    subtitle: 'End-to-End Python EDA with Plotly Interactive Charts',
    category: 'Python · EDA',
    role: 'Data Analyst / Python Developer',
    overview:
      'Conducted an end-to-end Exploratory Data Analysis (EDA) on a laptop specifications dataset using Python. The project focused on data wrangling and building highly interactive visual models to uncover hardware trends, pricing distributions, and brand positioning.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Plotly Express', 'Kaggle Hub API', 'Jupyter Notebook'],
    highlights: [
      'Streamlined raw dataset: handled missing values, duplicates, and redundant features',
      'Engineered dynamic charts: Scatter plots (Price vs RAM), Bar charts, Strip plots for brand comparisons',
      'Developed complex Treemaps for laptop volume and avg price analysis by company and screen size',
      'Visualized market distribution across storage configurations using Funnel Area charts',
    ],
    images: [
      { src: '/projects/python-eda/newplot.png', alt: 'Market Distribution Scatter Plot' },
      { src: '/projects/python-eda/Bar Chart.png', alt: 'Laptop Brands Analysis' },
      { src: '/projects/python-eda/treemap.png', alt: 'Market Volume Treemap' },
      { src: '/projects/python-eda/Violin.png', alt: 'Weight Distribution Violin Plot' },
      { src: '/projects/python-eda/strip.png', alt: 'Price Comparison Strip Plot' },
      { src: '/projects/python-eda/funnel area.png', alt: 'Storage Configuration Funnel' },
    ],
    coverImage: '/projects/python-eda/newplot.png',
    accentColor: '#3b82f6',
    codeLabs: [
      {
        label: 'Data Acquisition & Cleaning',
        language: 'python',
        code: `import pandas as pd
import numpy as np
import plotly.express as px
import kaggle_hub

# ── Step 1: Data Acquisition via Kaggle Hub ──────────────────────────
path = kaggle_hub.dataset_download("muhammetvarol/laptop-specifications-dataset")
df = pd.read_csv(f"{path}/laptops.csv")
print(f"Dataset: {df.shape[0]:,} rows × {df.shape[1]} columns")
print(df.dtypes)

# ── Step 2: Data Cleaning Pipeline ───────────────────────────────────
df.drop_duplicates(inplace=True)
df.dropna(subset=['Price', 'Ram', 'Company'], inplace=True)
df.drop(columns=['OpSys'], errors='ignore', inplace=True)  # Redundant

# Parse and normalize types
df['Ram']    = df['Ram'].str.replace('GB', '', regex=False).astype(int)
df['Price']  = df['Price'].astype(float)
df['Weight'] = df['Weight'].str.replace('kg', '', regex=False).astype(float)

# Storage Tier Classification
def classify_storage(row):
    total = (row.get('SSD', 0) or 0) + (row.get('HDD', 0) or 0)
    if total >= 512: return 'High Storage (≥512GB)'
    elif total >= 256: return 'Standard (256–511GB)'
    return 'Minimal (<256GB)'

df['StorageTier'] = df.apply(classify_storage, axis=1)
print(f"\\nCleaned: {df.shape[0]:,} rows | Brands: {df['Company'].nunique()}")
print(df['Company'].value_counts().head(10))`,
      },
      {
        label: 'Interactive Visualizations',
        language: 'python',
        code: `# ── Scatter Plot: Price vs RAM by Brand ──────────────────────────────
fig_scatter = px.scatter(
    df, x='Ram', y='Price', color='Company',
    size='Price', hover_name='Company',
    title='💻 Laptop Price vs RAM — Brand Comparison',
    template='plotly_dark',
    labels={'Ram': 'RAM (GB)', 'Price': 'Price (USD)'},
    opacity=0.85,
)
fig_scatter.update_layout(legend=dict(orientation='h', y=1.02))
fig_scatter.show()

# ── Treemap: Volume & Avg Price by Brand + Screen Size ───────────────
fig_tree = px.treemap(
    df, path=[px.Constant("All Brands"), 'Company', 'Inches'],
    values='Price', color='Price',
    color_continuous_scale='Blues',
    title='📊 Market Volume & Avg Price by Brand & Screen Size',
)
fig_tree.update_traces(textinfo='label+value+percent parent')
fig_tree.show()

# ── Violin: HP Weight Distribution ───────────────────────────────────
hp_df = df[df['Company'] == 'HP'].copy()
fig_violin = px.violin(
    hp_df, y='Weight', box=True, points='all',
    title='⚖️ HP Laptop Weight Distribution',
    template='plotly_dark', color_discrete_sequence=['#00d4ff'],
)
fig_violin.show()

# ── Funnel Area: Storage Tier Distribution ───────────────────────────
tier_counts = df['StorageTier'].value_counts().reset_index()
tier_counts.columns = ['tier', 'count']
fig_funnel = px.funnel_area(
    names=tier_counts['tier'], values=tier_counts['count'],
    title='🗄️ Market Distribution by Storage Configuration',
    color_discrete_sequence=['#00d4ff', '#0ea5e9', '#7c3aed'],
)
fig_funnel.show()

# ── Strip Plot: Cross-Brand Price Comparison ──────────────────────────
fig_strip = px.strip(
    df, x='Company', y='Price', color='Company',
    title='💰 Price Range Comparison Across Brands',
    template='plotly_dark',
)
fig_strip.update_layout(showlegend=False)
fig_strip.show()`,
      },
    ],
  },
  {
    id: '07',
    slug: 'clinic-management-system',
    title: 'Clinic Management System',
    subtitle: 'Full Automation with Excel VBA & Interactive UserForms',
    category: 'Excel · VBA',
    role: 'VBA Developer & Data Analyst',
    overview:
      'Developed a fully automated and robust Clinic Management System from scratch using advanced Excel VBA. The system streamlines daily healthcare operations, replacing manual paperwork with a digital, user-friendly interface.',
    techStack: ['Microsoft Excel', 'VBA', 'UserForms', 'Data Modeling', 'Automation', 'Macro Programming'],
    highlights: [
      'Automated patient registration, medical history tracking, and appointment management',
      'Built a dedicated lab module for recording and managing test results efficiently',
      'Implemented automated daily revenue tracking, expense management, and real-time financial reporting',
      'Designed highly responsive UserForms ensuring ease of use for non-technical medical staff',
    ],
    images: [
      { src: '/projects/clinic/Overview.png', alt: 'System Overview' },
      { src: '/projects/clinic/Doctor Sheet.png', alt: 'Doctor Sheet' },
      { src: '/projects/clinic/Doctors Register.png', alt: 'Doctors Register' },
      { src: '/projects/clinic/Fincancials.png', alt: 'Financials' },
      { src: '/projects/clinic/Dental.png', alt: 'Dental Module' },
      { src: '/projects/clinic/lab.png', alt: 'Lab Module' },
    ],
    coverImage: '/projects/clinic/Overview.png',
    accentColor: '#ec4899',
  },
  {
    id: '08',
    slug: 'road-accidents-analysis',
    title: 'Global Road Accident Analysis',
    subtitle: 'Safety Insights, Fatality Trends & Economic Impact',
    category: 'Power BI · Analytics',
    role: 'Data Analyst',
    overview:
      'Conducted an extensive global road accident analysis to identify key causes, fatality trends, and economic impacts. Evaluated driver demographics, weather conditions, emergency response times, and vehicle conditions to provide actionable safety recommendations.',
    techStack: ['Power BI', 'DAX', 'Statistical Analysis', 'Data Visualization', 'Data Validation'],
    highlights: [
      'Drunk driving identified as leading cause: 26,506 incidents; driver fatigue contributed ~50% of fatalities',
      'Mapped hotspots: Brazil, Germany, Australia lead injury rates; Canada leads in economic costs',
      'Wet/snow roads increase injury rates to 317K+; rainy conditions are the most dangerous weather hazard',
      'Young drivers (<18 & 18–25) most prone to cyclist-related accidents — informed targeted campaigns',
    ],
    images: [
      { src: '/projects/road-accidents/Overview.png', alt: 'Overview Dashboard' },
      { src: '/projects/road-accidents/Driver Analysis.png', alt: 'Driver Analysis' },
      { src: '/projects/road-accidents/Countries & Regions.png', alt: 'Countries & Regions' },
      { src: '/projects/road-accidents/Economic Loss Analysis.png', alt: 'Economic Loss' },
      { src: '/projects/road-accidents/Emergency Analysis.png', alt: 'Emergency Analysis' },
      { src: '/projects/road-accidents/Time Based Analysis.png', alt: 'Time-Based Analysis' },
      { src: '/projects/road-accidents/Weather & Street Analysis.png', alt: 'Weather Analysis' },
    ],
    coverImage: '/projects/road-accidents/Overview.png',
    accentColor: '#f97316',
  },
];
