@echo off
start geth --datadir C:\Users\Blockchain\Desktop\money-transfer-getch --networkid 15 --http --http.corsdomain "*" --allow-insecure-unlock
start geth attach \\.\pipe\geth.ipc --exec miner.start()
start live-server C:\Users\Blockchain\Desktop\Money-Transfer-blockchain-main-modules