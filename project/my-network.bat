@echo off
start geth --datadir ./geth --networkid 15 --http --http.corsdomain "*" --allow-insecure-unlock
start geth attach \\.\pipe\geth.ipc --exec miner.start()
start live-server ./interface