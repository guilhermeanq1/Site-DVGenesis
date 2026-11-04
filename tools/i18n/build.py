from pathlib import Path
import re, html, json, sys
from urllib.parse import urlencode
ROOT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[2]
DATA=Path(__file__).resolve().parent
WORDS=json.loads((DATA/'translations.json').read_text(encoding='utf-8'))
DYNAMIC=json.loads((DATA/'dynamic.json').read_text(encoding='utf-8'))
TOKEN=re.compile(r'<!--.*?-->|<script\b[^>]*>.*?</script\s*>|<style\b[^>]*>.*?</style\s*>|<![^>]*>|<[^>]+>|[^<]+',re.S|re.I)
ATTR=re.compile(r'\b(aria-label|alt|title|placeholder)\s*=\s*([\"\x27])(.*?)\2',re.S|re.I)
LANGS={'pt':('pt-BR','Português'),'en':('en','English'),'es':('es','Español')}
def norm(s):return re.sub(r'\s+',' ',html.unescape(s)).strip()
def tr(s,lang):
 key=norm(s)
 if not key or not re.search(r'[A-Za-zÀ-ÿ]',key):return s
 if key not in WORDS:raise ValueError('Missing translation: '+key)
 return WORDS[key][0 if lang=='en' else 1]
def url(page,lang):return 'https://dvgenesis.com/'+('' if lang=='pt' else lang+'/')+('' if page=='index.html' else page)
def rel(page,current,target):return ('../' if current!='pt' else '')+('' if target=='pt' else target+'/')+page
def script_translate(code,lang):
 idx=1 if lang=='en' else 2
 lookup={row[0]:row[idx] for row in DYNAMIC}
 # Translate whole string literals first, including HTML entities in article data.
 literals=[]
 def literal(m):
  try:v=json.loads(m.group())
  except ValueError:v=m.group()
  key=html.unescape(v)
  value=json.dumps(lookup[key],ensure_ascii=False) if key in lookup else m.group()
  index=len(literals);literals.append(value)
  return '@@I18NLITERAL'+str(index)+'@@'
 code=re.sub(r'"(?:\\.|[^"\\])*"',literal,code)
 # Template markup and multiline paragraphs are not individual string literals.
 for source,en,es in sorted(DYNAMIC,key=lambda r:-len(r[0])):
  target=en if lang=='en' else es
  if source==target:continue
  pattern=r'(?<![\wÀ-ÿ])'+r'\s+'.join(re.escape(x) for x in source.split())+r'(?![\wÀ-ÿ])'
  code=re.sub(pattern,lambda _:target,code)
 code=re.sub(r'@@I18NLITERAL(\d+)@@',lambda m:literals[int(m.group(1))],code)
 code=code.replace('"assets/','"../assets/').replace("'assets/","'../assets/")
 return code
