#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

void advancePastNL(FILE* file) {
  char* curCharPointer = malloc(1);
  do {
    fread(curCharPointer, 1, 1, file);
  } while(curCharPointer[0] != '\n');
}

int main(int argc, char** argv) {
	if(strcmp(argv[1], "login") == 0) {
    // Open login file
    FILE* login = fopen(".data/userData.txt","rb");
    
    char* uname = argv[2];
    char* passwdHash = argv[3];
    bool success = true;
    bool foundGoodUname = false;
    
    char* curCharPointer = malloc(1);
    
    while(!foundGoodUname && !feof(login)) {
      for(int i = 0; i < strlen(uname); i++) {
        fread(curCharPointer, 1, 1, login);
        if(curCharPointer[0] != uname[i]) {
          success = false;
          break;
        }
      }

      if(!success) {
        advancePastNL(login);
        success = true;
        continue;
      }

      fseek(login, 1, SEEK_CUR); // Advance past the space in the middle of the uname and hash

      for(int i = 0; i < strlen(passwdHash); i++) {
        fread(curCharPointer, 1, 1, login);
        if(curCharPointer[0] != passwdHash[i]) {
          success = false;
          break;
        }
      }

      if(!success) {
        advancePastNL(login);
        success = true;
        continue;
      }

      fseek(login, 1, SEEK_CUR); // Advance past separating space
      free(curCharPointer);

      char* result = malloc(7);
      result[6] = 0;
      fread(result, 6, 1, login);
      printf("%s", result);
      
      foundGoodUname = true;
      
      fclose(login);
      break;
    }
    
    
    if(!foundGoodUname) {
      fclose(login);
      free(curCharPointer);
      printf("INVALID");
      exit(0);
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
