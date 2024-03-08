from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/reading')
def reading():
    return render_template('reading.html')

@app.route('/gym')
def gym():
    return render_template('gym.html')

if __name__ == '__main__':
    app.run(debug=True)