import urllib.request, urllib.parse, os
imgs='C:/Car-Membership-Club/car-membership-club/public/images'
os.makedirs(imgs, exist_ok=True)
headers={'User-Agent':'Mozilla/5.0'}

def dl(url,path):
    req=urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=40) as r:
        data=r.read()
    with open(path,'wb') as f:
        f.write(data)
    print('ok', os.path.basename(path), len(data))

files={
 'logo-maserati.svg':'https://commons.wikimedia.org/wiki/Special:FilePath/Maserati_logo_2.svg',
 'logo-porsche.svg':'https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_Wordmark_Logo_Black.svg',
 'logo-cadillac.svg':'https://commons.wikimedia.org/wiki/Special:FilePath/Cadillac_Wordmark.svg',
 'logo-bmw.svg':'https://commons.wikimedia.org/wiki/Special:FilePath/BMW.svg',
 'logo-alfa-romeo.svg':'https://commons.wikimedia.org/wiki/Special:FilePath/Alfa_logo.svg',
 'logo-mercedes.svg':'https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_logo_2.svg',
}
for name,url in files.items():
    try:
        dl(url, os.path.join(imgs,name))
    except Exception as e:
        print('fail', name, e)
