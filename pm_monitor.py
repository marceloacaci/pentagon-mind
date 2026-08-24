# pm_monitor.py — monitor PENTAGON-MIND (arquivos + commits git) como processo unico.
# SEM subprocess: detecta commits observando .git/logs/HEAD.
# Single-instance via lock de arquivo exclusivo (msvcrt.locking sobre handle
# aberto com O_CREAT|O_RDWR, SEM truncate) -> bloqueia forward/venv/uv/tarefa.
import os, time, sys, msvcrt

ROOT = "C:/Users/Marcelo/Desktop/EUA"
GIT = os.path.join(ROOT, ".git")
LOG = os.path.join(ROOT, ".pm_watch.log")
LOCK = os.path.join(ROOT, ".pm_watch.lock")
EXCLUDE_DIRS = {".git", "node_modules", "__pycache__"}
SKIP = {".pm_watch.log", "pm_monitor.py", "pm_launch.py", ".pm_watch.pid", ".pm_watch.lock"}

# Lock exclusivo de arquivo: garante EXATAMENTE 1 instancia (cross-session).
_lockfh = os.open(LOCK, os.O_CREAT | os.O_RDWR)
try:
    msvcrt.locking(_lockfh, msvcrt.LK_NBLCK, 1)
except (OSError, IOError):
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] watcher ja ativo (lock) -> encerrando\n")
    except Exception:
        pass
    sys.exit(0)

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
    head_log = os.path.join(GIT, "logs", "HEAD")
    try:
        st = os.stat(head_log)
        return (st.st_mtime, st.st_size)
    except OSError:
        return None

def latest_commit_line():
    head_log = os.path.join(GIT, "logs", "HEAD")
    try:
        with open(head_log, "r", encoding="utf-8", errors="ignore") as f:
            lines = [l.strip() for l in f if l.strip()]
        return lines[-1] if lines else None
    except Exception:
        return None

log("=== PENTAGON-MIND monitor INICIADO (tail -f .pm_watch.log) ===")
prev = get_state()
prev_commit = git_commit_state()
log(f"HEAD inicial: arquivos monitorados: {len(prev)}")

while True:
    time.sleep(2)
    cur_commit = git_commit_state()
    if cur_commit != prev_commit:
        line = latest_commit_line()
        if line:
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
