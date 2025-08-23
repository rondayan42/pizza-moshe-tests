# Example Flask app to show how to use the separated HTML pages
# This is just for reference - you can modify as needed

from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Move your HTML files to a 'templates' folder
# Move your CSS, JS, and assets to a 'static' folder

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/delivery')
def delivery():
    return render_template('delivery.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'POST':
        # Handle form submission here
        # You can process the order data and save to database
        flash('Order submitted successfully!', 'success')
        return redirect(url_for('order'))
    
    return render_template('order.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)

# To use this:
# 1. Create a 'templates' folder and move all HTML files there
# 2. Create a 'static' folder and move CSS, JS, and assets there
# 3. Update HTML files to use url_for() for static assets
# 4. Run: python flask_example.py