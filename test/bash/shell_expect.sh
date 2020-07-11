#!/bin/bash

ip=$1
user=$2
password=$3

expect <<EOF
set tiimeout 20
spawn ssh $user@$ip

expect {
	"yes/no" { send "yes\n";exp_continue }
	"password" { send "$password\n" }
}

expect "]#" { send "useradd hehe\n" }
expect "]#" { send "echo hehe |passwd --stdin hehe\n" }
expect "]#" { send "exit\n" }

expect eof
EOF
