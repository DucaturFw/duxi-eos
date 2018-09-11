#! /bin/sh
while true
do 
    echo "execute app ${APP} ($@)"
    "$@"
    sleep ${DELAY}
done