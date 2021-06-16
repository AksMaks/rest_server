pipeline {
    agent any

    stages {
        stage('install modules') {
            steps {
                bat "npm install"
            }
        }
        stage('Tests') {
            steps {
                bat "npm run test"
            }
        }
        stage('Check tests result') {
            steps {
                bat 'findstr /C:"success" "testResult.txt"'
            }
        }
        stage('Create zip arhive') {
            steps {
                bat 'cd C:\\Windows\\System32\\config\\systemprofile\\AppData\\Local\\Jenkins\\.jenkins\\workspace\\test1 && tar --exclude node_modules -cvf %PATH_TO_BUILDS%\\%BUILD_NUMBER%.zip .'
            }
        }
    }
}