import connection_handler
import util


@connection_handler.connection_handler
def register_user(cursor, username, plain_text_password):
    password = util.hash_password(plain_text_password)
    cursor.execute('''INSERT INTO users (user_name, password) VALUES (%(user_name)s, %(hashed_password)s)''',
                   {'user_name': username, 'hashed_password': password})


@connection_handler.connection_handler
def check_existing_username(cursor, user_name):
    cursor.execute('''SELECT * FROM users WHERE user_name = %(user_name)s''', {'user_name': user_name})
    user_names = cursor.fetchone()
    return user_names


@connection_handler.connection_handler
def get_good_hash_by_user_name(cursor, user_name):
    cursor.execute('''SELECT password FROM users WHERE user_name = %(user_name)s''', {'user_name': user_name})
    password_hash = cursor.fetchall()[0]['password']
    return password_hash