all: login-helper

login-helper: login-helper.o
	gcc login-helper.o -o login-helper

login-helper.o: login-helper.c
	gcc -c login-helper.c -o login-helper.o
