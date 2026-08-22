#!/usr/bin/env python3
"""Fetch real public-domain / US-government images via the Wikimedia Commons API, with retries.
Emits assets/img/media.js (window.PM_MEDIA registry) so the site only references confirmed images.
"""
import os, json, urllib.request, urllib.parse, urllib.error, subprocess, time

OUT = os.path.join(os.path.dirname(__file__), "img")
os.makedirs(OUT, exist_ok=True)
UA = "PentagonMindResearch/1.0 (https://example.org; educational)"

TOPICS = [
    ("B-2 Spirit", "b2-spirit"),
    ("F-22 Raptor", "f22-raptor"),
    ("F-35 Lightning II", "f35-lightning"),
    ("F-15E Strike Eagle", "f15e-strikeeagle"),
    ("F-16 Fighting Falcon", "f16-falcon"),
    ("B-52 Stratofortress", "b52-stratofortress"),
    ("B-1 Lancer bomber", "b1b-lancer"),
    ("C-17 Globemaster III", "c17-globemaster"),
    ("Lockheed U-2 spy plane", "u2-spyplane"),
    ("General Atomics MQ-9 Reaper", "mq9-reaper"),
    ("Northrop Grumman RQ-4 Global Hawk", "rq4-globalhawk"),
    ("USS Nimitz aircraft carrier", "uss-nimitz"),
    ("USS Gerald R. Ford aircraft carrier", "uss-ford"),
    ("USS Ronald Reagan aircraft carrier", "uss-reagan"),
    ("USS Zumwalt destroyer", "uss-zumwalt"),
    ("USS Virginia submarine", "uss-virginia"),
    ("USS Ohio submarine", ",uss-ohio"),
    ("M1 Abrams tank", "m1-abrams"),
    ("M2 Bradley fighting vehicle", "m2-bradley"),
    ("M109 howitzer", "m109-howitzer"),
    ("M142 HIMARS", "m142-himars"),
    ("M777 howitzer", "m777-howitzer"),
    ("MIM-104 Patriot missile", "patriot"),
    ("BGM-109 Tomahawk cruise missile", "tomahawk"),
    ("LGM-30 Minuteman III missile", "minuteman3"),
    ("UGM-133 Trident II missile", "trident2"),
    ("GPS satellite NAVSTAR", "gps-satellite"),
    ("ARPANET logical map 1977", "arpanet-map"),
    ("Defense Advanced Research Projects Agency logo", "darpa-logo"),
    ("George H. W. Bush official portrait", "bush41"),
    ("Bill Clinton presidential portrait", "clinton"),
    ("George W. Bush official portrait", "bush43"),
    ("Barack Obama official portrait", "obama"),
    ("Donald Trump official portrait", "trump"),
    ("Joe Biden official portrait", "biden"),
    ("James Mattis", "mattis"),
    ("Mark Milley", "milley"),
    ("Colin Powell", "powell"),
    ("Norman Schwarzkopf", "schwarzkopf"),
    ("David Petraeus", "petraeus"),
    ("Lloyd Austin", "austin"),
    ("The Pentagon aerial", "pentagon-aerial"),
    ("Seal of the United States Department of Defense", "seal-dod"),
    ("Seal of the United States Space Force", "seal-ussf"),
    ("Joint Chiefs of Staff seal", "seal-jcs"),
    ("Emblem of the United States Cyber Command", "seal-cyber"),
    ("Flag of the United States Space Force", "flag-ussf"),
    ("NATO flag", "flag-nato"),
    ("Operation Overlord Normandy 1944", "normandy-1944"),
    ("Korean War US soldiers", "korea-war"),
    ("Vietnam War US troops", "vietnam-war"),
    ("Operation Desert Storm tanks", "desert-storm"),
    ("Iraq War 2003 US troops", "iraq-war"),
    ("Coalition forces Afghanistan", "afghanistan-war"),
    ("Russian invasion of Ukraine 2022", "ukraine-war"),
    ("Taiwan Strait", "taiwan-strait"),
    ("South China Sea", "south-china-sea"),
    ("Cold War Europe map", "coldwar-map"),
    ("World map Miller projection", "world-map"),
]

def api(params):
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read().decode("utf-8"))

def validate(path):
    try:
        out = subprocess.run(["file", path], capture_output=True, text=True).stdout
    except Exception:
        return False
    return ("JPEG image" in out) or ("PNG image" in out) or ("SVG" in out)

def download_with_retry(url, dest, tries=4):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                blob = r.read()
            if len(blob) < 3500:
                last = "too small (%d)" % len(blob)
                time.sleep(0.5)
                continue
            with open(dest, "wb") as f:
                f.write(blob)
            if validate(dest):
                return True
            os.remove(dest)
            last = "invalid image"
        except Exception as e:
            last = str(e)
        time.sleep(0.6 * (i + 1))
    return False

def fetch_one(query, slug):
    try:
        data = api({
            "action": "query", "format": "json", "generator": "search",
            "gsrsearch": query, "gsrnamespace": "6", "gsrlimit": "8",
            "prop": "imageinfo", "iiprop": "url|mime|size", "iiurlwidth": "1000",
        })
    except Exception:
        return None
    pages = list(data.get("query", {}).get("pages", {}).values())
    pages.sort(key=lambda p: p.get("index", 999))
    cands = []
    for p in pages:
        ii = p.get("imageinfo")
        if not ii:
            continue
        info = ii[0]
        mime = info.get("mime", "")
        width = info.get("width", 0)
        height = info.get("height", 0)
        if mime in ("image/jpeg", "image/png"):
            if width < 360 or height < 240:
                continue
            url = info.get("thumburl") or info.get("url")
        elif mime == "image/svg+xml":
            url = info.get("url")
        else:
            continue
        cands.append((url, mime, p.get("title", "")))
    for url, mime, title in cands:
        ext = ".svg" if mime == "image/svg+xml" else ".jpg"
        dest = os.path.join(OUT, slug + ext)
        if download_with_retry(url, dest):
            return slug + ext
        # Fallback: Special:FilePath with width
        fp = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(title.split(":", 1)[-1])
        if download_with_retry(fp + "?width=1000", dest):
            return slug + ext
    return None

MEDIA = {}
META = {}
done = 0
for query, slug in TOPICS:
    slug = slug.lstrip(",")  # guard against typo
    got = fetch_one(query, slug)
    if got:
        MEDIA[slug] = "assets/img/" + got
        META[slug] = query
        print("[OK]   %s" % slug)
    else:
        print("[FAIL] %s  <- %s" % (slug, query))
    done += 1
    time.sleep(0.25)

with open(os.path.join(OUT, "media.js"), "w", encoding="utf-8") as f:
    f.write("// Auto-generated by download_images.py — verified media registry.\n")
    f.write("window.PM_MEDIA = " + json.dumps(MEDIA, ensure_ascii=False, indent=2) + ";\n")
    f.write("window.PM_MEDIA_META = " + json.dumps(META, ensure_ascii=False, indent=2) + ";\n")

print("\nCONFIRMED %d / %d topics" % (len(MEDIA), len(TOPICS)))
