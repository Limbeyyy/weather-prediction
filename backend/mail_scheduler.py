import os
import smtplib
import ssl
from email.message import EmailMessage


def mail_sender(username, message, user_mail, source_mail):
    EMAIL_ADDRESS = os.environ.get('PYTHON_MAIL_TEST_MAIL')
    EMAIL_PASSWORD = os.environ.get('PYTHON_MAIL_TEST_PWD')

    msg = EmailMessage()
    msg['Subject'] = 'Python Mail Test'
    msg['From'] = source_mail
    msg['To'] = user_mail

    msg.set_content('Testing send mail features from python')

    msg.add_alternative(rf"""\
    <!DOCTYPE html>
    <html>
    <body>
        <h1 style="color:SlateGray;">Rainfall prediction system</h1>
        <p>
            Greeting {username}, the system has made following inference for todays weather:
            <br />
            {message}
        </p>
    </body>
    </html>
    """, subtype='html')


    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
