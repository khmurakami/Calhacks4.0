#!/usr/bin/python

# this source is part of my Hackster.io project:  https://www.hackster.io/mariocannistra/radio-astronomy-with-rtl-sdr-raspberrypi-and-amazon-aws-iot-45b617

# use this program to test the AWS IoT certificates received by the author
# to participate to the spectrogram sharing initiative on AWS cloud

# this program will subscribe and show all the messages sent by its companion
# awsiotpub.py using the AWS IoT hub
from flyt_python import api
import paho.mqtt.client as mqtt
import os
import socket
import ssl
import time
import sys
import json

awshost = "a339gkvoin5ven.iot.us-east-1.amazonaws.com"
awsport = 8883
clientId = "tejaspi"
THING_NAME = "CC3200_Teja"
caPath = "rootCA.pem"
certPath = "2a6b436ac1-certificate.pem.crt"
keyPath = "2a6b436ac1-private.pem.key"

SHADOW_UPDATE_TOPIC = "$aws/things/" + THING_NAME + "/shadow/update"
SHADOW_UPDATE_ACCEPTED_TOPIC = "$aws/things/" + THING_NAME + "/shadow/update/accepted"
SHADOW_UPDATE_REJECTED_TOPIC = "$aws/things/" + THING_NAME + "/shadow/update/rejected"
SHADOW_UPDATE_DELTA_TOPIC = "$aws/things/" + THING_NAME + "/shadow/update/delta"
SHADOW_GET_TOPIC = "$aws/things/" + THING_NAME + "/shadow/get"
SHADOW_GET_ACCEPTED_TOPIC = "$aws/things/" + THING_NAME + "/shadow/get/accepted"
SHADOW_GET_REJECTED_TOPIC = "$aws/things/" + THING_NAME + "/shadow/get/rejected"
SHADOW_STATE_DOC_LED_ON = """{"state" : {"reported" : {"LED" : "ON"}}}"""
SHADOW_STATE_DOC_LED_OFF = """{"state" : {"reported" : {"LED" : "OFF"}}}"""
drone = api.navigation(timeout=120000) # instance of flyt navigation class
time.sleep(3)
mqttc = mqtt.Client("client2")


def velChange(Shadow_State_Doc, Type):
	vel =""
	SHADOW_State_Doc = json.loads(Shadow_State_Doc)
	if Type == "DELTA":
		vel = SHADOW_State_Doc['state']['position']
	elif Type == "GET_REQ":
		vel = SHADOW_State_Doc['state']['desired']['position']

	if vel == "forward":
		drone.velocity_set(1, 0, 0, body_frame=False)
		print "FORWARD"
	elif vel == "backward":
		drone.velocity_set(-1, 0, 0, body_frame=False)
		print "BACKWARD"
	elif vel == "left":
		drone.velocity_set(0, -1, 0, body_frame=False)
		print "LEFT"
	elif vel == "right":
		drone.velocity_set(0, 1, 0, body_frame=False)
		print "RIGHT"
	elif vel == "idle":
		drone.position_hold()
		print "IDLE"

def on_connect(mosq, obj, rc):
	print "Connection returned result: " + str(rc) 
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    # Subscribe to Delta Topic
	mqttc.subscribe(SHADOW_UPDATE_DELTA_TOPIC, 1)
	# Subscribe to Get Accepted and Rejected Topics
	mqttc.subscribe(SHADOW_GET_ACCEPTED_TOPIC, 1)
	mqttc.subscribe(SHADOW_GET_REJECTED_TOPIC, 1)

def on_message(mosq, obj, msg):
	if str(msg.topic) == SHADOW_UPDATE_DELTA_TOPIC:
		SHADOW_STATE_DELTA = str(msg.payload)
		velChange(SHADOW_STATE_DELTA, "DELTA")
	elif str(msg.topic) == SHADOW_GET_ACCEPTED_TOPIC:
		SHADOW_STATE_DOC = str(msg.payload)
		velChange(SHADOW_STATE_DOC, "GET_REQ")
	elif str(msg.topic) == SHADOW_GET_REJECTED_TOPIC:
		SHADOW_GET_ERROR = str(msg.payload)
		print "\nERROR: " + SHADOW_GET_ERROR

def on_subscribe(mosq, obj, mid, granted_qos):
	if mid == 2:
		mqttc.publish(SHADOW_GET_TOPIC,"",qos=1)

def on_disconnect(client, userdata, rc):
	if rc != 0:
		print "Disconnected from AWS IoT. Trying to reconnect...."


    

#def on_log(client, userdata, level, msg):
#    print(msg.topic+" "+str(msg.payload))


mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe
mqttc.on_disconnect = on_disconnect
#mqttc.on_log = on_log



mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)

mqttc.connect(awshost, awsport, keepalive=60)


mqttc.loop_forever()
