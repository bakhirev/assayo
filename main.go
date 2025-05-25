package main

import (
 "fmt"
 "os"
 "os/exec"
 "path/filepath"
)

func showMessage(message string) {
 for _, arg := range os.Args {
  if arg == "--debug" {
   fmt.Println("Assayo: " + message)
   break
  }
 }
}

func checkDirExists(path string) bool {
  if _, err := os.Stat(path); os.IsNotExist(err) {
    return false
  }
  return true
}

func getSaveLogCommand() string {
 raw := "--raw --numstat"
 for _, arg := range os.Args {
  if arg == "--no-file" {
   raw = ""
   break
  }
 }
 return fmt.Sprintf("git --no-pager log %s --oneline --all --reverse --date=iso-strict --pretty=format:\"%%ad>%%aN>%%aE>%%s\"", raw)
}

func getCloneRepoCommand() string {
 return "git clone https://github.com/bakhirev/assayo.git && mv ./assayo ./source && mv ./source/build ./assayo && rm -r -f ./source"
}

func Assayo() error {
 // folder, when library was saved
 sourceDir := "../pkg/mod/github.com/bakhirev/assayo@v0.0.1/"
 sourcePath := filepath.Dir(os.Args[0])

 // folder, when user run library
 distDir := "assayo"
 distPath, _ := os.Getwd()

 home := filepath.Join(sourcePath, sourceDir)
 source := filepath.Join(home, "./assayo")
 target := filepath.Join(distPath, distDir)
 
 err := os.Chdir(home)
 if err != nil {
   fmt.Println("Cant found home dir:", err)
   return err
 }
 
 // 0. Clone actual report from GIT
 if checkDirExists(source) {
  showMessage("actual report template already exist")
 } else {
  commandStr := getCloneRepoCommand()
  command := exec.Command("bash", "-c", commandStr)
  if err := command.Run(); err != nil {
   fmt.Println(commandStr)
   return err
  }
 }

 // 1. Copy folder ./assayo from package to ./assayo in project
 if checkDirExists(target) {
  showMessage("directory with HTML report already exist")
 } else {
  command := exec.Command("cp", "-r", source, target)
  if err := command.Run(); err != nil {
   fmt.Println("Error copying directory:", err)
   return err
  }
 }
 showMessage("directory with HTML report was created")

 // 2. Run 'git log' and save output in string
 showMessage("reading git log was started")
 os.Chdir(distPath)
 commandStr := getSaveLogCommand()
 command := exec.Command("bash", "-c", commandStr)
 outputBytes, err := command.Output()
 if err != nil {
  fmt.Println("Error saving git log:", err)
  return err
 }
 showMessage("the file with git log was saved")

 // 3. Replace symbols in ./assayo/log.txt
 newContent := string(outputBytes)
 fileName := filepath.Join(target, "log.txt")
 if err := os.WriteFile(fileName, []byte("R(f`"+newContent+"`);"), 0644); err != nil {
  fmt.Println("Error writing file:", err)
  return err
 }

 return nil
}

func main() {
 Assayo()
}
