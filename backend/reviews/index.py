import json
import os
import re

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _escape(value: str) -> str:
    return str(value).replace("'", "''")


def _json(status: int, payload: dict) -> dict:
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False, 'body': json.dumps(payload, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    """Отзывы о сайтах: показывает оценки пользователей и принимает новый отзыв от авторизованного через Steam."""
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    conn = _db()
    cur = conn.cursor()

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        site_id = params.get('site_id', '')
        if site_id:
            cur.execute(
                f"""SELECT r.id, r.rating, r.text, r.created_at, u.nickname, u.avatar
                    FROM reviews r JOIN users u ON u.id = r.user_id
                    WHERE r.site_id = '{_escape(site_id)}' ORDER BY r.created_at DESC LIMIT 50"""
            )
            items = [{'id': r[0], 'rating': r[1], 'text': r[2], 'createdAt': r[3].isoformat(),
                      'nickname': r[4], 'avatar': r[5]} for r in cur.fetchall()]
            cur.close()
            conn.close()
            return _json(200, {'reviews': items})

        cur.execute('SELECT site_id, ROUND(AVG(rating)::numeric, 2), COUNT(*) FROM reviews GROUP BY site_id')
        stats = {r[0]: {'rating': float(r[1]), 'count': int(r[2])} for r in cur.fetchall()}
        cur.close()
        conn.close()
        return _json(200, {'stats': stats})

    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''
    if not re.fullmatch(r'[a-f0-9]{48}', token or ''):
        cur.close()
        conn.close()
        return _json(401, {'error': 'Нужен вход через Steam'})

    cur.execute(f"SELECT user_id FROM sessions WHERE token = '{token}' AND expires_at > NOW()")
    row = cur.fetchone()
    if not row:
        cur.close()
        conn.close()
        return _json(401, {'error': 'Сессия истекла'})
    user_id = row[0]

    body = json.loads(event.get('body') or '{}')
    site_id = str(body.get('siteId', ''))[:64]
    rating = int(body.get('rating', 0))
    text = str(body.get('text', ''))[:1000]

    if not site_id or rating < 1 or rating > 5:
        cur.close()
        conn.close()
        return _json(400, {'error': 'Поставьте оценку от 1 до 5'})

    cur.execute(
        f"""INSERT INTO reviews (site_id, user_id, rating, text)
            VALUES ('{_escape(site_id)}', {user_id}, {rating}, '{_escape(text)}')
            ON CONFLICT (site_id, user_id)
            DO UPDATE SET rating = EXCLUDED.rating, text = EXCLUDED.text, created_at = NOW()
            RETURNING id"""
    )
    review_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return _json(200, {'id': review_id, 'ok': True})
