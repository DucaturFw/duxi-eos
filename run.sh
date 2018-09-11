#! /bin/bash
pwd=$(dirname "$0")
EOS_NETWORK=${EOS_NETWORK:-localnet}

docker-compose down

if (($EOS_NETWORK == "localnet")); then
  rm -rf $pwd/mnt/localnet;
fi

export EOS_NETWORK=$EOS_NETWORK
docker-compose up --build "$@"