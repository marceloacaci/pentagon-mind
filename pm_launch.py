# pm_launch.py — launcher desacoplado do monitor PENTAGON-MIND.
# O cron chama este script; ele spawna o monitor com DETACHED_PROCESS
# (processo totalmente separado, sem janela) e retorna na hora,
# para o monitor sobreviver ao fim da sessao do cron.
import subprocess, sys, os

ROOT = "C:/Users/Marcelo/Desktop/EUA"
PY = "C:/Users/Marcelo/AppData/Local/hermes/hermes-agent/venv/Scripts/python.exe"
MON = os.path.join(ROOT, "pm_monitor.py")

p = subprocess.Popen(
    [PY, MON],
    cwd=ROOT,
    stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    creationflags=0x00000008)  # DETACHED_PROCESS: sem janela, sobrevive ao pai
sys.exit(0)