def strip_generated(doc):return re.sub(r'\s*<!-- i18n:[\w-]+ -->.*?<!-- /i18n:[\w-]+ -->','',doc,flags=re.S)
def render(source,page,lang):
 source=strip_generated(source)
 if lang!='pt':
  def token(m):
   t=m.group()
   if t.lower().startswith('<script'):return script_translate(t,lang)
   if t.startswith('<'):
    if t.startswith(('<!--','<!')) or t.lower().startswith('<style'):return t
    t=ATTR.sub(lambda a:a.group(1)+'='+a.group(2)+html.escape(tr(a.group(3),lang),quote=True)+a.group(2),t)
    if re.match(r'<meta\b',t,re.I) and re.search(r'name=[\"\x27]description[\"\x27]',t,re.I):
     t=re.sub(r'(content\s*=\s*)([\"\x27])(.*?)\2',lambda a:a.group(1)+a.group(2)+html.escape(tr(a.group(3),lang),quote=True)+a.group(2),t,flags=re.S|re.I)
    return t
   if not norm(t):return t
   return re.match(r'^\s*',t).group()+html.escape(tr(t,lang),quote=False)+re.search(r'\s*$',t).group()
  source=TOKEN.sub(token,source)
  source=source.replace('lang="pt-BR"','lang="'+LANGS[lang][0]+'"',1)
  def resource(m):
   pre,q,v=m.group(1),m.group(2),m.group(3)
   if v.startswith('assets/') or (re.match(r'[^/:]+\.css(?:\?|$)',v)):
    v='../'+v
   return pre+q+v+q
  source=re.sub(r'(\b(?:href|src|poster)\s*=\s*)([\"\x27])(.*?)\2',resource,source,flags=re.S)
  source=source.replace('data-suffix=" mil"','data-suffix="K"' if lang=='en' else 'data-suffix=" mil"')
  if lang=='en':source=source.replace('+200K','+200K')
  template=WORDS[norm('Olá, equipe DVGenesis. Gostaria de falar com vocês sobre uma possível iniciativa. Nome: Cargo: Empresa: Telefone/WhatsApp: Área de interesse: Descrição do desafio ou objetivo: Prazo ou urgência: Obrigado(a).')][0 if lang=='en' else 1]
  subject='Website inquiry | DVGenesis' if lang=='en' else 'Consulta desde la web | DVGenesis'
  def mail(m):
   if 'body=' in m.group():return 'href="mailto:contato@dvgenesis.com?'+html.escape(urlencode({'subject':subject,'body':template}),quote=True)+'"'
   partnership='Partnership with DVGenesis' if lang=='en' else 'Alianza con DVGenesis'
   return 'href="mailto:contato@dvgenesis.com?'+urlencode({'subject':partnership})+'"'
  source=re.sub(r'href="mailto:contato@dvgenesis\.com\?[^\"]*"',mail,source)
 # All three static pages link to each other and have an individual canonical.
 head='\n    <!-- i18n:head -->\n    <link rel="canonical" href="'+url(page,lang)+'" />\n'
 for key,(tag,label) in LANGS.items():head+='    <link rel="alternate" hreflang="'+tag+'" href="'+url(page,key)+'" />\n'
 head+='    <link rel="alternate" hreflang="x-default" href="'+url(page,'pt')+'" />\n'
 prefix='' if lang=='pt' else '../'
 head+='    <link rel="stylesheet" href="'+prefix+'language-switch.css?v=20261104" />\n    <script src="'+prefix+'language-switch.js?v=20261104" defer></script>\n    <!-- /i18n:head -->\n'
 source=re.sub(r'\s*</head>',lambda _:head+'  </head>',source,count=1)
 label={'pt':'Idioma do site','en':'Website language','es':'Idioma del sitio'}[lang]
 switch='\n        <!-- i18n:switch -->\n        <label class="language-switch"><span class="sr-only">'+label+'</span>\n          <select data-language-switch aria-label="'+label+'">\n'
 for key,(tag,name) in LANGS.items():switch+='            <option lang="'+tag+'" value="'+rel(page,lang,key)+'"'+(' selected' if key==lang else '')+'>'+name+'</option>\n'
 switch+='          </select>\n        </label>\n        <!-- /i18n:switch -->'
 source=source.replace('<div class="header-actions">','<div class="header-actions">'+switch,1)
 contact={'pt':'Fale conosco','en':'Contact us','es':'Contacto'}[lang]
 source=source.replace('</nav>','\n        <!-- i18n:mobile-contact --><a class="language-mobile-contact" href="fale-conosco.html">'+contact+'</a><!-- /i18n:mobile-contact -->\n      </nav>',1)
 links='\n        <!-- i18n:footer -->\n        <nav class="footer-languages" aria-label="'+label+'">'
 for key,(tag,name) in LANGS.items():links+='<a data-language-link lang="'+tag+'" hreflang="'+tag+'" href="'+rel(page,lang,key)+'"'+(' aria-current="true"' if key==lang else '')+'>'+name+'</a>'
 links+='</nav>\n        <!-- /i18n:footer -->'
 source=source.replace('</footer>',links+'\n    </footer>',1)
 return source
pages=sorted(ROOT.glob('*.html'))
assert len(pages)>=11, f'Expected at least 11 public pages, found {len(pages)}'
for lang in LANGS:
 dest=ROOT if lang=='pt' else ROOT/lang
 dest.mkdir(exist_ok=True)
 for f in pages:(dest/f.name).write_text(render(f.read_text(encoding='utf-8'),f.name,lang),encoding='utf-8')
 if lang!='pt':(dest/'script.js').write_text(script_translate((ROOT/'script.js').read_text(encoding='utf-8'),lang),encoding='utf-8')
items=[]
for lang in LANGS:
 for page in pages:
  alts=''.join('<xhtml:link rel="alternate" hreflang="'+LANGS[k][0]+'" href="'+html.escape(url(page.name,k),quote=True)+'" />' for k in LANGS)
  items.append('<url><loc>'+url(page.name,lang)+'</loc>'+alts+'</url>')
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+'\n'.join(items)+'\n</urlset>\n',encoding='utf-8')
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nDisallow: /tools/\nSitemap: https://dvgenesis.com/sitemap.xml\n',encoding='utf-8')
print('Built',len(pages)*3,'static pages in Portuguese, English and Spanish.')
