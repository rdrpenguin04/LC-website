#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

int main(int argc, char** argv) {
	if(strcmp(argv[1], "login") == 0) {
    FILE* login = fopen(".data/userData.txt","rb");
    if (login != NULL) {
      fseek(login, 0L, SEEK_END);
      long s = ftell(login);
      rewind(login);
      char* buffer = malloc(s+1);
      buffer[s] = 0;
      if (buffer != NULL) {
        fread(buffer, s, 1, login);
        fclose(login); login = NULL;
        free(buffer);
        char* uname = argv[2];
        char* passwdHash = argv[3];
        char* target = malloc(1 + strlen(uname) + 1 + strlen(passwdHash) + 2);
        target[0] = 0;
        strcat(target, "\n");
        strcat(target, uname);
        strcat(target, " ");
        strcat(target, passwdHash);
        strcat(target, " ");
        int index = strstr(buffer, target) - buffer;
        if(index < 0 || index > 0x1000000) {
          printf("INVALID");
        } else {
          buffer[index + strlen(target) + 6] = 0;
          printf((char*)(index + strlen(target) + buffer));
        }
      } else {
        fclose(login);
        return 1;
      }
    } else {
      return 1;
    }
  } else if(strcmp(argv[1], "signup") == 0) {
    // Open login file
    FILE* login = fopen(".data/userData.txt","a");
    
    char* uname = argv[2];
    char* passwdHash = argv[3];
    
    fprintf(login, "%s %s 0 0003\n", uname, passwdHash);
  }
  
  return 0;
}
