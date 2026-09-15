import json
import os
import re
import secrets
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

import psycopg2

STEAM_OPENID = 'https://steamcommunity.com/openid/login'

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _fetch_profile(steam_id: str) -> dict:
    url = f'https://steamcommunity.com/profiles/{steam_id}?xml=1'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=4) as resp:
        raw = resp.read().decode('utf-8', 'ignore')
    nick = re.search(r'<steamID><!\[CDATA\[(.*?)\]\]></steamID>', raw)
    avatar = re.search(r'<avatarMedium><!\[CDATA\[(.*?)\]\]></avatarMedium>', raw)
    return {
        'nickname': nick.group(1) if nick else f'Player {steam_id[-4:]}',
        'avatar': avatar.group(1) if avatar else '',
    }


def _escape(value: str) -> str:
    return str(value).replace("'", "''")


def handler(event: dict, context) -> dict:
    """Вход на сайт через Steam: выдаёт ссылку на авторизацию, проверяет ответ Steam и возвращает профиль пользователя."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'me')

    if action == 'login':
        return_to = params.get('return_to', '')
        callback = params.get('callback', '')
        realm = return_to.split('/')[0] + '//' + return_to.split('/')[2] if '://' in return_to else return_to
        query = urllib.parse.urlencode({
            'openid.ns': 'http://specs.openid.net/auth/2.0',
            'openid.mode': 'checkid_setup',
            'openid.return_to': callback,
            'openid.realm': realm,
            'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
            'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
        })
        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'url': f'{STEAM_OPENID}?{query}'}),
        }

    if action == 'callback':
        verify = {k: v for k, v in params.items() if k.startswith('openid.')}
        verify['openid.mode'] = 'check_authentication'
        data = urllib.parse.urlencode(verify).encode()
        req = urllib.request.Request(STEAM_OPENID, data=data, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            body = resp.read().decode()
        if 'is_valid:true' not in body:
            return {'statusCode': 401, 'headers': {**CORS, 'Content-Type': 'application/json'},
                    'isBase64Encoded': False, 'body': json.dumps({'error': 'invalid'})}

        claimed = params.get('openid.claimed_id', '')
        match = re.search(r'/id/(\d+)$', claimed) or re.search(r'(\d{17})$', claimed)
        if not match:
            return {'statusCode': 400, 'headers': {**CORS, 'Content-Type': 'application/json'},
                    'isBase64Encoded': False, 'body': json.dumps({'error': 'no steam id'})}
        steam_id = match.group(1)

        profile = _fetch_profile(steam_id)
        token = secrets.token_hex(24)
        expires = (datetime.utcnow() + timedelta(days=30)).strftime('%Y-%m-%d %H:%M:%S')

        conn = _db()
        cur = conn.cursor()
        cur.execute(
            f"""INSERT INTO users (steam_id, nickname, avatar, profile_url)
                VALUES ('{_escape(steam_id)}', '{_escape(profile['nickname'])}', '{_escape(profile['avatar'])}',
                        'https://steamcommunity.com/profiles/{_escape(steam_id)}')
                ON CONFLICT (steam_id) DO UPDATE SET nickname = EXCLUDED.nickname, avatar = EXCLUDED.avatar
                RETURNING id, nickname, avatar, profile_url"""
        )
        row = cur.fetchone()
        cur.execute(
            f"INSERT INTO sessions (token, user_id, expires_at) VALUES ('{token}', {row[0]}, '{expires}')"
        )
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'token': token,
                'user': {'id': row[0], 'nickname': row[1], 'avatar': row[2], 'profileUrl': row[3]},
            }),
        }

    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''
    if not token or not re.fullmatch(r'[a-f0-9]{48}', token):
        return {'statusCode': 200, 'headers': {**CORS, 'Content-Type': 'application/json'},
                'isBase64Encoded': False, 'body': json.dumps({'user': None})}

    conn = _db()
    cur = conn.cursor()
    cur.execute(
        f"""SELECT u.id, u.nickname, u.avatar, u.profile_url FROM sessions s
            JOIN users u ON u.id = s.user_id
            WHERE s.token = '{token}' AND s.expires_at > NOW()"""
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    user = None
    if row:
        user = {'id': row[0], 'nickname': row[1], 'avatar': row[2], 'profileUrl': row[3]}
    return {'statusCode': 200, 'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False, 'body': json.dumps({'user': user})}
