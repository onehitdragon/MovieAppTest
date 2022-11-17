#!/bin/bash
CHROME_PORT="9222"

cd "/mnt/host/c/Program Files/Google/Chrome/Application"
./chrome.exe --remote-debugging-port=$CHROME_PORT --user-data-dir=/temp 2>&1