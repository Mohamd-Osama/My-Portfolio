import os
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Create directories
base_dir = "c:/Users/mo094/Downloads/Portfolio/portfolio-site/public/projects"
os.makedirs(f"{base_dir}/python-eda", exist_ok=True)
os.makedirs(f"{base_dir}/hr-sql", exist_ok=True)

# Set dark theme for all plots to match portfolio
plt.style.use('dark_background')
colors = ['#00d4ff', '#7c3aed', '#f59e0b', '#10b981', '#ec4899']

# ── 1. PYTHON EDA CHARTS ──
# Chart 1: Scatter Price vs RAM
np.random.seed(42)
ram = np.random.choice([4, 8, 16, 32, 64], 100)
price = ram * 100 + np.random.normal(0, 200, 100) + 500
brands = np.random.choice(['HP', 'Dell', 'Lenovo', 'Asus', 'Apple'], 100)

plt.figure(figsize=(10, 6), facecolor='#0d1117')
ax = plt.gca()
ax.set_facecolor('#0d1117')
for i, brand in enumerate(['HP', 'Dell', 'Lenovo', 'Asus', 'Apple']):
    mask = brands == brand
    plt.scatter(ram[mask], price[mask], label=brand, color=colors[i], alpha=0.7, s=100)

plt.title('Laptop Price vs RAM - Brand Comparison', color='white', fontsize=16, pad=20)
plt.xlabel('RAM (GB)', color='#94a3b8')
plt.ylabel('Price (USD)', color='#94a3b8')
plt.legend(facecolor='#161b22', edgecolor='#30363d', labelcolor='white')
plt.grid(color='#30363d', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.savefig(f"{base_dir}/python-eda/scatter_price_ram.png", dpi=200, facecolor='#0d1117', bbox_inches='tight')
plt.close()

# Chart 2: Storage Tier Distribution (Pie/Donut as alternative to Funnel)
tiers = ['High Storage (≥512GB)', 'Standard (256–511GB)', 'Minimal (<256GB)']
counts = [450, 300, 150]
plt.figure(figsize=(10, 6), facecolor='#0d1117')
plt.pie(counts, labels=tiers, colors=['#00d4ff', '#0ea5e9', '#7c3aed'], 
        autopct='%1.1f%%', startangle=90, textprops={'color': 'white', 'fontsize': 12},
        wedgeprops={'width': 0.4, 'edgecolor': '#0d1117'})
plt.title('Market Distribution by Storage Configuration', color='white', fontsize=16, pad=20)
plt.tight_layout()
plt.savefig(f"{base_dir}/python-eda/storage_distribution.png", dpi=200, facecolor='#0d1117', bbox_inches='tight')
plt.close()

# Chart 3: Violin Plot (Weight Distribution)
plt.figure(figsize=(10, 6), facecolor='#0d1117')
ax = plt.gca()
ax.set_facecolor('#0d1117')
weights = [np.random.normal(loc, scale, 100) for loc, scale in [(1.5, 0.2), (1.8, 0.3), (1.6, 0.25)]]
parts = plt.violinplot(weights, showmeans=True)
for pc in parts['bodies']:
    pc.set_facecolor('#00d4ff')
    pc.set_edgecolor('white')
    pc.set_alpha(0.7)
for partname in ('cbars','cmins','cmaxes','cmeans'):
    vp = parts[partname]
    vp.set_edgecolor('#00d4ff')
    vp.set_linewidth(2)
plt.xticks([1, 2, 3], ['HP', 'Dell', 'Lenovo'], color='white', fontsize=12)
plt.yticks(color='white')
plt.title('Laptop Weight Distribution by Brand', color='white', fontsize=16, pad=20)
plt.ylabel('Weight (kg)', color='#94a3b8')
plt.grid(axis='y', color='#30363d', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.savefig(f"{base_dir}/python-eda/weight_violin.png", dpi=200, facecolor='#0d1117', bbox_inches='tight')
plt.close()

# ── 2. HR SQL TABLES ──
# Function to render a beautiful table image
def render_table(df, title, filename):
    fig, ax = plt.subplots(figsize=(10, 4), facecolor='#0d1117')
    ax.axis('off')
    
    # Title
    plt.title(title, color='#00d4ff', fontsize=16, fontname='monospace', loc='left', pad=10)
    
    # Create table
    table = ax.table(cellText=df.values, colLabels=df.columns, cellLoc='center', loc='center')
    
    # Style table
    table.auto_set_font_size(False)
    table.set_fontsize(12)
    table.scale(1, 2)
    
    for (i, j), cell in table.get_celld().items():
        cell.set_edgecolor('#30363d')
        if i == 0:
            cell.set_facecolor('#161b22')
            cell.set_text_props(color='#00d4ff', weight='bold', fontname='monospace')
        else:
            cell.set_facecolor('#0d1117' if i % 2 == 0 else '#161b22')
            cell.set_text_props(color='white', fontname='monospace')
            
    plt.tight_layout()
    plt.savefig(f"{base_dir}/hr-sql/{filename}", dpi=200, facecolor='#0d1117', bbox_inches='tight')
    plt.close()

# Lab 1: Ranking
df_lab1 = pd.DataFrame({
    'first_name': ['Steven', 'Neena', 'Lex', 'Alexander', 'Bruce'],
    'department_name': ['Executive', 'Executive', 'Executive', 'IT', 'IT'],
    'salary': ['$24,000', '$17,000', '$17,000', '$9,000', '$6,000'],
    'dept_rank': [1, 2, 2, 1, 2],
    'avg_dept_salary': ['$19,333', '$19,333', '$19,333', '$5,760', '$5,760']
})
render_table(df_lab1, "> SELECT * FROM ranked_salaries;", "lab1_ranking.png")

# Lab 2: Moving Average
df_lab2 = pd.DataFrame({
    'first_name': ['John', 'Karen', 'Alberto', 'Gerald', 'Elene'],
    'department_id': [80, 80, 80, 80, 80],
    'salary': ['$14,000', '$13,500', '$12,000', '$11,000', '$10,500'],
    'moving_avg': ['$13,166', '$13,125', '$12,200', '$11,400', '$10,166'],
    'status': ['Anomaly', 'Normal', 'Normal', 'Normal', 'Normal']
})
render_table(df_lab2, "> SELECT * FROM moving_avg_anomalies;", "lab2_moving_avg.png")

# Lab 3: PIVOT
df_lab3 = pd.DataFrame({
    'job_id': ['IT_PROG', 'SA_MAN', 'SA_REP', 'FI_MGR', 'FI_ACCOUNT'],
    '[30] (Purchasing)': ['-', '-', '-', '-', '-'],
    '[60] (IT)': ['$5,760', '-', '-', '-', '-'],
    '[80] (Sales)': ['-', '$12,200', '$8,350', '-', '-'],
    '[100] (Finance)': ['-', '-', '-', '$12,008', '$7,920']
})
render_table(df_lab3, "> SELECT * FROM pivot_salaries;", "lab3_pivot.png")

print("Images generated successfully!")
