import json
import os
import re
import boto3
from botocore.exceptions import ClientError

_MAX_LENGTHS = {"name": 100, "email": 254, "message": 2000}

# Cualquier intento de inyectar código: HTML, JS, SQL, shell, plantillas, etc.
_INJECTION_RE = re.compile(
    r"""
    <[^>]*>                     # etiquetas HTML / XML
    | javascript\s*:            # URLs javascript:
    | on\w+\s*=                 # manejadores on* inline (onclick=, onerror=…)
    | <\s*script               # etiquetas <script
    | <\s*/\s*script            # etiquetas </script
    | (?:--|;|\/\*|\*\/)        # comentarios y terminadores SQL
    | (?:'\s*(?:or|and)\s*')    # SQL injection básico: ' or ', ' and '
    | \b(?:select|insert|update|delete|drop|union|exec|execute|cast|convert|declare)\b  # palabras clave SQL
    | [`$]\(                    # interpolación de shell $(...) y backtick
    | \|\||&&|[|;&]             # operadores de shell
    | \$\{.*?\}                 # template strings JS/shell
    | \{\{.*?\}\}               # plantillas Jinja2 / Angular
    | <%.*?%>                   # plantillas JSP / ERB
    | <\?(?:php)?               # apertura PHP
    | \b(?:eval|exec|system|passthru|popen|proc_open|shell_exec|assert)\s*\(  # funciones peligrosas
    """,
    re.IGNORECASE | re.VERBOSE,
)

ses = boto3.client("ses", region_name=os.environ["AWS_SES_REGION"])

RECIPIENT = os.environ["CONTACT_EMAIL"]
SENDER    = os.environ["SENDER_EMAIL"]

CORS_HEADERS = {
    "Access-Control-Allow-Origin":  os.environ.get("ALLOWED_ORIGIN", "*"),
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
}


def handler(event, _context):
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name    = body.get("name", "").strip()
        email   = body.get("email", "").strip()
        message = body.get("message", "").strip()

        if not all([name, email, message]):
            return _response(400, {"error": "Faltan campos obligatorios."})

        validation_error = _validate(name, email, message)
        if validation_error:
            return _response(400, {"error": validation_error})

        _send_email(name, email, message)

        return _response(200, {"message": "Mensaje enviado correctamente."})

    except ClientError as e:
        print(f"SES error: {e.response['Error']['Message']}")
        return _response(502, {"error": "No se pudo enviar el mensaje. Inténtalo de nuevo."})

    except Exception as e:
        print(f"Unexpected error: {e}")
        return _response(500, {"error": "Error interno del servidor."})


def _validate(name: str, email: str, message: str) -> str | None:
    fields = {"name": name, "email": email, "message": message}

    for field, value in fields.items():
        if len(value) > _MAX_LENGTHS[field]:
            return f"El campo '{field}' supera la longitud máxima permitida."
        if _INJECTION_RE.search(value):
            return "El contenido enviado contiene caracteres o patrones no permitidos."

    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return "El formato del email no es válido."

    return None


def _send_email(name: str, email: str, message: str) -> None:
    ses.send_email(
        Source=SENDER,
        Destination={"ToAddresses": [RECIPIENT]},
        Message={
            "Subject": {
                "Data": f"[Portfolio] Mensaje de {name}",
                "Charset": "UTF-8",
            },
            "Body": {
                "Text": {
                    "Data": (
                        f"Nombre:  {name}\n"
                        f"Email:   {email}\n\n"
                        f"Mensaje:\n{message}"
                    ),
                    "Charset": "UTF-8",
                },
                "Html": {
                    "Data": f"""
                    <html><body style="font-family:sans-serif;color:#023E8A;">
                      <h2 style="color:#0077B6;">Nuevo mensaje desde tu portfolio</h2>
                      <p><strong>Nombre:</strong> {name}</p>
                      <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                      <hr style="border-color:#90E0EF;"/>
                      <p style="white-space:pre-wrap;">{message}</p>
                    </body></html>
                    """,
                    "Charset": "UTF-8",
                },
            },
        },
        ReplyToAddresses=[email],
    )


def _response(status: int, body: dict) -> dict:
    return {
        "statusCode": status,
        "headers": CORS_HEADERS,
        "body": json.dumps(body, ensure_ascii=False),
    }
