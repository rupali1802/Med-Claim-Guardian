app = open(r'D:\TEAM_HEIST\rcm_dashboard\src\App.js', encoding='utf-8').read()
sb  = open(r'D:\TEAM_HEIST\rcm_dashboard\src\components\Sidebar.js', encoding='utf-8').read()
cf  = open(r'D:\TEAM_HEIST\rcm_dashboard\src\components\ClaimForm.js', encoding='utf-8').read()
ca  = open(r'D:\TEAM_HEIST\rcm_dashboard\src\components\ChatAssistant.js', encoding='utf-8').read()
api = open(r'D:\TEAM_HEIST\claim_denial_api.py', encoding='utf-8').read()

checks = [
    # App.js
    ('App       | Sidebar import + sidebarCollapsed state',   'import Sidebar' in app and 'sidebarCollapsed' in app),
    ('App       | Header: hamburger toggle button',           'hdr-icon-btn' in app and 'setSidebarCollapsed' in app),
    ('App       | Header: notification bell',                 'Notifications' in app),
    ('App       | Header: user profile pill',                 'hdr-profile-btn' in app and 'Team HEIST' in app),
    ('App       | Header: page icon in PAGE_META',            'icon: (' in app),
    ('App       | Reset clears prediction + error',           'setPrediction(null)' in app and 'setError(null)' in app),
    ('App       | PredictionResult has key prop',             'key={JSON.stringify(prediction)}' in app),
    ('App       | Clean empty state (no magic-8-ball emoji)', '\U0001f52e' not in app),
    ('App       | Chat overlay zIndex 99999',                 'zIndex: 99999' in app),
    ('App       | Chat rendered AFTER footer in DOM',         app.rfind('ChatAssistant') > app.find('<footer')),
    # Sidebar.js
    ('Sidebar   | SVG NAV_ICONS for all 6 tabs',              'NAV_ICONS' in sb and 'predict' in sb and 'chat' in sb),
    ('Sidebar   | Collapsible (collapsed + onToggle props)',  'onToggle' in sb and 'collapsed' in sb),
    ('Sidebar   | Sliding active rail',                       'mcg-rail' in sb),
    ('Sidebar   | Scan-line sweep animation',                 'mcgScanline' in sb),
    ('Sidebar   | Spinning orb ring',                         'mcgOrbRing' in sb),
    ('Sidebar   | Icon wrapper with glow',                    'mcg-icon-wrap' in sb),
    ('Sidebar   | Collapsed tooltip',                         'mcg-tip' in sb),
    ('Sidebar   | Pulsing status dots',                       'mcg-pulse' in sb),
    ('Sidebar   | Version / GlitchCon badge',                 'GlitchCon' in sb),
    # ClaimForm.js
    ('ClaimForm | onReset callback wired',                    'if (onReset) onReset()' in cf),
    ('ClaimForm | Reset button present',                      'resetForm' in cf and 'Reset' in cf),
    # ChatAssistant.js
    ('Chat      | 19-topic KB knowledge base',                'const KB' in ca),
    ('Chat      | sendMessage function',                      'sendMessage' in ca),
    ('Chat      | inputRef for autofocus',                    'inputRef' in ca),
    # API
    ('API       | Graceful unseen-data fallback',             'known_classes[0]' in api),
]

passed = sum(1 for _, v in checks if v)
total  = len(checks)
print(f'\n  Results: {passed}/{total} checks passed\n')
for label, ok in checks:
    status = 'OK  ' if ok else 'FAIL'
    print(f'  [{status}] {label}')
print()
