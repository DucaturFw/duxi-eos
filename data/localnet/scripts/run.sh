#! /bin/bash

# change to script's directory
cd "/opt/eosio/bin"

if [ -e "/mnt/dev/data/initialized" ]
then
    script="./scripts/continue_blockchain.sh"
else
    script="./scripts/init_blockchain.sh"
fi

$script "$@"