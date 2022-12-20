from flask import Flask, render_template, request, redirect, url_for,jsonify
from werkzeug.utils import secure_filename
from jobsystem import main_res
# create a Flask instance
app = Flask(__name__)

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'doc','docx'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/recommendations', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['file']
        if file.filename == '':
            resp = jsonify({'message': 'No file selected for uploading'})
            resp.status_code = 400
            return resp
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(file.filename)
            fname, format = filename.split(".")
            output = main_res(fname)
            resp = jsonify(output)
            resp.status_code = 201
            return resp
        else:
            resp = jsonify({'message': 'Allowed file types are txt, pdf, doc,docx'})
            resp.status_code = 400
            return resp


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)

