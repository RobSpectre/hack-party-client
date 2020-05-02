import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from twilio.rest import Client
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant


# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('what the shit?')


@app.route('/token', methods=['POST'])
def token():
    content = request.get_json() or request.form

    app.logger.info(request.form)

    identity = content.get('identity', None)

    if identity:
        return generateToken(identity)
    else:
        return "Identity required", 400


def generateToken(identity):
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    api_key = os.environ['TWILIO_API_KEY']
    api_secret = os.environ['TWILIO_API_SECRET']
    sync_service_sid = os.environ.get('TWILIO_SYNC_SERVICE_SID')

    token = AccessToken(account_sid,
                        api_key,
                        api_secret,
                        identity=identity)

    sync_grant = SyncGrant(service_sid=sync_service_sid)
    token.add_grant(sync_grant)

    token.add_grant(sync_grant)

    return jsonify(identity=identity,
                   token=token.to_jwt().decode('utf-8'))


def provision_sync_service():
    client = Client(os.environ['TWILIO_API_KEY'], os.environ['TWILIO_API_SECRET'], os.environ['TWILIO_ACCOUNT_SID'])
    client.sync.services(os.environ.get('TWILIO_SYNC_SERVICE_SID')).fetch()


if __name__ == '__main__':
    provision_sync_service()
    app.run()
