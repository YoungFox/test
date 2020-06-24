#!/bin/bash

finish(){
	echo finish | tee -a ./finish.log
}

trap finish exit

while true;do
	echo running
	sleep 1
done
