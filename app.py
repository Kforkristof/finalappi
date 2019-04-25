from flask import Flask, render_template, request, redirect, session
import data_manager
import util

from flask import Flask


app = Flask(__name__)
app.secret_key = b'_noSc0p3420#AstfGL]/'


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        user_name = request.form['username']
        password = request.form['password']
        try:
            good_password_hash = data_manager.get_good_hash_by_user_name(user_name)
            if util.verify_password(password, good_password_hash):
                session['username'] = user_name
                return redirect('/')
            else:
                return 'invalid username or password'
        except IndexError:
            return "invalid username or password"


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')


@app.route('/register', methods=['GET', 'POST'])
def registration():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        user_name = request.form['username']
        password = request.form['password']
        sec_password = request.form['sec_password']
        if password == sec_password and not data_manager.check_existing_username(user_name):
            data_manager.register_user(user_name, password)
            return redirect('/')
        else:
            return '<h1>This username is already exists</h1>'


if __name__ == '__main__':
    app.run(debug=True)
