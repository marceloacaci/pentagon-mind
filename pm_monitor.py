# pm_monitor.py — monitor PENTAGON-MIND (arquivos + commits git) como processo unico.
# SEM subprocess: detecta commits observando .git/logs/HEAD e .git/refs/heads.
# Roda via cron a cada 1 min (pm_launch.py faz o spawn desacoplado).
# Mutex nomeado + pidfile garantem EXATAMENTE 1 instancia.
import os, time, sys, ctypes, subprocess

ROOT = "C:/Users/Marcelo/Desktop/EUA"
GIT = os.path.join(ROOT, ".git")
LOG = os.path.join(ROOT, ".pm_watch.log")
PIDF = os.path.join(ROOT, ".pm_watch.pid")
EXCLUDE_DIRS = {".git", "node_modules", "__pycache__"}
SKIP = {".pm_watch.log", "pm_monitor.py", "pm_launch.py", ".pm_watch.pid"}

# Mutex nomeado: garante EXATAMENTE 1 instancia por sessao de usuario.
_kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
_mutex = _kernel32.CreateMutexW(None, True, "PENTAGON_MIND_WATCHER")
if _kernel32.GetLastError() == 183:  # ERROR_ALREADY_EXISTS
    sys.exit(0)

# 2a tranca (cross-interpreter): se o PID no pidfile ainda esta vivo, sai.
try:
    old = int(open(PIDF, encoding="utf-8").read().strip())
    if old != os.getpid():
        ps = f"Get-Process -Id {old} -ErrorAction SilentlyContinue | Select-Object -First 1 Id | Format-List"
        out = subprocess.check_output(["powershell", "-NoProfile", "-Command", ps],
                                      stderr=subprocess.DEVNULL).decode("utf-8", "ignore")
        if str(old) in out:
            sys.exit(0)
except Exception:
    pass

def log(msg):
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass

def get_state():
    state = {}
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in EXCLUDE_DIRS]
        for f in fn:
            if f in SKIP:
                continue
            p = os.path.join(dp, f)
            try:
                st = os.stat(p)
                state[p] = (st.st_mtime, st.st_size)
            except OSError:
                pass
    return state

def git_commit_state():
    """Retorna um identificador do estado de commits (hash do reflog HEAD)."""
    head_log = os.path.join(GIT, "logs", "HEAD")
    try:
        st = os.stat(head_log)
        return (st.st_mtime, st.st_size)
    except OSError:
        return None

def latest_commit_line():
    """Le a ultima linha do reflog HEAD para exibir o commit."""
    head_log = os.path.join(GIT, "logs", "HEAD")
    try:
        with open(head_log, "r", encoding="utf-8", errors="ignore") as f:
            lines = [l.strip() for l in f if l.strip()]
        if lines:
            return lines[-1]
    except Exception:
        pass
    return None

log("=== PENTAGON-MIND monitor INICIADO (tail -f .pm_watch.log) ===")
try:
    with open(PIDF, "w", encoding="utf-8") as f:
        f.write(str(os.getpid()))
except Exception:
    pass
prev = get_state()
prev_commit = git_commit_state()
log(f"HEAD inicial: arquivos monitorados: {len(prev)}")

while True:
    time.sleep(2)
    # git commit?
    cur_commit = git_commit_state()
    if cur_commit != prev_commit:
        line = latest_commit_line()
        if line:
            # formata: <oldhash> <newhash> <autor> <data> <msg>
            parts = line.split("\t")
            msg = parts[-1] if parts else line
            log(f"GIT COMMIT -> {msg}")
        else:
            log("GIT COMMIT -> (reflog alterado)")
        prev_commit = cur_commit
    cur = get_state()
    for p in (x for x in cur if x not in prev):
        log(f"ARQUIVO+ {os.path.relpath(p, ROOT)}")
    for p in (x for x in prev if x not in cur):
        log(f"ARQUIVO- {os.path.relpath(p, ROOT)}")
    for p in (x for x in cur if x in prev and cur[x] != prev[x]):
        log(f"ARQUIVO~ {os.path.relpath(p, ROOT)}")
    prev = cur
