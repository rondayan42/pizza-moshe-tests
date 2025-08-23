from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

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
        # Handle form submission
        name = request.form.get('name')
        phone = request.form.get('phone')
        address = request.form.get('address')
        delivery_type = request.form.get('delivery-type')
        payment = request.form.get('payment')
        pizza_type = request.form.get('pizza-type')
        notes = request.form.get('notes')
        
        # Here you would typically save to database or send to external service
        # For now, just show a success message
        flash('Order submitted successfully! We will contact you soon.', 'success')
        return redirect(url_for('order'))
    
    return render_template('order.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)