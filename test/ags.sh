#!/bin/bash

echo "1st arg is $1"
echo "2st arg is $2"
echo "3st arg is $3"
echo "10st arg is ${10}"
echo "11st arg is ${11}"



echo "all args are $*"
echo "all args are $@"

echo "The arg number is $#"
echo "The scriptname is `basename $0`"
