import os
import glob

css_files = glob.glob('src/**/*.css', recursive=True)

# Saffron Shift
replacements = {
    # Hex codes
    '#0ea5e9': '#f97316',
    '#38bdf8': '#fb923c',
    '#0284c7': '#ea580c',
    'rgba(56, 189, 248': 'rgba(251, 146, 60',
    '#3b82f6': '#f97316', # blue-500 -> orange-500
    '#60a5fa': '#fb923c', # blue-400 -> orange-400
    '#2563eb': '#ea580c', # blue-600 -> orange-600
    '#93c5fd': '#fdba74', # blue-300 -> orange-300
    '#1d4ed8': '#c2410c', # blue-700 -> orange-700
    '#1e3a8a': '#7c2d12', # blue-900 -> orange-900

    # RGBA values (blue 500)
    '59, 130, 246': '249, 115, 22',
    '56, 189, 248': '249, 115, 22',
    '14, 165, 233': '249, 115, 22',
    '56, 189, 248,': '249, 115, 22,',
    # RGBA values (blue 600)
    '37, 99, 235': '234, 88, 12',
    # RGBA values (blue 400)
    '96, 165, 250': '251, 146, 60',
    # RGBA values (blue 300)
    '147, 197, 253': '253, 186, 116',
    
    # Specific gradients
    'linear-gradient(to right, #60a5fa, #67e8f9)': 'linear-gradient(135deg, #fb923c, #ea580c)',
    'linear-gradient(135deg, #0ea5e9, #0284c7)': 'linear-gradient(135deg, #f97316, #ea580c)',
    'linear-gradient(to right, #0ea5e9, #0284c7)': 'linear-gradient(to right, #f97316, #ea580c)'
}

for file_path in css_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

print("Color shift complete.")
